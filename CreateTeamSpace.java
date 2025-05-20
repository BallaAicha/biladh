public interface CreateTeamSpace extends Command {
    TeamSpaceDTO handle(CreateTeamSpaceRequest input, RequestContext context);
}