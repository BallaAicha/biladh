@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ShareDocumentWithTeamSpaceRequest {
    @NotNull
    private Long documentId;
    
    @NotNull
    private Long teamSpaceId;
    
    @NotNull
    private Long targetFolderId;
}