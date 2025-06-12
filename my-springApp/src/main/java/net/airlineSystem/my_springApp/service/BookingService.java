package net.airlineSystem.my_springApp.service;

import java.util.List;
import java.util.Optional;

import net.airlineSystem.my_springApp.model.BookingDetails;
import net.airlineSystem.my_springApp.model.PersonDetails;

public interface BookingService {

    public BookingDetails createBooking(PersonDetails passenger, String departWeekday, Long flightId, String paymentInfoJson) throws Exception;

    public List<BookingDetails> getAllBooking(String user) throws Exception;

    public List<BookingDetails> deletAllBooking() throws Exception;

    public List<BookingDetails> viewAllBookings() throws Exception;
    
    
    Optional<BookingDetails> findById(Long id);


public BookingDetails updateBooking(Long bookingId, Long newFlightId) ;


public void deleteBookingById(Long bookingId);
}
