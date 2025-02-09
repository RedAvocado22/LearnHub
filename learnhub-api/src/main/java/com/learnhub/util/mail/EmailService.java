package com.learnhub.util.mail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    private final JavaMailSender sender;

    @Value("${spring.mail.username}")
    private String from;

    @Value("${frontend.baseurl}")
    private String feBaseUrl;

    @Autowired
    public EmailService(JavaMailSender sender) {
        this.sender = sender;
    }

    public void sendSimpleEmail(String to, String subject, String message) {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setFrom(from);
        mail.setTo(to);
        mail.setSubject(subject);
        mail.setText(message);
        sender.send(mail);
    }

    public void sendAccountActivationEmail(String to, String token) {
        SimpleMailMessage mail = new SimpleMailMessage();
        String url = feBaseUrl + "/activate/" + token;
        String message = "Click this link to activate your account: " + url;
        mail.setFrom(from);
        mail.setTo(to);
        mail.setSubject("Activate your account");
        mail.setText(message);
        sender.send(mail);
    }

    public void sendAccountResetPasswordEmail(String to, String token) {
        SimpleMailMessage mail = new SimpleMailMessage();
        String url = feBaseUrl + "/reset-password/" + token;
        String message = "Click this link to reset your password: " + url;
        mail.setFrom(from);
        mail.setTo(to);
        mail.setSubject("Reset your password");
        mail.setText(message);
        sender.send(mail);
    }
}
