package net.airlineSystem.my_springApp.repositery;

import org.springframework.data.jpa.repository.JpaRepository;

import net.airlineSystem.my_springApp.model.BookingDetails;

public interface BookingDetailsDao extends JpaRepository<BookingDetails, Integer> {
 
}
