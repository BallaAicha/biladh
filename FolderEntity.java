@Entity
@Table(name = "folders")
@Getter
@Setter
public class FolderEntity {
    // ... champs existants ...

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_space_id")
    private TeamSpaceEntity teamSpace;

    @Column(name = "is_collaborative")
    private boolean collaborative = false; // default false pour la rétrocompatibilité
}