package com.learnhub.contact;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/v1")
public class ContactController {
    private final ContactService contactService;

    @Autowired
    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping("/contact")
    public ResponseEntity<String> contactUs(@RequestBody ContactRequest contact) {
        if (contact.email().isEmpty() || contact.phone().isEmpty() ||
                contact.firstName().isEmpty() || contact.lastName().isEmpty() ||
                contact.message().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        final String PHONE_REGEX = "^\\d{10,11}";
        final String EMAIL_REGEX = "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$";

        if (!contact.email().matches(EMAIL_REGEX) || !contact.phone().matches(PHONE_REGEX)) {
            return ResponseEntity.badRequest().build();
        }

        contactService.saveContact(contact);
        return ResponseEntity.ok("Success");
    }
}