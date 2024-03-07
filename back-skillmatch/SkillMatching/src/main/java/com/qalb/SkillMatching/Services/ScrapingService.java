package com.qalb.SkillMatching.Services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ScrapingService {
    public Map<String, String> scrape(String url) {
        Map<String, String> resultMap = new HashMap<>();
        try {
            Document document = Jsoup.connect(url).get();

            Element posteProposeTitle = document.selectFirst("span.ad-ss-title:contains(Poste proposé)");
            Element posteProposeParent = posteProposeTitle.parent();
            Element profilRechercheTitle = document.selectFirst("span.ad-ss-title:contains(Profil recherché pour le poste)");
            Element profilRechercheParent = profilRechercheTitle.parent();

            String posteProposeText = posteProposeParent.text();
            String profilRechercheText = profilRechercheParent.text();

            String title = extractTitle(posteProposeText);

            resultMap.put("title",title);
            resultMap.put("post", posteProposeText);
            resultMap.put("profile", profilRechercheText);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return resultMap;
    }

    private String extractTitle(String text) {
        // Assuming the title follows "Poste proposé :" and takes 4 strings after it
        String[] parts = text.split("Poste proposé :");
        if (parts.length >= 2) {
            String[] titleParts = parts[1].trim().split("\\s+", 4);
            if (titleParts.length >= 4) {
                return titleParts[0] + " " + titleParts[1] + " " + titleParts[2] + " " + titleParts[3];
            }
        }
        return "No Title Found";
    }

}
