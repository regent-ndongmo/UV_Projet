package com.dicap.ImageUploadApi;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ImageSevice {
    @Autowired
    private final ImageRepository imageRepository;

    public Long count() {
        return imageRepository.count();
    }

    public List<ImageEntity>  findByTitleOrDescription(String title, String description) {
        return imageRepository.findByTitleOrDescription(title, description);
    }

    public boolean existeImage(Long id) {
        return imageRepository.existsById(id);
    }

    public ImageEntity incrementLikes( Long id) {
        Optional<ImageEntity> optionalImage = imageRepository.findById(id);
        if (optionalImage.isPresent()) {
            ImageEntity image = optionalImage.get();
            image.setLikes(image.getLikes() + 1);
            return imageRepository.save(image);
        } else {
            throw new RuntimeException("Image not found");
        }
    }

    public ImageEntity saveImage(MultipartFile file) throws IOException {
        ImageEntity image = new ImageEntity();
        image.setTitle(file.getOriginalFilename());
        image.setUrl(file.getBytes());
        image.setLikes(3L);
        return imageRepository.save(image);
    }

    public Optional<ImageEntity> getImage(Long id) {
        return imageRepository.findById(id);
    }

    public void deleteImage(Long id) {
        imageRepository.deleteById(id);
    }

    public List<ImageEntity> getAllImages() {
        return imageRepository.findAll();
    }

    @Transactional
    public void deleteAllImages() {
        imageRepository.deleteAll();
    }
}
