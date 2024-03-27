package com.qalb.SkillMatching.Services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UtilityService {

    public List<String> getWords(String paragraph){
        return Arrays.stream(paragraph.split("[\\s,.]+"))
                .map(String::toLowerCase)
                .collect(Collectors.toList());    }
}
