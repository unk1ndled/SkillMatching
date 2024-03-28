package com.qalb.SkillMatching.Models;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Map;

@Document(collection = "offer")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Offer {
    @Id
    private String id;
    private String post;
    private String profile;
    private String title;

    // Use custom field name for MongoDB
    @Field("recognizedSkills")
    private Map<String, String> recognizedSkills;

    // Convert Map to JSON string when saving
    public String getRecognizedSkillsJson() {
        try {
            return new ObjectMapper().writeValueAsString(recognizedSkills);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        }
    }

    // Convert JSON string to Map when reading
    public void setRecognizedSkillsJson(String json) {
        try {
            this.recognizedSkills = new ObjectMapper().readValue(json, Map.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }
}
