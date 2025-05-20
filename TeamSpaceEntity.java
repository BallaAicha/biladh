@Entity
@Table(name = "team_spaces")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TeamSpaceEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String description;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private TeamSpaceStatus status;

    @OneToMany(mappedBy = "teamSpace", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<TeamSpaceMemberEntity> members = new HashSet<>();

    @OneToMany(mappedBy = "teamSpace", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Folder> folders = new HashSet<>();

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}