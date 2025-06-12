// AirportService.java
package net.airlineSystem.my_springApp.service;

import java.util.List;
import net.airlineSystem.my_springApp.model.Airports;

public interface AirportService {
    List<Airports> getAllAirports();
    Airports getAirportByName(String name);
}
