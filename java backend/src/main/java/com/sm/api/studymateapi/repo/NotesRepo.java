package com.sm.api.studymateapi.repo;

import com.sm.api.studymateapi.model.Notes;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotesRepo extends JpaRepository<Notes, Long> {
    List<Notes> findByOwnerId(Long ownerId);
}
