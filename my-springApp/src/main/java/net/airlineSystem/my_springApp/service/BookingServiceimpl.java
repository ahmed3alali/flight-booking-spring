package net.airlineSystem.my_springApp.service;

import java.util.List;
import java.util.Optional;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.razorpay.Order;
import com.razorpay.RazorpayException;
import jakarta.transaction.Transactional;
import net.airlineSystem.my_springApp.model.BookingDetails;
import net.airlineSystem.my_springApp.model.CustomerAddress;
import net.airlineSystem.my_springApp.model.PersonDetails;
import net.airlineSystem.my_springApp.model.UserDetails;
import net.airlineSystem.my_springApp.repositery.BookingDetailsDao;
import net.airlineSystem.my_springApp.repositery.CustomerAddressDao;
import net.airlineSystem.my_springApp.repositery.PersonDetailsDao;
import net.airlineSystem.my_springApp.repositery.UserDetailsDao;

@Service
public class BookingServiceimpl implements BookingService {

    @Autowired
    private BookingDetailsDao bookingDetails;

    @Autowired
    private CustomerAddressDao customerAddressDao;

    @Autowired
    private PersonDetailsDao personDetailsDao;

    @Autowired
    private UserDetailsDao userDao;

    @Autowired
    private RozerPay rozerPay;

    @Transactional
    public BookingDetails createBooking(PersonDetails passenger, String departWeekday, Long flightId, String paymentInfoJson) {
        PersonDetails savedPassenger = personDetailsDao.save(passenger);

        BookingDetails booking = new BookingDetails();
        booking.setPassenger(savedPassenger);
        booking.setFlightId(flightId);
        booking.setPaymentStatus("paid");
        booking.setPaymentInfo(paymentInfoJson);
        booking.setDepartWeekday(departWeekday);

        return bookingDetails.save(booking);
    }

@Override
public List<BookingDetails> getAllBooking(String email) throws Exception {
    List<BookingDetails> allBookings = bookingDetails.findAll();

    List<BookingDetails> filtered = allBookings.stream()
        .filter(b -> b.getPassenger() != null && email.equalsIgnoreCase(b.getPassenger().getEmail()))
        .toList();

    if (filtered.isEmpty()) {
        throw new Exception("No bookings found for this email");
    }

    return filtered;
}


    @Override
    public List<BookingDetails> viewAllBookings() {

        List<BookingDetails> data = bookingDetails.findAll();

        return data;
    }

    @Override
    public List<BookingDetails> deletAllBooking() throws Exception {
        List<BookingDetails> allBooking = bookingDetails.findAll();
        bookingDetails.deleteAll();
        return allBooking;
    }

    @Override
    public Optional<BookingDetails> findById(Long id) {
         return bookingDetails.findById(id);
    }

   @Override
@Transactional
public BookingDetails updateBooking(Long bookingId, Long newFlightId) {
    BookingDetails booking = bookingDetails.findById(bookingId)
        .orElseThrow(() -> new RuntimeException("Booking not found with ID: " + bookingId));

    // Update the flightId
    booking.setFlightId(newFlightId);

    // Save and return updated booking
    return bookingDetails.save(booking);
}



@Override
public void deleteBookingById(Long bookingId) {
    bookingDetails.deleteById(bookingId);
}

    


    
  
    
    

}
