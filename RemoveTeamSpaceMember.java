public interface RemoveTeamSpaceMember extends Command {
    void handle(Long teamSpaceId, String memberIgg, RequestContext context);
}