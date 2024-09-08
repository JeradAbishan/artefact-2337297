package com.sm.api.studymateapi.service.impl;

import com.sm.api.studymateapi.dto.NotesDto;
import com.sm.api.studymateapi.dto.TextRequestDTO;
import com.sm.api.studymateapi.model.Notes;
import com.sm.api.studymateapi.model.User;
import com.sm.api.studymateapi.repo.NotesRepo;
import com.sm.api.studymateapi.repo.UserRepo;
import com.sm.api.studymateapi.service.NotesService;
import com.sm.api.studymateapi.service.PythonApiService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class NotesServiceImpl implements NotesService {
    private final NotesRepo notesRepo;
    private final UserRepo  userRepo;
    private final PythonApiService pythonApiService;


    @Override
    public NotesDto createNote(NotesDto notesDto, Long OwnerId  ) {
        Notes notes = new Notes();
        notes.setOriginalText(notesDto.getOriginalText());
        //use rest template
        TextRequestDTO aiSummarizedText = pythonApiService.getSummaryResponse(notesDto.getOriginalText());
        notes.setAiSummarizedText(aiSummarizedText.getText());
        notes.setFileContent(notesDto.getFileContent());
        notes.setFileLink(notesDto.getFileLink());
        User owner = userRepo.getReferenceById(OwnerId);
        notes.setOwner(owner);
        notes = notesRepo.save(notes);
        notesDto.setAiSummarizedText(notes.getAiSummarizedText());
        return notesDto;
    }

    @Override
    public List<NotesDto> getNotesByOwnerId(Long ownerId) {
        return notesRepo.findByOwnerId(ownerId)
                .stream()
                .map(notes -> NotesDto.builder()
                        .ownerId(notes.getOwner().getId())
                        .aiSummarizedText(notes.getAiSummarizedText())
                        .fileContent(notes.getFileContent())
                        .generatedTime(notes.getGeneratedTime())
                        .fileLink(notes.getFileLink())
                        .originalText(notes.getOriginalText())
                        .id(notes.getId()).build())
                .collect(Collectors.toList());
    }

    @Override
    public NotesDto getNoteById(Long id) {
        Notes notes = notesRepo.findById(id).orElseThrow(/* throw exception */);
        return NotesDto.builder()
                .ownerId(notes.getOwner().getId())
                .aiSummarizedText(notes.getAiSummarizedText())
                .fileContent(notes.getFileContent())
                .generatedTime(notes.getGeneratedTime())
                .fileLink(notes.getFileLink())
                .originalText(notes.getOriginalText())
                .id(notes.getId()).build();
    }

    @Override
    public void deleteNoteById(Long id) {
        notesRepo.deleteById(id);
    }


}
