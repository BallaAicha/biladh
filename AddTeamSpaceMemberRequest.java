@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AddTeamSpaceMemberRequest {
    @NotNull
    private Long teamSpaceId;
    
    @NotEmpty
    private String memberIgg;
    
    @NotNull
    private TeamSpaceRole role;
}