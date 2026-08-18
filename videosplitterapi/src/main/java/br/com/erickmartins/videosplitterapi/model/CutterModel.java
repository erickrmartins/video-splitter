package br.com.erickmartins.videosplitterapi.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Setter
@Getter
public class CutterModel {
    private String input;
    private String output;
    private int duration;
}
