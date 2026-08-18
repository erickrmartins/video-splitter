package br.com.erickmartins.videosplitterapi.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.erickmartins.videosplitterapi.model.CutterModel;

@RestController
@RequestMapping("/api/v1")
public class MainController {
    
    @PostMapping("/split")
    public ResponseEntity<String> splitVideo( @RequestBody CutterModel model)
    {
        
        return ResponseEntity.ok("Video recebido!");
    }
}
