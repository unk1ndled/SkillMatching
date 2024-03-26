package com.qalb.SkillMatching.Models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Map;

@Document(collection = "keyword")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Profile {
    @Id
    private String id;
    private String firstName;
    private String lastName;
    private String history;
    private String objective;
    private String skills;
    private Map<String, Integer> recognizedSkills;
}
