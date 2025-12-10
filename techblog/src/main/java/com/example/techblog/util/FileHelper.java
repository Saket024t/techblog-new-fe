package com.example.techblog.util;

import org.springframework.stereotype.Component;
import java.io.File;
import java.io.InputStream;
import java.io.FileOutputStream;

/**
 * Helper class to simulate file system operations (saving/deleting pictures).
 * Replaces the static methods in the original Helper class.
 * NOTE: In a real Spring Boot app, this would use MultipartFile and proper storage service (S3/Cloud).
 */
@Component
public class FileHelper {
    
    // Corresponds to Helper.deleteFile
    public boolean deleteFile(String path) {
        System.out.println("Simulating file DELETE for path: " + path);
        // In a real app:
        // File file = new File(path);
        // return file.delete();
        return true; 
    }
    
    // Corresponds to Helper.saveFile
    public boolean saveFile(InputStream is, String path) {
        System.out.println("Simulating file SAVE to path: " + path);
        // In a real app, this would handle the InputStream content and write it.
        /*
        try (FileOutputStream fos = new FileOutputStream(path)) {
            byte[] buffer = new byte[1024];
            int bytesRead;
            while ((bytesRead = is.read(buffer)) != -1) {
                fos.write(buffer, 0, bytesRead);
            }
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        */
        return true; 
    }
}
