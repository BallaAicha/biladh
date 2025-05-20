@Component
@RequiredArgsConstructor
public class TeamSpaceMapper {
    private final TeamSpaceMemberMapper memberMapper;
    private final FolderMapper folderMapper;

    public TeamSpaceDTO toDTO(TeamSpace domain) {
        if (domain == null) return null;
        return TeamSpaceDTO.builder()
                .id(domain.getId())
                .name(domain.getName())
                .description(domain.getDescription())
                .status(domain.getStatus().name())
                .members(domain.getMembers().stream()
                        .map(memberMapper::toDTO)
                        .collect(Collectors.toSet()))
                .folders(domain.getFolders().stream()
                        .map(folderMapper::toDTO)
                        .collect(Collectors.toSet()))
                .createdAt(domain.getCreatedAt())
                .updatedAt(domain.getUpdatedAt())
                .build();
    }

    public TeamSpaceEntity toEntity(TeamSpace domain) {
        if (domain == null) return null;
        return TeamSpaceEntity.builder()
                .id(domain.getId())
                .name(domain.getName())
                .description(domain.getDescription())
                .status(domain.getStatus())
                .members(domain.getMembers().stream()
                        .map(memberMapper::toEntity)
                        .collect(Collectors.toSet()))
                .folders(domain.getFolders().stream()
                        .map(folderMapper::toEntity)
                        .collect(Collectors.toSet()))
                .createdAt(domain.getCreatedAt())
                .updatedAt(domain.getUpdatedAt())
                .build();
    }

    public TeamSpace toDomain(TeamSpaceEntity entity) {
        if (entity == null) return null;
        return TeamSpace.builder()
                .id(entity.getId())
                .name(entity.getName())
                .description(entity.getDescription())
                .status(entity.getStatus())
                .members(entity.getMembers().stream()
                        .map(memberMapper::toDomain)
                        .collect(Collectors.toSet()))
                .folders(entity.getFolders().stream()
                        .map(folderMapper::toDomain)
                        .collect(Collectors.toSet()))
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }
}