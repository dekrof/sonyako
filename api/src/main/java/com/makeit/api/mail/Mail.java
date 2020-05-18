package com.makeit.api.mail;

import com.google.common.collect.Maps;
import lombok.*;

import java.util.Map;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
@Data
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public class Mail {

    private String from;
    private String to;
    private String subject;
    private String content;

    @Builder.Default
    private Map<String, String> model = Maps.newHashMap();
}
