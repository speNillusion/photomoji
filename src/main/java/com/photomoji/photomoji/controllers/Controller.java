package com.photomoji.photomoji.controllers;

import com.photomoji.photomoji.dto.MensagemDTO;
import com.photomoji.photomoji.dto.WordRequest; // Importe o DTO que criamos
import com.photomoji.photomoji.parser.Parser;
import org.springframework.web.bind.annotation.*;

@RestController
public class Controller {

    @PostMapping("/api/parse")
    public MensagemDTO wordToEmoji(@RequestBody WordRequest request) {
        Parser p = new Parser();
        String word = request.word();

        try {
            String output = p.wordToEmoji(word);
            return new MensagemDTO(output);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }
}