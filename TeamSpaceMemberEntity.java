@Entity
@Table(name = "team_space_members")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TeamSpaceMemberEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_space_id", nullable = false)
    private TeamSpaceEntity teamSpace;

    @Column(name = "user_igg", nullable = false)
    private String userIgg;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private TeamSpaceRole role;

    @Column(name = "joined_at")
    private LocalDateTime joinedAt;

    @PrePersist
    protected void onCreate() {
        joinedAt = LocalDateTime.now();
    }
}