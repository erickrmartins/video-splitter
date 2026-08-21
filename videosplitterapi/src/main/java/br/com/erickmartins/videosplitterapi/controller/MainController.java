package br.com.erickmartins.videosplitterapi.controller;

import java.io.IOException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.erickmartins.videosplitterapi.model.CutterModel;
import br.com.erickmartins.videosplitterapi.service.CutterService;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "*")
public class MainController {
    
    CutterService cutterService;
    
    public MainController(CutterService cutterService) {
        this.cutterService = cutterService;
    }

    @PostMapping("/split")
    public ResponseEntity<String> splitVideo( @RequestBody CutterModel model) throws IOException
    {
        return cutterService.splitVideo(model);
    }
}
