package com.learnhub.util.io;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.UUID;
import com.learnhub.user.User;
import com.learnhub.user.UserDocument;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;

@Service
public class FileService {
    private static final Logger log = LoggerFactory.getLogger(FileService.class);
    @Value("${application.uploads.path}")
    private String uploadsBasePath;
    @Value("${application.uploads.path}/users/documents")
    private String documentDir;

    public UserDocument saveUserDocument(User user, String fileName, InputStream stream) throws IOException {
        Path uploadsPath = Path.of(documentDir).normalize();
        Files.createDirectories(uploadsPath);
        String uniqueFileName = UUID.randomUUID().toString() + "-" + fileName;
        Path filePath = uploadsPath.resolve(uniqueFileName).normalize();
        long size = Files.copy(stream, filePath, StandardCopyOption.REPLACE_EXISTING);
        String downloadLink = "documents/" + uniqueFileName;
        return new UserDocument(fileName, size, downloadLink, user);
    }

    public Resource loadUserDocument(String fileName) {
        Path filePath = Path.of(documentDir).resolve(fileName).normalize();
        try {
            Resource resource = new UrlResource(filePath.toUri());
            if (!resource.exists() || !resource.isReadable()) {
                throw new FileNotFoundException();
            }
            return resource;
        } catch (FileNotFoundException e) {
            log.error("File not found or not readable", e);
        } catch (MalformedURLException e) {
            log.error("Bad Request", e);
        }
        return null;
    }

    public boolean deleteUserDocument(String fileName) {
        Path filePath = Path.of(documentDir).resolve(fileName).normalize();
        try {
            return Files.deleteIfExists(filePath);
        } catch (IOException e) {
            log.error("Delete user document {} failed", fileName, e);
        }
        return false;
    }
}
