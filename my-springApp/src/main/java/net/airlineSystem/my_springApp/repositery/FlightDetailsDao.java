package net.airlineSystem.my_springApp.repositery;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import net.airlineSystem.my_springApp.model.FlightData;

@Repository
public interface FlightDetailsDao extends JpaRepository<FlightData, Integer> {

//    List<FlightData> findByFlightNo(String flightNo);
    List<FlightData> findByFlightNo(String pnr);
FlightData findFirstByFlightNo(String flightNo);
    Optional<FlightData> findById(Integer flightId);

    @Query("SELECT f FROM FlightData f WHERE f.origin = :origin AND f.destination = :destination")
    List<FlightData> findByOriginToDestination(String origin, String destination);


    void deleteByFlightNo(String pnr);

}
