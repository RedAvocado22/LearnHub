package com.learnhub.user;

import com.learnhub.user.exception.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
            .orElseThrow(() -> new UserNotFoundException(String.format("User with email %s does not exists", email)));
    }
    //
    //@Transactional
    //public void register(RegistrationRequest req, String reqUrl) {
    //    if (userRepository.findByEmail(req.email()).isPresent()) {
    //        throw new IllegalStateException("Registration failed: User is already exists");
    //    }
    //
    //    User newUser = new User(req.email(), req.firstName(), req.lastName(), req.password(),
    //            UserRole.STUDENT, false);
    //    String encodedPassword = passwordEncoder.encode(newUser.getPassword());
    //    newUser.setPassword(encodedPassword);
    //
    //    User user = userRepository.save(newUser);
    //
    //    String token = UUID.randomUUID().toString();
    //    VerificationToken verificationToken = new VerificationToken(token, user);
    //
    //    verificationTokenRepository.save(verificationToken);
    //
    //    String content =
    //            "Click this link to activate your account: " + reqUrl + "/verify?token=" + token;
    //    emailService.sendSimpleEmail(user.getEmail(), "Activate your account", content);
    //}
    //
    //@Transactional
    //public void verifyToken(String token) {
    //    VerificationToken verificationToken =
    //            verificationTokenRepository.findByToken(token).orElseThrow(
    //                    () -> new IllegalStateException("Verification failed: Token not found"));
    //    if (verificationToken.getVerifiedAt() != null) {
    //        throw new IllegalStateException("Verification failed: Token is already verified");
    //    }
    //    if (verificationToken.getExpiresAt().isBefore(LocalDateTime.now())) {
    //        throw new IllegalStateException("Verification failed: Token is expired");
    //    }
    //
    //    verificationTokenRepository.updateVerifiedAt(verificationToken.getId(),
    //            LocalDateTime.now());
    //    userRepository.activateUser(verificationToken.getUser().getId());
    //}
    //
    //public String login(LoginRequest req) {
    //    Authentication auth = authenticationManager
    //            .authenticate(new UsernamePasswordAuthenticationToken(req.email(), req.password()));
    //
    //    if (auth.isAuthenticated()) {
    //        return jwtService.generateAccessToken(req.email());
    //    }
    //    throw new IllegalStateException("Login failed: Something went wrong");
    //}
}
