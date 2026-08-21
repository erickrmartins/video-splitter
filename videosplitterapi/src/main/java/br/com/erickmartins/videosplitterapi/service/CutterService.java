package br.com.erickmartins.videosplitterapi.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import br.com.erickmartins.videosplitterapi.model.CutterModel;

@Service
public class CutterService {
    Path ffmpeg = Paths.get("ffmpeg", "ffmpeg.exe");

    public void needToCreateOutputDirectory(String output) {
        Path path = Paths.get(output);
        if (Files.notExists(path)) {
            try {
                Files.createDirectories(path);
            } catch (IOException e) {
                throw new RuntimeException("Erro ao criar o diretório de saída: " + output, e);
            }
        }
    }

    public Path getOutputFileName(CutterModel model, int partNumber) {
        int c = 0;
        String fileName = (Paths.get(model.getInput()).getFileName().toString().split("\\.")[0]) + "_parte_" + (partNumber);
        Path outputPath = Paths.get(model.getOutput(), fileName + ".mp4");
        while (Files.exists(outputPath)) {
            outputPath = Paths.get(model.getOutput(), fileName + "(" + (c+1) + ")" + ".mp4");
            c++;
        }
        
        return outputPath;
    }

    public ResponseEntity<String> splitVideo(CutterModel model) throws IOException {
        double videoDuration = getVideoDuration(model.getInput());
        int partesTotal = (int) Math.ceil(videoDuration / model.getDuration());

        for (int c = 0; c < partesTotal; c++) {
            needToCreateOutputDirectory(model.getOutput());

            int startTime = c * model.getDuration();
            ProcessBuilder processBuilder = new ProcessBuilder(
                ffmpeg.toString(),
                "-i", model.getInput(),
                "-ss", String.valueOf(startTime),
                "-t", String.valueOf(model.getDuration()),
                "-c", "copy",
                getOutputFileName(model, (c+1)).toString()
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
        return ResponseEntity.ok("Vídeo dividido com sucesso!");
    }

    public double getVideoDuration(String videoPath) throws IOException {
        Path ffprobe = Paths.get("ffmpeg", "ffprobe.exe");

        ProcessBuilder processBuilder = new ProcessBuilder(
            ffprobe.toString(),
            "-v", "error",
            "-show_entries", "format=duration",
            "-of", "default=noprint_wrappers=1:nokey=1",
            videoPath
        );

        Process process = processBuilder.start();
        
        BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
        String durationStr = reader.readLine();

        try {
            int exitCode = process.waitFor();
            if (exitCode != 0) {
                throw new RuntimeException("Erro ao executar o comando ffprobe. Codigo de saida: " + exitCode);
            }
        }
        catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new RuntimeException("O processo ffprobe foi interrompido.", e);
        }
        
    
        return Double.parseDouble(durationStr);
    }
}
