package com.qalb.SkillMatching.Models;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "keyword")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Keyword {

    @Id
    private String id;
    private String name;
    private String about;
}