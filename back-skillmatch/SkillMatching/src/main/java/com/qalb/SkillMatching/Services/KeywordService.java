package com.qalb.SkillMatching.Services;

import com.qalb.SkillMatching.Repositories.KeywordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class KeywordService {
    private final KeywordRepository keywordRepository;
}
