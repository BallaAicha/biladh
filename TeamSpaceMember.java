@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TeamSpaceMember {
    private Long id;
    private Long teamSpaceId;
    private String userIgg;
    private TeamSpaceRole role;
    private LocalDateTime joinedAt;
}