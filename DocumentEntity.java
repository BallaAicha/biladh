@Entity
@Table(name = "documents")
@Getter
@Setter
public class DocumentEntity {
    // ... champs existants ...

    @Column(name = "shared_in_team_space")
    private boolean sharedInTeamSpace = false; // default false pour la rétrocompatibilité

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "original_document_id")
    private DocumentEntity originalDocument;
}