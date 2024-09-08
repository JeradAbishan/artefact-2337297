package com.sm.api.studymateapi.model;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;

@Getter
@Setter
@Entity
@Table(name = "notes")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Notes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;

    @Column(name = "original_text", nullable = false)
    private String originalText;


    private String aiSummarizedText;

    @Column(name = "generated_time", updatable = false, insertable = false)
    private Timestamp generatedTime;

    private byte[] fileContent;


    private String fileLink;
}
