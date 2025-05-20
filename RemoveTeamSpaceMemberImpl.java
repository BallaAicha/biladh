@Service
@RequiredArgsConstructor
@Slf4j
public class RemoveTeamSpaceMemberImpl implements RemoveTeamSpaceMember {
    private final TeamSpaceRepository teamSpaceRepository;

    @Override
    @Transactional
    public void handle(Long teamSpaceId, String memberIgg, RequestContext context) {
        log.info("Removing member {} from team space {}", memberIgg, teamSpaceId);

        String requestingUserIgg = context.getUser().get().getIgg().toString();

        // Get the team space
        TeamSpace teamSpace = teamSpaceRepository.findById(teamSpaceId)
                .orElseThrow(() -> new IllegalArgumentException("Team space not found"));

        // Verify if requesting user has permission to remove members
        if (!teamSpace.isUserAdmin(requestingUserIgg)) {
            throw new AccessDeniedException("Only admins can remove members");
        }

        // Cannot remove the owner
        if (teamSpace.isUserOwner(memberIgg)) {
            throw new IllegalArgumentException("Cannot remove the owner from the team space");
        }

        // Remove member
        teamSpace.removeMember(memberIgg);
        
        // Save changes
        teamSpaceRepository.save(teamSpace);
        
        log.info("Member successfully removed from team space");
    }
}