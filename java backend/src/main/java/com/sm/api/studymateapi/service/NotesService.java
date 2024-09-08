package com.sm.api.studymateapi.service;

import com.sm.api.studymateapi.dto.NotesDto;

import java.util.List;

public interface NotesService {
    NotesDto createNote(NotesDto notesDto, Long OwnerId);
    List<NotesDto> getNotesByOwnerId(Long ownerId);
    NotesDto getNoteById(Long id);
    void deleteNoteById(Long id);
}
