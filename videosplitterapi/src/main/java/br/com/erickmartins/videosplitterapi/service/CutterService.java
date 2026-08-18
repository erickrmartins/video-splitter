package br.com.erickmartins.videosplitterapi.service;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

import br.com.erickmartins.videosplitterapi.model.CutterModel;

public class CutterService {
    Path ffmpeg = Paths.get("ffmpeg", "ffmpeg.exe");

    public void splitVideo(CutterModel model) throws IOException {
        int c = 0;

        ProcessBuilder processBuilder = new ProcessBuilder(
            ffmpeg.toString(),
            "-i", model.getInput(),
            "-ss", String.valueOf(c),
            "-t", String.valueOf(model.getDuration()),
            "-c", "copy",
            model.getOutput()
        );

        processBuilder.inheritIO();

        Process process = processBuilder.start();

        try {
            int exitCode = process.waitFor();

            if (exitCode != 0) {
                throw new RuntimeException("Erro ao executar o comando ffmpeg. Codigo de saida: " + exitCode);
            }
            
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new RuntimeException("O processo ffmpeg foi interrompido.", e);
        }
    } 
}
