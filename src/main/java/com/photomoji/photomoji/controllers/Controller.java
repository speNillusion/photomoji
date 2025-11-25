package com.photomoji.photomoji.controllers;

import com.photomoji.photomoji.dto.MensagemDTO;
import com.photomoji.photomoji.dto.MensagemDTO.WordRequest;
import com.photomoji.photomoji.parser.Parser;
import org.springframework.web.bind.annotation.*;

@RestController
public class Controller {
    @PostMapping("/api/parse")
    public MensagemDTO wordToEmoji(@RequestBody WordRequest request) {
        try {
            return new MensagemDTO(new Parser().wordToEmoji(request.word()));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }
}