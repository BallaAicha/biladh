public interface TeamSpaceAPI extends CreateTeamSpace, AddTeamSpaceMember {

    @PostMapping("/team-spaces")
    @ResponseStatus(HttpStatus.CREATED)
    @Override
    TeamSpaceDTO handle(@Valid @RequestBody CreateTeamSpaceRequest input, RequestContext context);

    @PostMapping("/team-spaces/members")
    @ResponseStatus(HttpStatus.CREATED)
    @Override
    TeamSpaceMemberDTO handle(@Valid @RequestBody AddTeamSpaceMemberRequest input, RequestContext context);
}