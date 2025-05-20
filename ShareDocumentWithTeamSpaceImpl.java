@Service
@RequiredArgsConstructor
@Slf4j
public class ShareDocumentWithTeamSpaceImpl implements ShareDocumentWithTeamSpace {
    private final TeamSpaceRepository teamSpaceRepository;
    private final DocumentRepository documentRepository;
    private final FolderRepository folderRepository;
    private final DocumentMapper documentMapper;

    @Override
    @Transactional
    public DocumentDTO handle(ShareDocumentWithTeamSpaceRequest input, RequestContext context) {
        log.info("Sharing document {} with team space {}", input.getDocumentId(), input.getTeamSpaceId());

        String requestingUserIgg = context.getUser().get().getIgg().toString();

        // Get the document
        Document document = documentRepository.findById(input.getDocumentId())
                .orElseThrow(() -> new IllegalArgumentException("Document not found"));

        // Get the team space
        TeamSpace teamSpace = teamSpaceRepository.findById(input.getTeamSpaceId())
                .orElseThrow(() -> new IllegalArgumentException("Team space not found"));

        // Get the target folder
        Folder targetFolder = folderRepository.findById(input.getTargetFolderId())
                .orElseThrow(() -> new IllegalArgumentException("Target folder not found"));

        // Verify permissions
        if (!teamSpace.isMember(requestingUserIgg)) {
            throw new AccessDeniedException("Only team space members can share documents");
        }

        // Verify target folder belongs to the team space
        if (!teamSpace.getId().equals(targetFolder.getTeamSpace().getId())) {
            throw new IllegalArgumentException("Target folder must belong to the specified team space");
        }

        // Create a new version of the document in the collaborative space
        Document sharedDocument = Document.builder()
                .name(document.getName())
                .description(document.getDescription())
                .version("1.0") // Start with version 1.0 in the new space
                .fileType(document.getFileType())
                .fileSize(document.getFileSize())
                .filePath(document.getFilePath())
                .status(DocumentStatus.SHARED)
                .folder(targetFolder)
                .parentDocument(document)
                .tags(new HashSet<>(document.getTags()))
                .metadata(new HashMap<>(document.getMetadata()))
                .build();

        // Save shared document
        Document savedDocument = documentRepository.save(sharedDocument);
        log.info("Document shared successfully with ID: {}", savedDocument.getId());

        return documentMapper.toDTO(savedDocument);
    }
}