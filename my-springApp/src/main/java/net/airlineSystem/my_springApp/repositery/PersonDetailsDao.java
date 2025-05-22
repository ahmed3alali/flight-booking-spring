package net.airlineSystem.my_springApp.repositery;

import org.springframework.data.jpa.repository.JpaRepository;
import net.airlineSystem.my_springApp.model.PersonDetails;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonDetailsDao extends JpaRepository<PersonDetails, Integer> {
    PersonDetails findByEmail(String email); // will use for step 4
}

