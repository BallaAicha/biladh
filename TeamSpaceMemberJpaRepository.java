@Repository
public interface TeamSpaceMemberJpaRepository extends JpaRepository<TeamSpaceMemberEntity, Long> {
    Optional<TeamSpaceMemberEntity> findByTeamSpace_IdAndUserIgg(Long teamSpaceId, String userIgg);
    List<TeamSpaceMemberEntity> findByUserIgg(String userIgg);
    void deleteByTeamSpace_IdAndUserIgg(Long teamSpaceId, String userIgg);
}