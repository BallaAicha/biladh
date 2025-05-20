@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class TeamSpaceController implements TeamSpaceAPI {
    private final CreateTeamSpace createTeamSpace;
    private final AddTeamSpaceMember addTeamSpaceMember;

    @Override
    public TeamSpaceDTO handle(CreateTeamSpaceRequest input, RequestContext context) {
        return createTeamSpace.handle(input, context);
    }

    @Override
    public TeamSpaceMemberDTO handle(AddTeamSpaceMemberRequest input, RequestContext context) {
        return addTeamSpaceMember.handle(input, context);
    }
}