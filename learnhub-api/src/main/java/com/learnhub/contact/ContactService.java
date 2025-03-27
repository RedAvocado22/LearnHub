package com.learnhub.contact;

import java.util.List;
import com.learnhub.aws.AwsS3Service;
import com.learnhub.common.exception.ResourceNotFoundException;
import com.learnhub.contact.dto.AddContactRequest;
import com.learnhub.contact.dto.UpdateContactRequest;
import com.learnhub.user.User;
import com.learnhub.util.mail.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ContactService {
    private final ContactRepository contactRepository;
    private final EmailService emailService;
    private final AwsS3Service awsS3Service;

    @Autowired
    public ContactService(ContactRepository contactRepository, EmailService emailService, AwsS3Service awsS3Service) {
        this.contactRepository = contactRepository;
        this.emailService = emailService;
        this.awsS3Service = awsS3Service;
    }

    public void saveContact(AddContactRequest req) {
        contactRepository.save(Contact.builder()
                .firstName(req.firstName())
                .lastName(req.lastName())
                .email(req.email())
                .phone(req.phone())
                .subject(req.subject())
                .message(req.message())
                .build());
    }

    public List<Contact> getAll() {
        return contactRepository.findAll();
    }

    public Contact getById(Long id) {
        return contactRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Contact not found."));
    }

    public void requestDetails(Long id) {
        Contact contact = contactRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Can not find contact"));
        String target = null;
        if (contact.getSubject().equals("Want to become a teacher")) {
            target = "teacher";
        } else if (contact.getSubject().equals("Want to become a course manager")) {
            target = "manager";
        } else {
            throw new IllegalStateException("Subject is not valid");
        }
        emailService.sendContactDetailsRequestEmail(contact.getEmail(), target, contact.getId());
    }

    @Transactional
    public void updateContact(Long id, UpdateContactRequest details, MultipartFile[] documents) {
        Contact contact = contactRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Can not find contact"));
        if (contact.getUser() != null) {
            throw new IllegalStateException("Contact is already resolved");
        }
        if (contact.getSubject().equals("Want to become a teacher") && details.teacher() != null) {
            contact.setTeacher(TeacherDetails.builder()
                    .major(details.teacher().major())
                    .workAddress(details.teacher().workAddress())
                    .city(details.teacher().city())
                    .website(details.teacher().website())
                    .biography(details.teacher().biography())
                    .build());
        } else if (contact.getSubject().equals("Want to become a course manager") && details.manager() != null) {
            contact.setManager(ManagerDetails.builder()
                    .department(details.manager().department())
                    .build());
        }
        String[] paths = awsS3Service.saveFiles(documents);
        for (int i = 0; i < paths.length; i++) {
            contact.getDocuments().add(UserDocument.builder()
                .contact(contact)
                .fileName(documents[i].getOriginalFilename())
                .fileUrl(paths[i])
                .build());
        }
    }

    public void resolveContact(Long id, User user) {
        Contact contact = contactRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Contact not found."));
        contact.setUser(user);
        contactRepository.save(contact);
    }

    public void deleteById(Long id) {
        contactRepository.deleteById(id);
    }
}
