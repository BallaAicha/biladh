public interface AddTeamSpaceMember extends Command {
    TeamSpaceMemberDTO handle(AddTeamSpaceMemberRequest input, RequestContext context);
}