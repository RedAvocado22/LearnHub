package com.learnhub.util.mail;

import jakarta.mail.Message;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.AddressException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    private static final Logger log = LoggerFactory.getLogger(EmailService.class);
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

    public void sendHtmlEmail(String to, String subject, String content) {
        try {
            MimeMessage mail = sender.createMimeMessage();
            mail.setFrom(new InternetAddress(from));
            mail.setRecipient(Message.RecipientType.TO, new InternetAddress(to));
            mail.setSubject(subject);
            mail.setContent(content, "text/html");
            sender.send(mail);
        } catch (AddressException e) {
            log.error("Invalid mail address", e);
        } catch (MessagingException e) {
            log.error("Failed to send email", e);
        }
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

    public void sendAccountCreatedEmail(String email, String password) {
        SimpleMailMessage mail = new SimpleMailMessage();
        String message = String.format("""
            Your account has been created successfully:
            Username: %s
            Password: %s

            Remember to change your password after you logged in.
        """, email, password);
        mail.setFrom(from);
        mail.setTo(email);
        mail.setSubject("Created Account successfully");
        mail.setText(message);
        sender.send(mail);
    }
}
