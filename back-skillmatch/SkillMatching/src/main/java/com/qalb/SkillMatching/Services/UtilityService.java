package com.qalb.SkillMatching.Services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UtilityService {

    public List<String> getWords(String paragraph){
        List<String> words = Arrays.asList(paragraph.split("[\\s,\\.,\\,]+")); // Split by whitespace, commas, or periods
        return words;
    }


}
