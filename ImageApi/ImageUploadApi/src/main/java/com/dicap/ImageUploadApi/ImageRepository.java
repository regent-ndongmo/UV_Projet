package com.dicap.ImageUploadApi;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ImageRepository extends JpaRepository<ImageEntity, Long> {
    List<ImageEntity> findByTitleOrDescription(String title, String description);
}
