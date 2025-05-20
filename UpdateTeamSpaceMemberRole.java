public interface UpdateTeamSpaceMemberRole extends Command {
    TeamSpaceMemberDTO handle(UpdateTeamSpaceMemberRoleRequest input, RequestContext context);
}