package com.qalb.SkillMatching.Controllers;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.qalb.SkillMatching.Models.Keyword;
import com.qalb.SkillMatching.Models.Offer;
import com.qalb.SkillMatching.Services.OfferService;
import com.qalb.SkillMatching.Services.ScrapingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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
@CrossOrigin(origins = "*")

public class OffersController {
    private final ScrapingService scrapingService;
    private final OfferService offerService;

    @GetMapping
    public List<Offer> getOffers(){
        return offerService.getOffers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Offer> getOffer(@PathVariable String id){
        Offer offer = offerService.getOfferById(id);
        if (offer != null) {
            return new ResponseEntity<>(offer, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<String> fetchOffer(@RequestBody String url) {
        Map<String, String> offer = scrapingService.scrape(url);
        offerService.saveOffer(offer);

        // Convert map to JSON
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonResult = null;
        try {
            jsonResult = objectMapper.writeValueAsString(offer);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        System.out.println(jsonResult);
        return ResponseEntity.ok(jsonResult);
    }
}
