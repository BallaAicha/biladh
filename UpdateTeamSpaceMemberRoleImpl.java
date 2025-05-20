@Service
@RequiredArgsConstructor
@Slf4j
public class UpdateTeamSpaceMemberRoleImpl implements UpdateTeamSpaceMemberRole {
    private final TeamSpaceRepository teamSpaceRepository;
    private final TeamSpaceMemberMapper memberMapper;

    @Override
    @Transactional
    public TeamSpaceMemberDTO handle(UpdateTeamSpaceMemberRoleRequest input, RequestContext context) {
        log.info("Updating role for member {} in team space {}", input.getMemberIgg(), input.getTeamSpaceId());

        String requestingUserIgg = context.getUser().get().getIgg().toString();

        // Get the team space
        TeamSpace teamSpace = teamSpaceRepository.findById(input.getTeamSpaceId())
                .orElseThrow(() -> new IllegalArgumentException("Team space not found"));

        // Verify if requesting user has permission to update roles
        if (!teamSpace.isUserOwner(requestingUserIgg)) {
            throw new AccessDeniedException("Only owners can update member roles");
        }

        // Cannot change owner's role
        if (teamSpace.isUserOwner(input.getMemberIgg())) {
            throw new IllegalArgumentException("Cannot change owner's role");
        }

        // Update member's role
        teamSpace.updateMemberRole(input.getMemberIgg(), input.getNewRole());
        
        // Save changes
        TeamSpace updatedTeamSpace = teamSpaceRepository.save(teamSpace);
        
        // Return updated member
        return memberMapper.toDTO(updatedTeamSpace.getMemberByIgg(input.getMemberIgg())
                .orElseThrow(() -> new IllegalStateException("Member not found after update")));
    }
}