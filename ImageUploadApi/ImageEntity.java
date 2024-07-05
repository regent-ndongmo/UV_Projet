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
@Table(name = "photos")
@SQLDelete(sql = "UPDATE photos SET deleted = true WHERE id=?")
@Where(clause = "deleted=false")
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
    private Long photographe_id=1L;
    @Column(nullable = false)
    private Long categorie_id=1L;
    private boolean deleted = Boolean.FALSE;
}
