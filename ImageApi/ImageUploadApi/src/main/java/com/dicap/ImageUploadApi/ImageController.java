package com.dicap.ImageUploadApi;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@RestController
@RequestMapping("/image")
@Validated
@CrossOrigin(origins = "http://localhost:4200")
public class ImageController {
    @Autowired
    private final ImageSevice imageSevice;

    @GetMapping("/count")
    public Long count() {
        return imageSevice.count();
    }

    @PostMapping
    public ResponseEntity<?> uploadImage(@Valid @RequestParam("file") MultipartFile file, BindingResult result) throws IOException {
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body("Erreur de validation: " + result.getFieldError().getDefaultMessage());
        }
        ImageEntity image = imageSevice.saveImage(file);
        return ResponseEntity.ok(image);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ImageEntity> findById(@PathVariable  @NotBlank(message = "L'Id ne peut pas être vide") Long id) {
        return imageSevice.getImage(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/title/{title}")
    public List<ImageEntity> getImageByTitle(@PathVariable  @NotBlank(message = "Le titre ne peut pas être vide") String title) {
        return imageSevice.findByTitleOrDescription(title, null);
    }

    @GetMapping("/description/{description}")
    public List<ImageEntity> getImageByDescription(@PathVariable    @NotBlank(message = "La description ne peut pas être vide") String description) {
        return imageSevice.findByTitleOrDescription(null, description);
    }

    @GetMapping("/title/{title}/description/{description}")
    public List<ImageEntity> getImageByTitleOrDescription(@PathVariable  @NotBlank(message = "Le titre ne peut pas être vide") String title, @PathVariable  @NotBlank(message = "La description ne peut pas être vide") String description) {
        return imageSevice.findByTitleOrDescription(title, description);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteImage(@PathVariable Long id) {
        if (id == null || id <= 0) {
            return ResponseEntity.badRequest().body("L'identifiant de l'utilisateur doit être spécifié et positif.");
        }

        if (!imageSevice.existeImage(id)) {
            return ResponseEntity.notFound().build();
        }
        imageSevice.deleteImage(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
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
