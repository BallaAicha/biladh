public interface TeamSpaceRepository {
    TeamSpace save(TeamSpace teamSpace);
    Optional<TeamSpace> findById(Long id);
    List<TeamSpace> findByMemberIgg(String igg);
    void deleteById(Long id);
    boolean existsByNameAndStatus(String name, TeamSpaceStatus status);
}