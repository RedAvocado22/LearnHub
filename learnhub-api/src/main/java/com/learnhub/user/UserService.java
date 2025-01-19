package com.learnhub.user;

import org.springframework.stereotype.Service;

@Service
public class UserService {
    //private final UserRepository userRepository;
    //private final VerificationTokenRepository verificationTokenRepository;
    //private final PasswordEncoder passwordEncoder;
    //private final AuthenticationManager authenticationManager;
    //private final JwtService jwtService;
    //private final EmailService emailService;
    //
    //@Autowired
    //public UserService(UserRepository userRepository,
    //        VerificationTokenRepository verificationTokenRepository,
    //        PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager,
    //        JwtService jwtService, EmailService emailService) {
    //    this.userRepository = userRepository;
    //    this.verificationTokenRepository = verificationTokenRepository;
    //    this.passwordEncoder = passwordEncoder;
    //    this.authenticationManager = authenticationManager;
    //    this.jwtService = jwtService;
    //    this.emailService = emailService;
    //}
    //
    //public User getUserByEmail(String email) {
    //    return userRepository.findByEmail(email)
    //        .orElseThrow(() -> new UserNotFoundException(String.format("User with email %s does not exists", email)));
    //}
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
