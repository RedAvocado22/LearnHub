package com.learnhub.contact;

import java.util.List;
import com.learnhub.common.exception.ResourceNotFoundException;
import com.learnhub.contact.dto.AddContactRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContactService {
    private final ContactRepository contactRepository;

    @Autowired
    public ContactService(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    public void saveContact(AddContactRequest req) {
        contactRepository.save(Contact.builder()
                .firstName(req.firstName())
                .lastName(req.lastName())
                .email(req.email())
                .phone(req.phone())
                .subject(req.subject())
                .message(req.message())
                .resolved(false)
                .build());
    }

    public List<Contact> getAll() {
        return contactRepository.findAll();
    }

    public Contact getById(Long id) {
        return contactRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Contact not found."));
    }

    public void resolveContact(Long id) {
        Contact c = contactRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Contact not found."));
        c.setResolved(true);
        contactRepository.save(c);
    }

    public void deleteById(Long id) {
        contactRepository.deleteById(id);
    }
}
