@Repository
public interface TeamSpaceJpaRepository extends JpaRepository<TeamSpaceEntity, Long> {
    List<TeamSpaceEntity> findByMembers_User_Igg(String igg);
    boolean existsByNameAndStatus(String name, TeamSpaceStatus status);
}