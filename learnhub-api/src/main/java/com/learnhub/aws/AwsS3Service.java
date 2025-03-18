package com.learnhub.aws;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class AwsS3Service {
    private final String bucketName = "learnhub-uploads";

    @Value("${aws.s3.access.key}")
    private String accessKey;

    @Value("${aws.s3.secret.key}")
    private String secretKey;

    private String generateS3FilePath(MultipartFile file) {
        String contentType = file.getContentType();
        String fileExtension = null;

        if (contentType != null) {
            fileExtension = switch (contentType) {
                case "image/jpeg" -> "jpg";
                case "image/png" -> "png";
                case "application/pdf" -> "pdf";
                case "video/mp4" -> "mp4";
                default -> throw new IllegalArgumentException("Unsupported file type: " + contentType);
            };
        }

        return "uploads/public/" + UUID.randomUUID() + "." + fileExtension;
    }

    public String saveFile(MultipartFile file) {
        try {
            AwsBasicCredentials awsCredentials = AwsBasicCredentials.create(accessKey, secretKey);
            S3Client s3Client = S3Client.builder()
                    .region(Region.AP_SOUTHEAST_2)
                    .credentialsProvider(StaticCredentialsProvider.create(awsCredentials))
                    .build();

            String s3FilePath = generateS3FilePath(file);

            Path tempFile = Files.createTempFile("upload-", file.getOriginalFilename());
            file.transferTo(tempFile.toFile());

            Map<String, String> metadata = new HashMap<>();
            metadata.put("Content-Type", file.getContentType());

            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(s3FilePath)
                    .metadata(metadata)
                    .build();

            s3Client.putObject(putObjectRequest, tempFile);

            Files.delete(tempFile);

            return s3FilePath;
        } catch (Exception e) {
            e.printStackTrace();
            return "Error uploading file to S3: " + e.getMessage();
        }
    }

    public String deleteFile(String fileName) {
        try {
            AwsBasicCredentials awsCredentials = AwsBasicCredentials.create(accessKey, secretKey);
            S3Client s3Client = S3Client.builder()
                    .region(Region.AP_SOUTHEAST_2)
                    .credentialsProvider(StaticCredentialsProvider.create(awsCredentials))
                    .build();

            s3Client.deleteObject(builder -> builder.bucket(bucketName).key(fileName));

            return "File deleted successfully: " + fileName;
        } catch (Exception e) {
            e.printStackTrace();
            return "Error deleting file from S3: " + e.getMessage();
        }
    }
}
