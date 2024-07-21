package com.dicap.ImageUploadApi;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Optional;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;


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
    public ResponseEntity<ImageEntity> uploadImage(@RequestParam("file") MultipartFile file,
                                                   @RequestParam("description") String description,
                                                   @RequestParam("category_id") Long category_id,
                                                   @RequestParam("price") double price,
                                                   @RequestParam("photographer_id") Long photographer_id,
                                                   @RequestParam("title") String title) throws IOException {
        ImageEntity image = imageSevice.saveImage(file,title,description,price,category_id,photographer_id);
        return ResponseEntity.ok(image);

    }

    @GetMapping("/{id}")
    public ResponseEntity<ImageEntity> findById(@PathVariable Long id) {
        return imageSevice.getImage(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/photographe/{id}")
    public List<ImageEntity> getByPhotographe(@PathVariable Long id, @RequestParam(value =
            "isDeleted", required = false, defaultValue = "false") boolean
            isDeleted){
        return imageSevice.getAllByPhotographeId(id,isDeleted);
    }

    @GetMapping("/categorie/{id}")
    public List<ImageEntity> getByCategorie(@PathVariable Long id,@RequestParam(value =
            "isDeleted", required = false, defaultValue = "false") boolean
            isDeleted){
        return imageSevice.getAllByCategorieId(id, isDeleted);
    }


    @PatchMapping("/{id}/like")
    public ResponseEntity<ImageEntity> incrementLikes(@PathVariable Long id) {
        ImageEntity updatedImage = imageSevice.incrementLikes(id);
        return ResponseEntity.ok(updatedImage);
    }

    @PatchMapping("/{id}/unlike")
    public ResponseEntity<ImageEntity> decrementLikes(@PathVariable Long id) {
        ImageEntity updatedImage = imageSevice.decrementLikes(id);
        return ResponseEntity.ok(updatedImage);
    }

    @PatchMapping("/{id}/restore")
    public ResponseEntity<ImageEntity> restore(@PathVariable Long id) {
        ImageEntity updatedImage = imageSevice.restore(id);
        return ResponseEntity.ok(updatedImage);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteImage(@PathVariable Long id) {
        imageSevice.deleteImage(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<ImageEntity>> getAllImages(@RequestParam(value =
            "isDeleted", required = false, defaultValue = "false") boolean
            isDeleted) {
        List<ImageEntity> images = imageSevice.findAllFilter(isDeleted);
        return ResponseEntity.ok(images);
    }

    @DeleteMapping("/all")
    public void deleteAllImages() {
        imageSevice.deleteAllImages();
    }

    @GetMapping("/{id}/zip")
    public ResponseEntity<byte[]> getZippedImage(@PathVariable Long id) {
        Optional<ImageEntity> image = imageSevice.getImage(id);

        if (image == null) {
            return ResponseEntity.notFound().build();
        }

        try {
            byte[] compressedImage = compressImage(image.get().getUrl());
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            headers.setContentDispositionFormData("attachment", image.get().getTitle()+".zip");

            return new ResponseEntity<>(compressedImage, headers, HttpStatus.OK);
        }catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    private byte[] compressImage(byte[] imageData) throws IOException {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        try (ZipOutputStream zos = new ZipOutputStream(baos)) {
            ZipEntry entry = new ZipEntry("image.jpg");
            zos.putNextEntry(entry);
            zos.write(imageData);
            zos.closeEntry();
        }
        return baos.toByteArray();

    }

}
