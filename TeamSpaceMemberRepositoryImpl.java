@Component
@RequiredArgsConstructor
public class TeamSpaceMemberRepositoryImpl implements TeamSpaceMemberRepository {
    private final TeamSpaceMemberJpaRepository teamSpaceMemberJpaRepository;
    private final TeamSpaceMemberMapper memberMapper;

    @Override
    public TeamSpaceMember save(TeamSpaceMember member) {
        TeamSpaceMemberEntity entity = memberMapper.toEntity(member);
        return memberMapper.toDomain(teamSpaceMemberJpaRepository.save(entity));
    }

    @Override
    public Optional<TeamSpaceMember> findByTeamSpaceIdAndUserIgg(Long teamSpaceId, String userIgg) {
        return teamSpaceMemberJpaRepository.findByTeamSpace_IdAndUserIgg(teamSpaceId, userIgg)
                .map(memberMapper::toDomain);
    }

    @Override
    public List<TeamSpaceMember> findByUserIgg(String userIgg) {
        return teamSpaceMemberJpaRepository.findByUserIgg(userIgg).stream()
                .map(memberMapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteByTeamSpaceIdAndUserIgg(Long teamSpaceId, String userIgg) {
        teamSpaceMemberJpaRepository.deleteByTeamSpace_IdAndUserIgg(teamSpaceId, userIgg);
    }
}