@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateCollaborativeFolderRequest {
    @NotNull
    private Long teamSpaceId;
    
    @NotEmpty
    private String name;
    
    private String description;
    
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Long parentFolderId;
}