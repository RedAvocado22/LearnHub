package com.learnhub.auth;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
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

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @Valid @RequestBody LoginRequest authReq,
            HttpServletRequest httpReq,
            HttpServletResponse httpResp) {
        AuthResponse resp = authService.login(authReq, httpReq, httpResp);
        if (resp.accessToken() == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(resp);
        }
        return ResponseEntity.ok().body(resp);
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> registerStudent(@Valid @RequestBody StudentRegisterRequest req, HttpServletRequest httpReq) {
        return ResponseEntity.ok().body(authService.registerStudent(req, httpReq));
    }

    @PostMapping("/activate")
    public ResponseEntity<AuthResponse> activateAccount(@Valid @RequestBody ActivateAccountRequest req) {
        authService.activateAccount(req);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/refresh-token")
    public ResponseEntity<AuthResponse> refreshToken(HttpServletRequest req, HttpServletResponse resp) {
        return ResponseEntity.ok().body(authService.refreshToken(req, resp));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<AuthResponse> forgotPassword(@Valid @RequestBody ForgotPasswordRequest req) {
        authService.forgetPassword(req.email());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/reset-password")
    public ResponseEntity<AuthResponse> resetPassword(@Valid @RequestBody ResetPasswordRequest req) {
        authService.resetPassword(req);
        return ResponseEntity.ok().build();
    }
}
