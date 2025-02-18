package com.learnhub.user;

import java.util.List;
import com.learnhub.user.exception.OldPasswordNotMatchedException;
import com.learnhub.user.exception.UserNotFoundException;
import com.learnhub.user.student.StudentService;
import com.learnhub.user.teacher.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final StudentService studentService;
    private final TeacherService teacherService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(
            UserRepository userRepository,
            StudentService studentService,
            TeacherService teacherService,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.studentService = studentService;
        this.teacherService = teacherService;
        this.passwordEncoder = passwordEncoder;
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException(String.format("User with email %s does not exists", email)));
    }

    public void updateUser(User user, UpdateUserRequest req) {
        user.setFirstName(req.firstName());
        user.setLastName(req.lastName());
        userRepository.save(user);
    }

    public void changeUserPassword(User user, UpdatePasswordRequest req) {
        if (!passwordEncoder.matches(req.oldPassword(), user.getPassword())) {
            throw new OldPasswordNotMatchedException("The password doesn't match with current password.");
        }
        user.setPassword(passwordEncoder.encode(req.newPassword()));
        userRepository.save(user);
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }
}
