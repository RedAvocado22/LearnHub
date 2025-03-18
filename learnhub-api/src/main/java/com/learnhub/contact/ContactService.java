
package com.learnhub.contact;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContactService {
    private final ContactRepository contactRepository;

    @Autowired
    public ContactService(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    public void saveContact(AddContactRequest contact) {
        contactRepository.save(new Contact(
                contact.firstName(),
                contact.lastName(),
                contact.email(),
                contact.phone(),
                contact.subject(),
                contact.message()));
    }

    public List<Contact> getAll() {
        return contactRepository.findAll();
    }

    public Contact getById(Long id) {
        return contactRepository.findById(id).orElseThrow();
    }

    public void resolveContact(Long id) {
        Contact c = contactRepository.findById(id).orElseThrow();
        c.setResolved(true);
        contactRepository.save(c);
    }

    public void deleteById(Long id) {
        contactRepository.deleteById(id);
    }
}
