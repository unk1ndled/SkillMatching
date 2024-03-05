package com.qalb.SkillMatching.Controllers;


import com.qalb.SkillMatching.Services.ScrapingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/v1/offers")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class OffersController {
    private final ScrapingService scrapingService;

    @PostMapping("/newoffer")
    public ResponseEntity<String> extractKeywords(@RequestBody String url) {
        String offer = scrapingService.scrape(url);
        System.out.println(offer);
        return ResponseEntity.ok(offer);
    }
}
