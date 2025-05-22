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
    public List<BookingDetails> getAllBooking(String user) throws Exception {

        UserDetails findedUser = userDao.findByemail(user);
        if (findedUser != null) {
            return findedUser.getAllBookigs();
        } else {
            throw new Exception("User Not Found");
        }

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

}
