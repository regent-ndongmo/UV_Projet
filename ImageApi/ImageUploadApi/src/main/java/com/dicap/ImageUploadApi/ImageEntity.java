package com.dicap.ImageUploadApi;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "image_upload1")
@SQLDelete(sql = "UPDATE image_upload1 SET deleted = true WHERE id=?")
@Where(clause = "deleted=false")
public class ImageEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id;
    private String title;
    private String description;
    private Long likes;
    private byte[] url;
    private Long phototographer_id;
    private Long category_id;
    private boolean deleted = Boolean.FALSE;
}
