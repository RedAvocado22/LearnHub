package com.learnhub.contact;

import java.util.List;
import com.learnhub.contact.dto.ContactResponse;
import com.learnhub.util.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/v1/contacts")
public class ContactController {
    private final ContactService contactService;
    private final ObjectMapper objectMapper;

    @Autowired
    public ContactController(ContactService contactService, ObjectMapper objectMapper) {
        this.contactService = contactService;
        this.objectMapper = objectMapper;
    }

    @GetMapping
    public ResponseEntity<List<ContactResponse>> getAll() {
        return ResponseEntity.ok(contactService.getAll().stream().map(objectMapper::toContactResponse).toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContactResponse> getById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(ContactResponse.from(contactService.getById(id)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOne(@PathVariable("id") Long id) {
        contactService.deleteById(id);
        return ResponseEntity.ok("Success");
    }

    @GetMapping("/{id}/request-details")
    public ResponseEntity<String> requestDetails(@PathVariable("id") Long id) {
        contactService.requestDetails(id);
        return ResponseEntity.ok("Success");
    }
}
