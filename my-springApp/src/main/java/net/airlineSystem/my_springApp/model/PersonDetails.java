package net.airlineSystem.my_springApp.model;

import jakarta.persistence.*;

@Entity
@Table(name = "person_details")
public class PersonDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "person_details_id") // Maps correctly to your DB column
    private Integer personDetailsId;

    @Column(name = "passport_no")
    private int passportNo;

    @Column(name = "email")
    private String email;

    @Column(name = "name")
    private String name;

    @Column(name = "flight_id")
    private int flightId;

    // Getters and Setters
    public Integer getPersonDetailsId() {
        return personDetailsId;
    }

    public void setPersonDetailsId(Integer personDetailsId) {
        this.personDetailsId = personDetailsId;
    }

    public int getPassportNo() {
        return passportNo;
    }

    public void setPassportNo(int passportNo) {
        this.passportNo = passportNo;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getFlightId() {
        return flightId;
    }

    public void setFlightId(int flightId) {
        this.flightId = flightId;
    }

    // Constructors
    public PersonDetails() {
        // default constructor
    }

    public PersonDetails(Integer personDetailsId, String name, int passportNo, String email, int flightId) {
        this.personDetailsId = personDetailsId;
        this.name = name;
        this.passportNo = passportNo;
        this.email = email;
        this.flightId = flightId;
    }

    // toString()
    @Override
    public String toString() {
        return "PersonDetails{"
                + "personDetailsId=" + personDetailsId
                + ", passportNo=" + passportNo
                + ", email='" + email + '\''
                + ", name='" + name + '\''
                + ", flightId=" + flightId
                + '}';
    }
}
