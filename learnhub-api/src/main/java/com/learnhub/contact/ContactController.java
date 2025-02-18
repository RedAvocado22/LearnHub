package com.learnhub.contact;

import com.learnhub.constant.IConstant;
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

        if (!contact.email().matches(IConstant.EMAIL_REGEX) || !contact.phone().matches(IConstant.PHONE_REGEX)) {
            return ResponseEntity.badRequest().build();
        }

        contactService.saveContact(contact);
        return ResponseEntity.ok("Success");
    }
}