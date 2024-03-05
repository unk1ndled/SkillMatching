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
    public String scrape(String url) {
        Map<String, String> resultMap = new HashMap<>();
        try {
            Document document = Jsoup.connect(url).get();

            Element posteProposeTitle = document.selectFirst("span.ad-ss-title:contains(Poste proposé)");
            Element posteProposeParent = posteProposeTitle.parent();
            Element profilRechercheTitle = document.selectFirst("span.ad-ss-title:contains(Profil recherché pour le poste)");
            Element profilRechercheParent = profilRechercheTitle.parent();

            String posteProposeText = posteProposeParent.text();
            String profilRechercheText = profilRechercheParent.text();

            resultMap.put("poste_propose", posteProposeText);
            resultMap.put("profil_recherche", profilRechercheText);
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Convert map to JSON
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonResult = null;
        try {
            jsonResult = objectMapper.writeValueAsString(resultMap);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return jsonResult;
    }

    private String extractText(String text, String keyword) {
        int startIndex = text.indexOf(keyword);
        if (startIndex != -1) {
            int endIndex = text.indexOf("Profil recherché pour le poste", startIndex + keyword.length());
            if (endIndex != -1) {
                return text.substring(startIndex + keyword.length(), endIndex).trim();
            }
        }
        return "";
    }
}
