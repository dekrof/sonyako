package com.makeit.api.model;

import com.makeit.dao.model.CommentType;
import io.swagger.annotations.ApiModel;
import lombok.*;
import org.springframework.lang.Nullable;

import java.time.Instant;
import java.util.List;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
@Data
@ApiModel
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class CommentDto {

    private Long id;
    private UserDto commentator;

    @Builder.Default
    private String title = "";

    private String description;
    private CommentDto parent;
    private List<CommentDto> replies;

    @Nullable
    private CommentType type;

    @Nullable
    private Long belongTo;

    private Instant createdAt;
}
