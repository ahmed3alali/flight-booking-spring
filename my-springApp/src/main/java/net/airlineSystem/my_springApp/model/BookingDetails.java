package net.airlineSystem.my_springApp.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name = "bookings")

// Lombok @Data generates getters, setters, toString, equals, and hashCode automatically
public class BookingDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingId;

@ManyToOne
@JoinColumn(name = "passenger_id", referencedColumnName = "person_details_id", nullable = false)
private PersonDetails passenger;

    private Long flightId;

    private String departWeekday;

    private String paymentStatus;

    @Lob
    private String paymentInfo;

    // No-arg constructor (required by JPA)
    public BookingDetails() {
    }

    // All-args constructor
    public BookingDetails(Long bookingId, PersonDetails passenger, Long flightId, String departWeekday, String paymentStatus, String paymentInfo) {
        this.bookingId = bookingId;
        this.passenger = passenger;
        this.flightId = flightId;
        this.departWeekday = departWeekday;
        this.paymentStatus = paymentStatus;
        this.paymentInfo = paymentInfo;
    }

    // Constructor without bookingId (for creating new bookings before persisting)
    public BookingDetails(PersonDetails passenger, Long flightId, String departWeekday, String paymentStatus, String paymentInfo) {
        this.passenger = passenger;
        this.flightId = flightId;
        this.departWeekday = departWeekday;
        this.paymentStatus = paymentStatus;
        this.paymentInfo = paymentInfo;
    }

    // Getters and setters
    public Long getBookingId() {
        return bookingId;
    }

    public void setBookingId(Long bookingId) {
        this.bookingId = bookingId;
    }

    public PersonDetails getPassenger() {
        return passenger;
    }

    public void setPassenger(PersonDetails passenger) {
        this.passenger = passenger;
    }

    public Long getFlightId() {
        return flightId;
    }

    public void setFlightId(Long flightId) {
        this.flightId = flightId;
    }

    public String getDepartWeekday() {
        return departWeekday;
    }

    public void setDepartWeekday(String departWeekday) {
        this.departWeekday = departWeekday;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public String getPaymentInfo() {
        return paymentInfo;
    }

    public void setPaymentInfo(String paymentInfo) {
        this.paymentInfo = paymentInfo;
    }
}
// No-arg constructor is created by default or via Lombok @Data

// If you want a constructor with all fields, you can use @AllArgsConstructor from Lombok or define it manually:
// If you don’t want to use Lombok or want explicit toString, equals, hashCode, add them manually here.

