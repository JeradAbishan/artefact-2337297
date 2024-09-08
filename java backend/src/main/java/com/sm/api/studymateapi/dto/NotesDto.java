package com.sm.api.studymateapi.dto;


import lombok.*;

import java.sql.Timestamp;

@Getter
@Setter
@Data
@AllArgsConstructor
@Builder
public class NotesDto {
    private Long id;
    private Long ownerId;
    private String originalText;
    private String aiSummarizedText;
    private Timestamp generatedTime;
    private byte[] fileContent;
    private String fileLink;
}
