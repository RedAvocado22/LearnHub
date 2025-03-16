package com.learnhub.user;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "user_document")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDocument {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "file_name")
    private String fileName;

    @Column(name = "file_size")
    private Long fileSize;

    @Column(name = "download_link")
    private String downloadLink;

    @ManyToOne
    @JoinColumn(name = "account_id", referencedColumnName = "id")
    private User user;

    public UserDocument(String fileName, Long fileSize, String downloadLink, User user) {
        this.fileName = fileName;
        this.fileSize = fileSize;
        this.downloadLink = downloadLink;
        this.user = user;
    }
}
