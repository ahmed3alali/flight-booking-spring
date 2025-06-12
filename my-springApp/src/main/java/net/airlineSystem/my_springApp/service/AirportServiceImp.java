// AirportServiceImpl.java
package net.airlineSystem.my_springApp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.airlineSystem.my_springApp.model.Airports;
import net.airlineSystem.my_springApp.model.Airports;
import net.airlineSystem.my_springApp.repositery.AirportDao;
import net.airlineSystem.my_springApp.repositery.AirportDao;

@Service
public class AirportServiceImp implements AirportService {

    @Autowired
    private AirportDao airportRepository;

    @Override
    public List<Airports> getAllAirports() {
        return airportRepository.findAll();
    }

    @Override
    public Airports getAirportByName(String name) {
        return airportRepository.findByName(name)
                .orElseThrow(() -> new RuntimeException("Airport not found with name: " + name));
    }
}
