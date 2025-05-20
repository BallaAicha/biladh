@Slf4j
public class DocumentUploadHelper {
    // ... autres champs et méthodes ...

    public DocumentVersionDTO uploadDocumentVersion(MultipartFile file, CreateDocumentVersionRequest input, RequestContext context) {
        validateFile(file);

        // Vérifier les permissions dans l'espace collaboratif si nécessaire
        if (input.getFolderId() != null) {
            Folder folder = folderRepository.findById(input.getFolderId())
                .orElseThrow(() -> new IllegalArgumentException("Folder not found"));

            if (folder.isCollaborative()) {
                TeamSpace teamSpace = folder.getTeamSpace();
                String userIgg = context.getUser().get().getIgg().toString();
                
                if (!teamSpace.isMember(userIgg)) {
                    throw new AccessDeniedException("Only team space members can upload documents to collaborative folders");
                }
            }
        }

        // ... reste du code existant ...
    }
}