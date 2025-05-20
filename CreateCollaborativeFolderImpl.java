@Service
@RequiredArgsConstructor
@Slf4j
public class CreateCollaborativeFolderImpl implements CreateCollaborativeFolder {
    private final TeamSpaceRepository teamSpaceRepository;
    private final FolderRepository folderRepository;
    private final FolderMapper folderMapper;

    @Override
    @Transactional
    public FolderDTO handle(CreateCollaborativeFolderRequest input, RequestContext context) {
        log.info("Creating collaborative folder {} in team space {}", input.getName(), input.getTeamSpaceId());

        String requestingUserIgg = context.getUser().get().getIgg().toString();

        // Get the team space
        TeamSpace teamSpace = teamSpaceRepository.findById(input.getTeamSpaceId())
                .orElseThrow(() -> new IllegalArgumentException("Team space not found"));

        // Verify if user has permission to create folders
        if (!teamSpace.isMember(requestingUserIgg)) {
            throw new AccessDeniedException("Only team space members can create folders");
        }

        // Check parent folder if provided
        Folder parentFolder = null;
        if (input.getParentFolderId() != null) {
            parentFolder = folderRepository.findById(input.getParentFolderId())
                .orElseThrow(() -> new IllegalArgumentException("Parent folder not found"));

            // Verify parent folder belongs to the same team space
            if (!teamSpace.getId().equals(parentFolder.getTeamSpace().getId())) {
                throw new IllegalArgumentException("Parent folder must belong to the same team space");
            }
        }

        // Create folder
        Folder folder = Folder.builder()
                .name(input.getName())
                .description(input.getDescription())
                .parent(parentFolder)
                .teamSpace(teamSpace)
                .collaborative(true)
                .build();

        // Save folder
        Folder savedFolder = folderRepository.save(folder);
        log.info("Collaborative folder created successfully with ID: {}", savedFolder.getId());

        return folderMapper.toDTO(savedFolder);
    }
}