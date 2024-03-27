package com.qalb.SkillMatching.Models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProfileAndEmailRequest {
    private Profile profile;
    private String email;
}
