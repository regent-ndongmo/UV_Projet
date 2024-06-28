package com.dicap.ImageUploadApi;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
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
    @Column(nullable = false)
    @NotBlank(message = "the title can't be blank")
    @NotEmpty(message = "the title can't be blank")
    private String title;
    @Column(nullable = false)
    @NotBlank(message = "the description can't be blank")
    @NotEmpty(message = "the description can't be blank")
    private String description;
    private Long likes;
    private byte[] url;
    private Long phototographer_id;
    private Long category_id;
    private boolean deleted = Boolean.FALSE;
}
