// Airport.java (Entity)
package net.airlineSystem.my_springApp.model;

import jakarta.persistence.*;

@Entity
@Table(name = "airports")
public class Airports {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long aiportId;

    @Column(unique = true, nullable = false)
    private String name;

    // Getters and Setters
    public Long getAiportId() {
        return aiportId;
    }

    public void setAiportId(Long aiportId) {
        this.aiportId = aiportId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
