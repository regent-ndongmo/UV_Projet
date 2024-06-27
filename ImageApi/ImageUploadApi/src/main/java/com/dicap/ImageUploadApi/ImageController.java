package com.dicap.ImageUploadApi;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@RestController
@RequestMapping("/image")
@CrossOrigin(origins = "http://localhost:4200")
public class ImageController {
    @Autowired
    private final ImageSevice imageSevice;

    @GetMapping("/count")
    public Long count() {
        return imageSevice.count();
    }

    @PostMapping
    public ResponseEntity<ImageEntity> uploadImage(@RequestParam("file") MultipartFile file) throws IOException {
        ImageEntity image = imageSevice.saveImage(file);
        return ResponseEntity.ok(image);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ImageEntity> findById(@PathVariable Long id) {
        return imageSevice.getImage(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteImage(@PathVariable Long id) {
        imageSevice.deleteImage(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<ImageEntity>> getAllImages() {
        List<ImageEntity> images = imageSevice.getAllImages();
        return ResponseEntity.ok(images);
    }

    @PatchMapping("/{id}/like")
    public ImageEntity incrementLikes(@PathVariable Long id) {
        return imageSevice.incrementLikes(id);
    }

    @DeleteMapping("/all")
    public void deleteAllImages() {
        imageSevice.deleteAllImages();
    }
}
