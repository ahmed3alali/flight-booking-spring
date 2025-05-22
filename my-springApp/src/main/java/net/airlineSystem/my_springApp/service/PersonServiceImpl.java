package net.airlineSystem.my_springApp.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import net.airlineSystem.my_springApp.model.PersonDetails;
import net.airlineSystem.my_springApp.repositery.PersonDetailsDao;

@Service
public class PersonServiceImpl implements PersonService {

    @Autowired
    private PersonDetailsDao dao;

    @Override
    public List<PersonDetails> getAllPersons() {
        return dao.findAll();
    }

    @Override
    public PersonDetails updatePerson(Integer id, PersonDetails updatedPerson) {
        PersonDetails existing = dao.findById(id).orElseThrow(() -> new RuntimeException("Person not found"));
        existing.setName(updatedPerson.getName());
        existing.setEmail(updatedPerson.getEmail());
        existing.setPassportNo(updatedPerson.getPassportNo());
        existing.setFlightId(updatedPerson.getFlightId());
        return dao.save(existing);
    }

    @Override
    public void deletePersonById(Integer id) {
        dao.deleteById(id);
    }

    @Override
    public PersonDetails findByEmail(String email) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }
}
