@Service
@RequiredArgsConstructor
@Slf4j
public class CreateTeamSpaceImpl implements CreateTeamSpace {
    private final TeamSpaceRepository teamSpaceRepository;
    private final UserRepository userRepository;
    private final TeamSpaceMapper teamSpaceMapper;

    @Override
    @Transactional
    public TeamSpaceDTO handle(CreateTeamSpaceRequest input, RequestContext context) {
        log.info("Creating team space with name: {}", input.getName());

        // Get user IGG from context
        String userIgg = context.getUser().get().getIgg().toString();

        // Verify user exists
        userRepository.findByIgg(userIgg)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // Verify team space name is unique
        if (teamSpaceRepository.existsByNameAndStatus(input.getName(), TeamSpaceStatus.ACTIVE)) {
            throw new IllegalArgumentException("Team space with name " + input.getName() + " already exists");
        }

        TeamSpace teamSpace = TeamSpace.builder()
                .name(input.getName())
                .description(input.getDescription())
                .status(TeamSpaceStatus.ACTIVE)
                .build();

        // Add creator as owner
        TeamSpaceMember owner = TeamSpaceMember.builder()
                .userIgg(userIgg)
                .role(TeamSpaceRole.OWNER)
                .build();
        teamSpace.addMember(owner);

        TeamSpace savedTeamSpace = teamSpaceRepository.save(teamSpace);
        log.info("Team space created successfully with ID: {}", savedTeamSpace.getId());

        return teamSpaceMapper.toDTO(savedTeamSpace);
    }
}