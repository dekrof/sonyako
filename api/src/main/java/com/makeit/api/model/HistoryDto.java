package com.makeit.api.model;

import com.makeit.dao.model.CommentType;
import com.makeit.dao.model.HistoryType;
import com.makeit.dao.model.UserStatusType;
import lombok.*;

import java.time.Instant;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */

@Data
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder(toBuilder = true)
public class HistoryDto {
    private HistoryType type;
    private CommentType commentType;
    private UserStatusType userStatus;
    private ProjectDto project;
    private CommentDto comment;
    private Instant createdAt;
    private Object belongTo;
    private boolean dated;
}
