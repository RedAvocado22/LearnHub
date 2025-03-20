package com.learnhub.aws;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Service
public class AwsS3Service {
    private final String bucketName = "learnhub-uploads";
    private final S3Client s3Client;

    @Value("${aws.s3.access.key}")
    private String accessKey;

    @Value("${aws.s3.secret.key}")
    private String secretKey;

    @Value("${video.compression.enabled:true}")
    private boolean videoCompressionEnabled;

    @Value("${video.compression.quality:medium}")
    private String videoCompressionQuality;

    @Value("${video.compression.max-size-mb:500}")
    private int maxVideoSizeMB;

    public AwsS3Service(@Value("${aws.s3.access.key}") String accessKey,
                        @Value("${aws.s3.secret.key}") String secretKey) {
        this.accessKey = accessKey;
        this.secretKey = secretKey;

        // Create a reusable S3 client
        AwsBasicCredentials awsCredentials = AwsBasicCredentials.create(accessKey, secretKey);
        this.s3Client = S3Client.builder()
                .region(Region.AP_SOUTHEAST_2)
                .credentialsProvider(StaticCredentialsProvider.create(awsCredentials))
                .build();
    }

    private String generateS3FilePath(MultipartFile file) {
        String contentType = file.getContentType();
        String fileExtension = null;

        if (contentType != null) {
            fileExtension = switch (contentType) {
                case "image/jpeg" -> "jpg";
                case "image/png" -> "png";
                case "application/pdf" -> "pdf";
                case "video/mp4" -> "mp4";
                case "video/quicktime" -> "mov";
                case "video/x-msvideo" -> "avi";
                case "video/webm" -> "webm";
                case "video/x-matroska" -> "mkv";
                default -> throw new IllegalArgumentException("Unsupported file type: " + contentType);
            };
        }

        return "uploads/" + UUID.randomUUID() + "." + fileExtension;
    }

    /**
     * Saves a file to S3, with optional video compression if enabled and applicable
     *
     * @param file The file to upload
     * @return The S3 file path or error message
     */
    public String saveFile(MultipartFile file) {
        Path tempFile = null;
        Path compressedFile = null;

        try {
            String contentType = file.getContentType();
            boolean isVideo = contentType != null && contentType.startsWith("video/");

            // Create a temporary file from the upload
            tempFile = Files.createTempFile("upload-", file.getOriginalFilename());
            file.transferTo(tempFile.toFile());

            // Compress video if enabled and it's a video file
            if (videoCompressionEnabled && isVideo && file.getSize() > maxVideoSizeMB * 1024 * 1024) {
                compressedFile = compressVideo(tempFile.toFile(), contentType);

                // If compression was successful, use the compressed file
                if (compressedFile != null) {
                    // Clean up the original temp file
                    Files.deleteIfExists(tempFile);
                    tempFile = compressedFile;
                }
            }

            String s3FilePath = generateS3FilePath(file);

            // Upload to S3
            Map<String, String> metadata = new HashMap<>();
            metadata.put("Content-Type", file.getContentType());
            metadata.put("Original-Filename", file.getOriginalFilename());

            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(s3FilePath)
                    .metadata(metadata)
                    .build();

            s3Client.putObject(putObjectRequest, tempFile);

            return s3FilePath;
        } catch (Exception e) {
            e.printStackTrace();
            return "Error uploading file to S3: " + e.getMessage();
        } finally {
            // Clean up temporary files
            try {
                if (tempFile != null) {
                    Files.deleteIfExists(tempFile);
                }
                if (compressedFile != null && !compressedFile.equals(tempFile)) {
                    Files.deleteIfExists(compressedFile);
                }
            } catch (IOException e) {
                System.err.println("Error cleaning up temporary files: " + e.getMessage());
            }
        }
    }

    /**
     * Compresses a video file using FFmpeg
     *
     * @param inputFile   The input video file
     * @param contentType The content type of the video
     * @return Path to the compressed video file, or null if compression failed
     */
    private Path compressVideo(File inputFile, String contentType) {
        try {
            // Determine output extension based on content type
            String extension = switch (contentType) {
                case "video/mp4" -> "mp4";
                case "video/quicktime" -> "mov";
                case "video/x-msvideo" -> "avi";
                case "video/webm" -> "webm";
                case "video/x-matroska" -> "mkv";
                default -> "mp4"; // Default to mp4 if unknown
            };

            // Create output file
            Path outputFile = Files.createTempFile("compressed-", "." + extension);

            // Determine FFmpeg quality settings based on configuration
            String compressionPreset = switch (videoCompressionQuality.toLowerCase()) {
                case "low" -> "ultrafast -crf 28";
                case "medium" -> "medium -crf 23";
                case "high" -> "slow -crf 18";
                default -> "medium -crf 23"; // Default to medium quality
            };

            // Build FFmpeg command
            ProcessBuilder processBuilder = new ProcessBuilder(
                    "ffmpeg",
                    "-i", inputFile.getAbsolutePath(),
                    "-c:v", "libx264",
                    "-preset", compressionPreset.split(" ")[0],
                    "-crf", compressionPreset.split(" ")[1],
                    "-c:a", "aac",
                    "-b:a", "128k",
                    outputFile.toString()
            );

            Process process = processBuilder.start();
            boolean completed = process.waitFor(30, TimeUnit.MINUTES);

            if (!completed) {
                process.destroyForcibly();
                System.err.println("Video compression timed out");
                return null;
            }

            if (process.exitValue() != 0) {
                System.err.println("Video compression failed with exit code: " + process.exitValue());
                return null;
            }

            // Check if compression actually reduced file size
            if (Files.size(outputFile) >= inputFile.length()) {
                System.out.println("Compression did not reduce file size. Using original file.");
                Files.deleteIfExists(outputFile);
                return inputFile.toPath();
            }

            return outputFile;
        } catch (Exception e) {
            System.err.println("Error compressing video: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }

    /**
     * Batch uploads multiple files with optimization
     *
     * @param files Array of files to upload
     * @return Array of S3 file paths or error messages
     */
    public String[] saveFiles(MultipartFile[] files) {
        String[] results = new String[files.length];

        for (int i = 0; i < files.length; i++) {
            results[i] = saveFile(files[i]);
        }

        return results;
    }

    /**
     * Deletes a file from S3
     *
     * @param fileName The S3 key of the file to delete
     * @return Success or error message
     */
    public boolean deleteFile(String fileName) {
        try {
            s3Client.deleteObject(builder -> builder.bucket(bucketName).key(fileName));
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}