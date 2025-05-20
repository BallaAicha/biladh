public interface TeamSpaceMemberRepository {
    TeamSpaceMember save(TeamSpaceMember member);
    Optional<TeamSpaceMember> findByTeamSpaceIdAndUserIgg(Long teamSpaceId, String userIgg);
    List<TeamSpaceMember> findByUserIgg(String userIgg);
    void deleteByTeamSpaceIdAndUserIgg(Long teamSpaceId, String userIgg);
}