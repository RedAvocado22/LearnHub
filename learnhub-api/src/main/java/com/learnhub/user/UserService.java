package com.learnhub.user;

import java.io.IOException;
import java.util.List;
import com.learnhub.user.exception.OldPasswordNotMatchedException;
import com.learnhub.user.exception.UserNotFoundException;
import com.learnhub.util.io.FileService;
import com.learnhub.util.mail.EmailService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class UserService {
    private static final Logger log = LoggerFactory.getLogger(UserService.class);
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    private final FileService fileService;

    @Autowired
    public UserService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            EmailService emailService,
            FileService fileService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
        this.fileService = fileService;
    }

    public List<User> getAllExceptTeacherManager() {
        return userRepository.findAll().stream().filter(user -> user.getRole() != UserRole.TEACHER_MANAGER).toList();
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException(String.format("User with email %s does not exists", email)));
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(String.format("User with id %d does not exists", id)));
    }

    public Long addUserWithDefaultPassword(AddUserRequest req) {
        String defaultPw = "ABC@123";
        User user = userRepository.save(new User(
                    req.email(),
                    req.firstName(),
                    req.lastName(),
                    passwordEncoder.encode(defaultPw),
                    req.role(),
                    true,
                    req.phone(),
                    null,
                    null));
        emailService.sendAccountCreatedEmail(user.getEmail(), defaultPw);
        return user.getId();
    }

    public void saveUserDocuments(Long id, MultipartFile[] files) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new UserNotFoundException(String.format("User with id %d does not exists", id)));
        for (MultipartFile file : files) {
            try {
                user.getDocuments().add(fileService.saveUserDocument(user, file.getOriginalFilename(), file.getInputStream()));
            } catch (IOException e) {
                log.error("Save user document {} failed", file.getName(), e);
            }
        }
        userRepository.save(user);
    }

    public Resource getUserDocument(String fileName) {
        return fileService.loadUserDocument(fileName);
    }

    public void deleteUserDocument(Long id, String fileName) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new UserNotFoundException(String.format("User with id %d does not exists", id)));
        if (!fileService.deleteUserDocument(fileName)) {
            log.warn("User document {} doesn't exists on disk", fileName);
        }
        user.getDocuments().removeIf(doc -> doc.getDownloadLink().equals("documents/" + fileName));
        userRepository.save(user);
    }

    public void updateUser(User user, UpdateUserRequest req) {
        user.setFirstName(req.firstName());
        user.setLastName(req.lastName());
        user.setPhone(req.phone());
        user.setAddress(req.address());
        user.setCity(req.city());
        userRepository.save(user);
    }

    public void changeUserPassword(User user, UpdatePasswordRequest req) {
        if (!passwordEncoder.matches(req.oldPassword(), user.getPassword())) {
            throw new OldPasswordNotMatchedException("The password doesn't match with current password.");
        }
        user.setPassword(passwordEncoder.encode(req.newPassword()));
        userRepository.save(user);
    }
}
