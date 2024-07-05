package com.dicap.ImageUploadApi;

import com.zaxxer.hikari.HikariDataSource;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.hibernate.Filter;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ImageSevice {
    @Autowired
    private final ImageRepository imageRepository;

    @PersistenceContext
    private EntityManager entityManager;

    public Long count() {
        return imageRepository.count();
    }



    public ImageEntity incrementLikes(Long id) {
        Optional<ImageEntity> optionalImage = imageRepository.findById(id);
        if (optionalImage.isPresent()) {
            ImageEntity image = optionalImage.get();
            image.setLikes(image.getLikes() + 1);
            return imageRepository.save(image);
        } else {
            throw new RuntimeException("Image not found");
        }
    }


    public ImageEntity saveImage(MultipartFile file, String title,String description, double price, Long category, Long photographer) throws IOException {
        ImageEntity image = new ImageEntity();
        //image.setTitle(file.getOriginalFilename());
        image.setTitle(title);
        image.setDescription(description);
        image.setUrl(file.getBytes());
        image.setPrice(price);
        image.setCategorieId(category);
        image.setPhotographeId(photographer);
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

    public List<ImageEntity> getAllByPhotographeId(Long photographeId){return imageRepository.findByPhotographeId(photographeId);}

    public List<ImageEntity> getAllByCategorieId(Long categorieId){return imageRepository.findByCategorieId(categorieId);}

    public List<ImageEntity> getAllById(Long id){
        return imageRepository.findAllById(Collections.singleton(id));
    }

    public List<ImageEntity> findAllFilter(boolean isDeleted){

        Session session = entityManager.unwrap(Session.class);
        Filter filter = session.enableFilter("deleteImageFilter");
        filter.setParameter("isDeleted", isDeleted);
        List<ImageEntity> products =  imageRepository.findAll();
        session.disableFilter("deletedProductFilter");
        return products;
    }
}
