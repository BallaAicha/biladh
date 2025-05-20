@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TeamSpace {
    private Long id;
    private String name;
    private String description;
    private TeamSpaceStatus status;
    private Set<TeamSpaceMember> members = new HashSet<>();
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public boolean isUserAdmin(String userIgg) {
        return members.stream()
                .filter(member -> member.getUserIgg().equals(userIgg))
                .anyMatch(member -> member.getRole() == TeamSpaceRole.ADMIN 
                        || member.getRole() == TeamSpaceRole.OWNER);
    }

    public boolean isUserOwner(String userIgg) {
        return members.stream()
                .filter(member -> member.getUserIgg().equals(userIgg))
                .anyMatch(member -> member.getRole() == TeamSpaceRole.OWNER);
    }

    public void addMember(TeamSpaceMember member) {
        members.add(member);
    }
}