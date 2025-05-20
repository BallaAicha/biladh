@Service
@RequiredArgsConstructor
@Slf4j
public class AddTeamSpaceMemberImpl implements AddTeamSpaceMember {
    private final TeamSpaceRepository teamSpaceRepository;
    private final UserRepository userRepository;
    private final TeamSpaceMemberRepository memberRepository;
    private final TeamSpaceMemberMapper memberMapper;

    @Override
    @Transactional
    public TeamSpaceMemberDTO handle(AddTeamSpaceMemberRequest input, RequestContext context) {
        log.info("Adding member with IGG {} to team space {}", input.getMemberIgg(), input.getTeamSpaceId());

        String requestingUserIgg = context.getUser().get().getIgg().toString();

        // Verify team space exists
        TeamSpace teamSpace = teamSpaceRepository.findById(input.getTeamSpaceId())
                .orElseThrow(() -> new IllegalArgumentException("Team space not found"));

        // Verify requesting user is admin or owner
        if (!teamSpace.isUserAdmin(requestingUserIgg)) {
            throw new AccessDeniedException("Only admins can add members");
        }

        // Verify new member exists
        userRepository.findByIgg(input.getMemberIgg())
                .orElseThrow(() -> new IllegalArgumentException("User to be added not found"));

        // Verify user isn't already a member
        if (memberRepository.findByTeamSpaceIdAndUserIgg(input.getTeamSpaceId(), input.getMemberIgg()).isPresent()) {
            throw new IllegalArgumentException("User is already a member of this team space");
        }

        TeamSpaceMember member = TeamSpaceMember.builder()
                .teamSpaceId(input.getTeamSpaceId())
                .userIgg(input.getMemberIgg())
                .role(input.getRole())
                .build();

        TeamSpaceMember savedMember = memberRepository.save(member);
        log.info("Member added successfully to team space");

        return memberMapper.toDTO(savedMember);
    }
}