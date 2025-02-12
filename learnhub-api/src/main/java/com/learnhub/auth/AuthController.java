package com.learnhub.auth;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/v1/auth")
public class AuthController {
    private final AuthService authService;
    private final String PASS_REGEX = "^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,}$";
    private final String EMAIL_REGEX = "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$";


    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @RequestBody LoginRequest authReq,
            HttpServletRequest httpReq,
            HttpServletResponse httpResp) {
        AuthResponse resp = authService.login(authReq, httpReq, httpResp);

        if (resp.getAccessToken() == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(resp);
        }

        return ResponseEntity.ok().body(resp);
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> registerStudent(@RequestBody StudentRegisterRequest req, HttpServletRequest httpReq) {
        if (req.firstname() != null && req.lastname() != null && req.email() != null && req.password() != null && req.studentType() != null) {
            if (req.password().matches(PASS_REGEX) && req.email().matches(EMAIL_REGEX))
                return ResponseEntity.ok().body(authService.registerStudent(req, httpReq));
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(authService.registerStudent(req, httpReq));
    }

    @PostMapping("/activate")
    public ResponseEntity<AuthResponse> activateAccount(@RequestBody ActivateAccountRequest req) {
        authService.activateAccount(req);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/refresh-token")
    public ResponseEntity<AuthResponse> refreshToken(HttpServletRequest req, HttpServletResponse resp) {
        return ResponseEntity.ok().body(authService.refreshToken(req, resp));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<AuthResponse> forgotPassword(@RequestBody EmailRequest emailRequest) {
        if (emailRequest.email() == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();

        if (!emailRequest.email().matches(EMAIL_REGEX))
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();

        authService.forgetPassword(emailRequest.email());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/reset-password")
    public ResponseEntity<AuthResponse> resetPassword(@RequestBody ResetPasswordRequest resetPasswordRequest) {
        if (resetPasswordRequest.password() == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();

        if (!resetPasswordRequest.password().matches(PASS_REGEX))
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();

        authService.resetPassword(resetPasswordRequest);
        return ResponseEntity.ok().build();
    }
}
