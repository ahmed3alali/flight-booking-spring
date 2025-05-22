package net.airlineSystem.my_springApp.service;

import java.util.List;
import net.airlineSystem.my_springApp.model.PersonDetails;

public interface PersonService {

    List<PersonDetails> getAllPersons();
    
    PersonDetails updatePerson(Integer id, PersonDetails updatedPerson);
    void deletePersonById(Integer id);

    PersonDetails findByEmail(String email);
}
