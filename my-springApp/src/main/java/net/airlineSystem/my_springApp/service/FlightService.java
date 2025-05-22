package net.airlineSystem.my_springApp.service;

import java.util.List;

import net.airlineSystem.my_springApp.model.FlightData;

public interface FlightService {

    public List<FlightData> viewAllFlight() throws Exception;

    public FlightData viewOneFlight() throws Exception;

    public List<FlightData> FindByFlightNumber(String flightNumber) throws Exception;

    public List<FlightData> findFlightByOriginToDestination(String origin, String destination) throws Exception;

    FlightData saveFlight(FlightData flight);

    FlightData updateFlightByPnr(String pnr, FlightData flight);

    public void deleteFlightByPnr(String pnr) throws Exception;

}
