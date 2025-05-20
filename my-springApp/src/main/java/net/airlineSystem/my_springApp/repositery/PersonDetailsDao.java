package net.airlineSystem.my_springApp.repositery;

import org.springframework.data.jpa.repository.JpaRepository;

import net.airlineSystem.my_springApp.model.PersonDetails;

public interface PersonDetailsDao extends JpaRepository<PersonDetails, Integer>{

}
