public interface CreateCollaborativeFolder extends Command {
    FolderDTO handle(CreateCollaborativeFolderRequest input, RequestContext context);
}