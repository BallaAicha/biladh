@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateTeamSpaceRequest {
    @NotEmpty
    private String name;
    
    private String description;
    
    @NotNull
    private TeamSpaceRole role;
}