package net.airlineSystem.my_springApp.service;

import java.util.List;
import net.airlineSystem.my_springApp.model.Airports;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.airlineSystem.my_springApp.model.FlightData;
import net.airlineSystem.my_springApp.repositery.AirportDao;
import net.airlineSystem.my_springApp.repositery.FlightDetailsDao;





@Service
public class FlightServiceImpl implements FlightService {

    @Autowired
    private FlightDetailsDao flighdetaildao;
    
    
    @Autowired
private AirportDao airportRepository;


    @Override
    public List<FlightData> viewAllFlight() {

        List<FlightData> data = flighdetaildao.findAll();

        return data;
    }

    @Override
    public FlightData viewOneFlight() {

        return null;
    }

    @Override
    public List<FlightData> FindByFlightNumber(String flightNumber) throws Exception {

        return (List<FlightData>) flighdetaildao.findByFlightNo(flightNumber);
    }

    @Override
    public List<FlightData> findFlightByOriginToDestination(String origin, String destination) throws Exception {

        return flighdetaildao.findByOriginToDestination(origin, destination);
    }

    @Override
    public FlightData saveFlight(FlightData flight) {
         ensureAirportExists(flight.getOrigin());
    ensureAirportExists(flight.getDestination());
        return flighdetaildao.save(flight);
    }

    @Override
    public FlightData updateFlightByPnr(String pnr, FlightData flight) {
        FlightData existing = flighdetaildao.findFirstByFlightNo(pnr);
        if (existing == null) {
            throw new RuntimeException("Flight not found");
        }
        
            // Sync airport names
    ensureAirportExists(flight.getOrigin());
    ensureAirportExists(flight.getDestination());

        existing.setOrigin(flight.getOrigin());
        existing.setDestination(flight.getDestination());
        existing.setDepartTime(flight.getDepartTime());
        existing.setDepartWeekday(flight.getDepartWeekday());
        existing.setDuration(flight.getDuration());
        existing.setArrivalTime(flight.getArrivalTime());
        existing.setArrivalWeekday(flight.getArrivalWeekday());
        existing.setAirlineCode(flight.getAirlineCode());
        existing.setAirline(flight.getAirline());
        existing.setEconomyFare(flight.getEconomyFare());
        existing.setBusinessFare(flight.getBusinessFare());
        existing.setFirstFare(flight.getFirstFare());
        existing.setDepartDate(flight.getDepartDate());

        return flighdetaildao.save(existing);
    }

    @Override
    public void deleteFlightByPnr(String pnr) throws Exception {
        
        List<FlightData> flights = flighdetaildao.findByFlightNo(pnr);
        if (flights.isEmpty()) {
            throw new Exception("Flight not found for PNR: " + pnr);
        }

        for (FlightData flight : flights) {
            flighdetaildao.delete(flight);
        }
    }
    
    private void ensureAirportExists(String airportName) {
    if (airportName == null || airportName.trim().isEmpty()) return;

    airportRepository.findByName(airportName)
        .orElseGet(() -> {
            Airports airport = new Airports();
            airport.setName(airportName);
            return airportRepository.save(airport);
        });
}
    
    
    public FlightData getFlightById(Integer id) {
    return flighdetaildao.findById(id).orElse(null);
}



}
