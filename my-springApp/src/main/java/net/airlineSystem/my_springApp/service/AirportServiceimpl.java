package net.airlineSystem.my_springApp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.airlineSystem.my_springApp.repositery.AirportDao;

@Service
public class AirportServiceimpl implements Airports {

    @Autowired
    private AirportDao airportDao;

    @Override
    public List<net.airlineSystem.my_springApp.model.Airports> findAllAirports(String name) {

        return airportDao.findByAllFields(name);
    }

}
