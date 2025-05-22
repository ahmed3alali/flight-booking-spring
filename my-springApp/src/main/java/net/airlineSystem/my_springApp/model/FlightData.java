package net.airlineSystem.my_springApp.model;

import java.time.LocalTime;
import java.util.Objects;

import jakarta.annotation.Generated;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "flight_data")
public class FlightData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer flightId;

    private String origin;
    private String destination;
    private LocalTime departTime;
    private String departWeekday;
    private String duration;
    private LocalTime arrivalTime;
    private String arrivalWeekday;
    @Column(name = "pnr_code")
    private String flightNo;
    private String airlineCode;
    private String airline;
    private String economyFare;
    private String businessFare;
    private String firstFare;

    public Integer getFlightId() {
        return flightId;
    }

    public void setFlightId(Integer flightId) {
        this.flightId = flightId;
    }

    public String getOrigin() {
        return origin;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public LocalTime getDepartTime() {
        return departTime;
    }

    public void setDepartTime(LocalTime departTime) {
        this.departTime = departTime;
    }

    public String getDepartWeekday() {
        return departWeekday;
    }

    public void setDepartWeekday(String departWeekday) {
        this.departWeekday = departWeekday;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public LocalTime getArrivalTime() {
        return arrivalTime;
    }

    public void setArrivalTime(LocalTime arrivalTime) {
        this.arrivalTime = arrivalTime;
    }

    public String getArrivalWeekday() {
        return arrivalWeekday;
    }

    public void setArrivalWeekday(String arrivalWeekday) {
        this.arrivalWeekday = arrivalWeekday;
    }

    public String getFlightNo() {
        return flightNo;
    }

    public void setFlightNo(String flightNo) {
        this.flightNo = flightNo;
    }

    public String getAirlineCode() {
        return airlineCode;
    }

    public void setAirlineCode(String airlineCode) {
        this.airlineCode = airlineCode;
    }

    public String getAirline() {
        return airline;
    }

    public void setAirline(String airline) {
        this.airline = airline;
    }

    public String getEconomyFare() {
        return economyFare;
    }

    public void setEconomyFare(String economyFare) {
        this.economyFare = economyFare;
    }

    public String getBusinessFare() {
        return businessFare;
    }

    public void setBusinessFare(String businessFare) {
        this.businessFare = businessFare;
    }

    public String getFirstFare() {
        return firstFare;
    }

    public void setFirstFare(String firstFare) {
        this.firstFare = firstFare;
    }

    public FlightData(Integer flightId, String origin, String destination, LocalTime departTime, String departWeekday,
            String duration, LocalTime arrivalTime, String arrivalWeekday, String flightNo, String airlineCode,
            String airline, String economyFare, String businessFare, String firstFare) {
        super();
        this.flightId = flightId;
        this.origin = origin;
        this.destination = destination;
        this.departTime = departTime;
        this.departWeekday = departWeekday;
        this.duration = duration;
        this.arrivalTime = arrivalTime;
        this.arrivalWeekday = arrivalWeekday;
        this.flightNo = flightNo;
        this.airlineCode = airlineCode;
        this.airline = airline;
        this.economyFare = economyFare;
        this.businessFare = businessFare;
        this.firstFare = firstFare;
    }

    public FlightData() {
        super();
        // TODO Auto-generated constructor stub
    }

    @Override
    public int hashCode() {
        return Objects.hash(airline, airlineCode, arrivalTime, arrivalWeekday, businessFare, departTime, departWeekday,
                destination, duration, economyFare, firstFare, flightId, flightNo, origin);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        FlightData other = (FlightData) obj;
        return Objects.equals(airline, other.airline) && Objects.equals(airlineCode, other.airlineCode)
                && Objects.equals(arrivalTime, other.arrivalTime)
                && Objects.equals(arrivalWeekday, other.arrivalWeekday)
                && Objects.equals(businessFare, other.businessFare) && Objects.equals(departTime, other.departTime)
                && Objects.equals(departWeekday, other.departWeekday) && Objects.equals(destination, other.destination)
                && Objects.equals(duration, other.duration) && Objects.equals(economyFare, other.economyFare)
                && Objects.equals(firstFare, other.firstFare) && Objects.equals(flightId, other.flightId)
                && Objects.equals(flightNo, other.flightNo) && Objects.equals(origin, other.origin);
    }

    @Override
    public String toString() {
        return "FlightData [flightId=" + flightId + ", origin=" + origin + ", destination=" + destination
                + ", departTime=" + departTime + ", departWeekday=" + departWeekday + ", duration=" + duration
                + ", arrivalTime=" + arrivalTime + ", arrivalWeekday=" + arrivalWeekday + ", flightNo=" + flightNo
                + ", airlineCode=" + airlineCode + ", airline=" + airline + ", economyFare=" + economyFare
                + ", businessFare=" + businessFare + ", firstFare=" + firstFare + "]";
    }

}
