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

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest authReq, HttpServletResponse httpResp) {
        AuthResponse resp = authService.login(authReq, httpResp);
        if (resp.getAccessToken() == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(resp);
        }
        return ResponseEntity.ok().body(resp);
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> registerStudent(@RequestBody StudentRegisterRequest req, HttpServletRequest httpReq) {
        return ResponseEntity.ok().body(authService.registerStudent(req, httpReq));
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
}
