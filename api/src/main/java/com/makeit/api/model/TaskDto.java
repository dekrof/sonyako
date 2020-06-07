package com.makeit.api.model;

import io.swagger.annotations.ApiModel;
import lombok.*;

import java.time.LocalDateTime;

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
public class TaskDto {

    private Long id;
    private String name;
    private String description;
    private Long complexity;
    private Long duration;
    private Long projectId;
    private Long parentTaskId;
    private Integer progressStatus;
    private LocalDateTime statedAt;
    private boolean isOverdone;
}
