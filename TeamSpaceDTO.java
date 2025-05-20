@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TeamSpaceDTO {
    private Long id;
    private String name;
    private String description;
    private String status;
    private Set<UserDTO> members;
    private Set<FolderDTO> folders;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}