package com.learnhub.contact;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContactService {
    private final ContactRepository contactRepository;

    @Autowired
    public ContactService(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    public void saveContact(ContactRequest contact) {
        contactRepository.save(new Contact(contact.firstName(), contact.lastName(), contact.email(), contact.phone(), contact.subject(), contact.message()));
    }
}
