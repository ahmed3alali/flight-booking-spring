package net.airlineSystem.my_springApp.model;

import java.util.Objects;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Airports {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer airportId;  // fixed typo here

    private String city;
    private String airport;
    private String code;
    private String country;

    public Airports() {
        super();
    }

    public Airports(Integer airportId, String city, String airport, String code, String country) {
        super();
        this.airportId = airportId;
        this.city = city;
        this.airport = airport;
        this.code = code;
        this.country = country;
    }

    public Integer getAirportId() {
        return airportId;
    }

    public void setAirportId(Integer airportId) {
        this.airportId = airportId;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getAirport() {
        return airport;
    }

    public void setAirport(String airport) {
        this.airport = airport;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    @Override
    public String toString() {
        return "Airports [airportId=" + airportId + ", city=" + city + ", airport=" + airport + ", code=" + code
                + ", country=" + country + "]";
    }

    @Override
    public int hashCode() {
        return Objects.hash(airport, airportId, city, code, country);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Airports other = (Airports) obj;
        return Objects.equals(airport, other.airport) && Objects.equals(airportId, other.airportId)
                && Objects.equals(city, other.city) && Objects.equals(code, other.code)
                && Objects.equals(country, other.country);
    }
}
