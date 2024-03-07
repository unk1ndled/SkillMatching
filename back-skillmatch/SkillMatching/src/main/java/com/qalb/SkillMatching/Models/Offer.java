package com.qalb.SkillMatching.Models;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;



@Document(collection = "offer")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Offer {
    @Getter
    @Id
    private String id;
    private String post;
    private String profile;
    private String title;

    @Override
    public String toString() {
        return "Offer{" +
                "post='" + post + '\'' +
                ", profile='" + profile + '\'' +
                ", title='" + title + '\'' +
                '}';
    }
}
