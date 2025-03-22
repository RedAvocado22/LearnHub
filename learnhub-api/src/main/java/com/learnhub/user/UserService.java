package com.learnhub.user;

import java.io.IOException;
import java.util.List;
import com.learnhub.user.dto.AddUserRequest;
import com.learnhub.user.dto.UpdatePasswordRequest;
import com.learnhub.user.dto.UpdateUserRequest;
import com.learnhub.user.exception.OldPasswordNotMatchedException;
import com.learnhub.user.exception.UserNotFoundException;
import com.learnhub.user.student.StudentProfile;
import com.learnhub.user.teacher.TeacherProfile;
import com.learnhub.util.io.FileService;
import com.learnhub.util.mail.EmailService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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

    public List<User> getAllExceptAdmin() {
        return userRepository.findAll().stream().filter(user -> user.getRole() != UserRole.ADMIN).toList();
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException(String.format("User with email %s does not exists", email)));
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(String.format("User with id %d does not exists", id)));
    }

    @Transactional(readOnly = true)
    public User getTeacherById(Long id) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new UserNotFoundException(String.format("User with id %d does not exists", id)));
        if (user.getRole() != UserRole.TEACHER || user.getTeacher() == null) {
            throw new UserNotFoundException("User is not a teacher");
        }
        return user;
    }

    public Long addUserWithDefaultPassword(AddUserRequest req) {
        String defaultPw = "ABC@123";
        User user = User.builder()
            .email(req.email())
            .firstName(req.firstName())
            .lastName(req.lastName())
            .password(passwordEncoder.encode(defaultPw))
            .role(req.role())
            .status(UserStatus.ACTIVE)
            .build();
        if (user.getRole() == UserRole.STUDENT && req.student() != null) {
            user.setStudent(StudentProfile.builder().user(user)
                    .type(req.student().type())
                    .school(req.student().school())
                    .build());
        } else if (user.getRole() == UserRole.TEACHER && req.teacher() != null) {
            user.setTeacher(TeacherProfile.builder().user(user)
                    .major(req.teacher().major())
                    .phone(req.teacher().phone())
                    .workAddress(req.teacher().workAddress())
                    .city(req.teacher().city())
                    .build());
        }
        User saved = userRepository.save(user);
        emailService.sendAccountCreatedEmail(saved.getEmail(), defaultPw);
        return saved.getId();
    }

    @Transactional
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

    @Transactional
    public void deleteUserDocument(Long id, String fileName) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new UserNotFoundException(String.format("User with id %d does not exists", id)));
        if (!fileService.deleteUserDocument(fileName)) {
            log.warn("User document {} doesn't exists on disk", fileName);
        }
        user.getDocuments().removeIf(doc -> doc.getDownloadLink().equals("documents/" + fileName));
        userRepository.save(user);
    }

    @Transactional
    public void updateUser(User user, UpdateUserRequest req) {
        user.setFirstName(req.firstName());
        user.setLastName(req.lastName());
        if (user.getRole() == UserRole.STUDENT && user.getStudent() != null && req.student() != null) {
            user.getStudent().setType(req.student().type());
            user.getStudent().setSchool(req.student().school());
        } else if (user.getRole() == UserRole.TEACHER && user.getTeacher() != null && req.teacher() != null) {
            user.getTeacher().setMajor(req.teacher().major());
            user.getTeacher().setPhone(req.teacher().phone());
            user.getTeacher().setWorkAddress(req.teacher().workAddress());
            user.getTeacher().setCity(req.teacher().city());
            user.getTeacher().setWebsite(req.teacher().website());
            user.getTeacher().setBiography(req.teacher().biography());
        }
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
