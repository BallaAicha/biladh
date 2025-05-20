@Component
@RequiredArgsConstructor
public class TeamSpaceRepositoryImpl implements TeamSpaceRepository {
    private final TeamSpaceJpaRepository teamSpaceJpaRepository;
    private final TeamSpaceMapper teamSpaceMapper;

    @Override
    public TeamSpace save(TeamSpace teamSpace) {
        TeamSpaceEntity entity = teamSpaceMapper.toEntity(teamSpace);
        return teamSpaceMapper.toDomain(teamSpaceJpaRepository.save(entity));
    }

    @Override
    public Optional<TeamSpace> findById(Long id) {
        return teamSpaceJpaRepository.findById(id)
                .map(teamSpaceMapper::toDomain);
    }

    @Override
    public List<TeamSpace> findByMemberIgg(String igg) {
        return teamSpaceJpaRepository.findByMembers_User_Igg(igg).stream()
                .map(teamSpaceMapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteById(Long id) {
        teamSpaceJpaRepository.deleteById(id);
    }

    @Override
    public boolean existsByNameAndStatus(String name, TeamSpaceStatus status) {
        return teamSpaceJpaRepository.existsByNameAndStatus(name, status);
    }
}