package com.sm.api.studymateapi.controller;

import com.sm.api.studymateapi.dto.ChatRequestDto;
import com.sm.api.studymateapi.dto.NotesDto;
import com.sm.api.studymateapi.dto.TextRequestDTO;
import com.sm.api.studymateapi.service.Jwt.JwtService;
import com.sm.api.studymateapi.service.NotesService;
import com.sm.api.studymateapi.service.PythonApiService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notes")
@RequiredArgsConstructor
public class NotesController {
    @Autowired
    private final NotesService notesService;
    @Autowired
    private final JwtService jwtService;
    @Autowired
    private final PythonApiService pythonApiService;

    @PostMapping("/create")
    public ResponseEntity<NotesDto> createNote(HttpServletRequest request, @RequestBody NotesDto notesDto) {
        Long ownerId = extractOwnerIdFromToken(request);
        notesDto.setOwnerId(ownerId);
        NotesDto createdNote = notesService.createNote(notesDto, ownerId);
        return ResponseEntity.ok(createdNote);
    }

    @GetMapping("/user")
    public ResponseEntity<List<NotesDto>> getNotesByOwnerId(HttpServletRequest request) {
        Long ownerId = extractOwnerIdFromToken(request);
        List<NotesDto> notes = notesService.getNotesByOwnerId(ownerId);
        return ResponseEntity.ok(notes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<NotesDto> getNoteById(@PathVariable Long id) {
        NotesDto notesDto = notesService.getNoteById(id);
        return ResponseEntity.ok(notesDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNoteById(@PathVariable Long id) {
        notesService.deleteNoteById(id);
        return ResponseEntity.noContent().build();
    }
    @PostMapping("/chat")
    public ResponseEntity<TextRequestDTO> chat(@RequestBody ChatRequestDto chatRequestDto){
        TextRequestDTO reply = pythonApiService.getChatResponse(chatRequestDto);
        return ResponseEntity.ok(reply);

    }

    private Long extractOwnerIdFromToken(HttpServletRequest request) {
        String token = request.getHeader("Authorization").substring(7);
        return jwtService.extractId(token);
}
}
