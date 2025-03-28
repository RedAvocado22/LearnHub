package com.learnhub.user;

import java.math.BigDecimal;
import java.util.List;
import com.learnhub.aws.AwsS3Service;
import com.learnhub.contact.ContactService;
import com.learnhub.course.CourseRepository;
import com.learnhub.course.CourseStatus;
import com.learnhub.payment.CoursePurchase;
import com.learnhub.payment.CoursePurchaseRepository;
import com.learnhub.user.dto.AddUserRequest;
import com.learnhub.user.dto.AdminStatsResponse;
import com.learnhub.user.dto.ChangeUserStatusRequest;
import com.learnhub.user.dto.UpdatePasswordRequest;
import com.learnhub.user.dto.UpdateUserRequest;
import com.learnhub.user.exception.OldPasswordNotMatchedException;
import com.learnhub.user.exception.UserNotFoundException;
import com.learnhub.user.manager.ManagerProfile;
import com.learnhub.user.student.StudentProfile;
import com.learnhub.user.teacher.TeacherProfile;
import com.learnhub.util.mail.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    private final AwsS3Service awsS3Service;
    private final ContactService contactService;
    private final CourseRepository courseRepository;
    private final CoursePurchaseRepository coursePurchaseRepository;

    @Autowired
    public UserService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            EmailService emailService,
            AwsS3Service awsS3Service,
            ContactService contactService,
            CourseRepository courseRepository,
            CoursePurchaseRepository coursePurchaseRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
        this.awsS3Service = awsS3Service;
        this.contactService = contactService;
        this.courseRepository = courseRepository;
        this.coursePurchaseRepository = coursePurchaseRepository;
    }

    public List<User> getAllExceptAdmin() {
        return userRepository.findAll().stream().filter(user -> user.getRole() != UserRole.ADMIN).toList();
    }

    public AdminStatsResponse getAdminStats() {
        Long totalUsers = userRepository.findAll().stream().count();
        Long totalCourses = courseRepository.findAll().stream().filter(course -> course.getStatus() == CourseStatus.PUBLIC).count();
        Long totalPurchases = coursePurchaseRepository.findAll().stream().count();
        BigDecimal totalProfits = coursePurchaseRepository.findAll().stream()
            .map(CoursePurchase::getPurchasePrice)
            .reduce(BigDecimal.ZERO, BigDecimal::add);
        return new AdminStatsResponse(totalProfits, totalCourses, totalPurchases, totalUsers);
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
                    .website(req.teacher().website())
                    .biography(req.teacher().biography())
                    .build());
        } else if (user.getRole() == UserRole.COURSE_MANAGER && req.manager() != null) {
            user.setManager(ManagerProfile.builder().user(user)
                    .department(req.manager().department())
                    .build());
        }
        User saved = userRepository.save(user);
        emailService.sendAccountCreatedEmail(saved.getEmail(), defaultPw);
        if (req.contactId() != null) {
            contactService.resolveContact(req.contactId(), saved);
        }
        return saved.getId();
    }

    public void changeUserStatus(Long id, ChangeUserStatusRequest req) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(String.format("User with id %d does not exists", id)));
        user.setStatus(req.status());
        userRepository.save(user);
        if (req.status() == UserStatus.SUSPENDED) {
            emailService.sendBanUserEmail(user.getEmail(), req.reason());
        } else if (req.status() == UserStatus.ACTIVE) {
            emailService.sendUnbanUserEmail(user.getEmail(), req.reason());
        }
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

    public void saveUserAvatar(User user, MultipartFile file) {
        if (user.getAvatar() != null) {
            awsS3Service.deleteFile(user.getAvatar());
        }

        String fileUrl = awsS3Service.saveFile(file);
        user.setAvatar(fileUrl);
        userRepository.save(user);
    }
}
