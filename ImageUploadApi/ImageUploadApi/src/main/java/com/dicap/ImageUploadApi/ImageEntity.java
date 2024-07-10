package com.dicap.ImageUploadApi;

import jakarta.persistence.*;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "photo")
@SQLDelete(sql = "UPDATE photo SET deleted = true WHERE id=?")

@FilterDef(
        name = "deleteImageFilter",
        parameters = @ParamDef(name = "isDeleted", type = Boolean.class)
)
@Filter(
        name = "deleteImageFilter",
        condition = "deleted = :isDeleted"
)
public class ImageEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id;
    @Column(nullable = false)
    private String title="titre";
    @Column(nullable = false)
    private String description="description";
    @Column(nullable = false)
    private Long likes=0L;
    @Column(nullable = false)
    private double price=0;
    @Column(nullable = false)
    private byte[] url;
    @Column(nullable = false)
    private Long photographeId=1L;
    @Column(nullable = false)
    private Long categorieId=1L;
    private Boolean deleted = Boolean.FALSE;
}
