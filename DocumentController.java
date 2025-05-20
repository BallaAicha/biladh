@RestController
@RequestMapping("/documents")
public class DocumentController {
    // ... autres méthodes existantes ...

    @Operation(
        summary = "Create a collaborative folder in a team space",
        parameters = {
            @Parameter(ref = "entityIdHeader", required = true)
        }
    )
    @PostMapping("/collaborative")
    @ResponseStatus(HttpStatus.CREATED)
    public FolderDTO createCollaborativeFolder(
            @Valid @RequestBody CreateCollaborativeFolderRequest request,
            @ModelAttribute @GraphQLRootContext RequestContext context) {
        return createCollaborativeFolder.handle(request, context);
    }

    @Operation(
        summary = "Share a document with a team space",
        parameters = {
            @Parameter(ref = "entityIdHeader", required = true)
        }
    )
    @PostMapping("/share")
    public DocumentDTO shareDocument(
            @Valid @RequestBody ShareDocumentWithTeamSpaceRequest request,
            @ModelAttribute @GraphQLRootContext RequestContext context) {
        return shareDocumentWithTeamSpace.handle(request, context);
    }
}