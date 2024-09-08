package com.sm.api.studymateapi.service;

import com.sm.api.studymateapi.dto.ChatRequestDto;
import com.sm.api.studymateapi.dto.TextRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class PythonApiService {
    @Autowired
    private RestTemplate restTemplate;

    private final String CHAT_API_URL = "http://localhost:8000/chat/text";
    private final String SUMMARY_API_URL = "http://localhost:8000/summary/text";

    public TextRequestDTO getResponse( HttpEntity<Object> entity, String apiUrl) {
        ResponseEntity<TextRequestDTO> response = restTemplate.postForEntity(apiUrl, entity, TextRequestDTO.class);
        return response.getBody();
    }
    public HttpHeaders getHeaders (){
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");
        return headers;
    }

    public TextRequestDTO getChatResponse(ChatRequestDto chatRequestDto) {
        HttpEntity<Object> entity = new HttpEntity<>(chatRequestDto, getHeaders());
        return getResponse(entity, CHAT_API_URL);
    }

    public TextRequestDTO getSummaryResponse(String text) {
        TextRequestDTO requestDTO = new TextRequestDTO(text);
        HttpEntity<Object> entity = new HttpEntity<>(requestDTO, getHeaders());
        return getResponse(entity, SUMMARY_API_URL);
    }



}
