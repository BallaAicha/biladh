@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TeamSpaceMemberDTO {
    private Long id;
    private Long teamSpaceId;
    private UserDTO user;
    private TeamSpaceRole role; // OWNER, ADMIN, MEMBER
    private LocalDateTime joinedAt;
}