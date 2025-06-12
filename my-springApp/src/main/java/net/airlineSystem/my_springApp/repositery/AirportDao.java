// AirportRepository.java
package net.airlineSystem.my_springApp.repositery;

import org.springframework.data.jpa.repository.JpaRepository;
import net.airlineSystem.my_springApp.model.Airports;

import java.util.Optional;

public interface AirportDao extends JpaRepository<Airports, Long> {
    Optional<Airports> findByName(String name);
}
