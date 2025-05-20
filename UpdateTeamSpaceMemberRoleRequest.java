@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateTeamSpaceMemberRoleRequest {
    @NotNull
    private Long teamSpaceId;
    
    @NotEmpty
    private String memberIgg;
    
    @NotNull
    private TeamSpaceRole newRole;
}