DATABASES : 


CREATE TABLE [dbo].[flight_data] (
    [flight_id]       INT           NOT NULL,
    [airline]         VARCHAR (255) NULL,
    [airline_code]    VARCHAR (255) NULL,
    [arrival_time]    TIME (7)      NULL,
    [arrival_weekday] VARCHAR (255) NULL,
    [business_fare]   VARCHAR (255) NULL,
    [depart_date]     VARCHAR (255) NULL,
    [depart_time]     TIME (7)      NULL,
    [depart_weekday]  VARCHAR (255) NULL,
    [destination]     VARCHAR (255) NULL,
    [duration]        VARCHAR (255) NULL,
    [economy_fare]    VARCHAR (255) NULL,
    [first_fare]      VARCHAR (255) NULL,
    [flight_no]       VARCHAR (255) NULL,
    [origin]          VARCHAR (255) NULL,
    PRIMARY KEY CLUSTERED ([flight_id] ASC)
);







CREATE TABLE [dbo].[bookings] (
    [booking_id]     BIGINT        IDENTITY (1, 1) NOT NULL,
    [depart_weekday] VARCHAR (255) NULL,
    [flight_id]      BIGINT        NULL,
    [payment_info]   VARCHAR (MAX) NULL,
    [payment_status] VARCHAR (255) NULL,
    [passenger_id]   INT           NOT NULL,
    [TravelDate]     DATE          NULL,
    PRIMARY KEY CLUSTERED ([booking_id] ASC),
    CONSTRAINT [FKdrfy7gcwhtaubn8vgbc4jv989] FOREIGN KEY ([passenger_id]) REFERENCES [dbo].[passengers] ([person_details_id])
);






CREATE TABLE [dbo].[person_details] (
    [person_details_id] INT           NOT NULL,
    [age]               VARCHAR (255) NULL,
    [gender]            VARCHAR (255) NULL,
    [name]              VARCHAR (255) NULL,
    PRIMARY KEY CLUSTERED ([person_details_id] ASC)
);






HOW IS THE PROGRAM WORKING ? TAKE THIS EXAMPLE 


package net.airlineSystem.my_springApp.service;

import java.util.List;

import net.airlineSystem.my_springApp.model.BookingDetails;
import net.airlineSystem.my_springApp.model.PersonDetails;

public interface BookingService {
	
	public BookingDetails createBooking(PersonDetails passenger,String departWeekday, Long flightId, String paymentInfoJson)throws Exception;
	public List<BookingDetails> getAllBooking(String user)throws Exception;
	public List<BookingDetails> deletAllBooking()throws Exception;
        public List<BookingDetails> viewAllBookings() throws Exception;

	
}



CALL THE FUNCTION AND OVERRIDE IT : 

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
    public BookingDetails createBooking(PersonDetails passenger,String departWeekday, Long flightId, String paymentInfoJson) {
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
		
		List<BookingDetails> data=bookingDetails.findAll();
		
		return data;
	}


	@Override
	public List<BookingDetails> deletAllBooking() throws Exception {
		List<BookingDetails> allBooking = bookingDetails.findAll();
		bookingDetails.deleteAll();
		return allBooking;
	}



}


USE IT IN CONTROLLER : MAINCONTROLLER.JAVA
package net.airlineSystem.my_springApp.controller;

import java.util.List;
import net.airlineSystem.my_springApp.service.Airports;
import net.airlineSystem.my_springApp.model.BookingDetails;
import net.airlineSystem.my_springApp.model.FlightData;
import net.airlineSystem.my_springApp.model.PersonDetails;
import net.airlineSystem.my_springApp.model.UserDetails;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import net.airlineSystem.my_springApp.service.BookingService;
import net.airlineSystem.my_springApp.service.FlightService;
import net.airlineSystem.my_springApp.service.UserService;



@RestController
@CrossOrigin(origins = "http://localhost:8080")
public class MainController {

	@Autowired
	private FlightService flightService;

	@Autowired
	private Airports airports;

	@Autowired
	private UserService userService;
	
	@Autowired
	private BookingService bookingservice;
	
	@GetMapping("/hello")
	public ResponseEntity<String> getHello() throws Exception{
		return new ResponseEntity<String>("Hello From Server",HttpStatus.OK);
	}

	@GetMapping("/flight")
	public ResponseEntity<List<FlightData>> allFlight() throws Exception {
		List<FlightData> list = flightService.viewAllFlight();
		return new ResponseEntity<>(list, HttpStatus.OK);
	}

	@GetMapping("/airports/{name}")
	public ResponseEntity<List<net.airlineSystem.my_springApp.model.Airports>> getAllAirporat(
			@PathVariable("name") String airportName) throws Exception {
		return new ResponseEntity<>(airports.findAllAirports(airportName), HttpStatus.OK);
	}

	@GetMapping("/flight/{number}")
	public ResponseEntity<List<FlightData>> findFligtByNumber(@PathVariable("number") String number) throws Exception {
		return new ResponseEntity<>(flightService.FindByFlightNumber(number), HttpStatus.OK);
	}

	@GetMapping("/flight/{origin}/{destination}")
	public ResponseEntity<List<FlightData>> findFlightByOriginDestination(@PathVariable("origin") String origin,
        @PathVariable("destination") String destination) throws Exception {
    System.out.println("Searching flights from " + origin + " to " + destination);
    List<FlightData> flights = flightService.findFlightByOriginToDestination(origin, destination);
    System.out.println("Found " + flights.size() + " flights");
    return new ResponseEntity<>(flights, HttpStatus.OK);
}
	
//	??User Things
// we are using the following routers : /booking (all) ( users is not used right now)
        
	@PostMapping("/user")
	public ResponseEntity<UserDetails> saveOrVeryfyUser(@RequestBody UserDetails userdetails) throws Exception {

		return new ResponseEntity<UserDetails>(userService.saveuser(userdetails), HttpStatus.OK);
	}

	@GetMapping("/user")
	public ResponseEntity<List<UserDetails>> getAllUser() throws Exception {

		return new ResponseEntity<List<UserDetails>>(userService.getAllUser(), HttpStatus.OK);
	}
	@DeleteMapping("/user")
	public ResponseEntity<String> deleteAllUser() throws Exception{
		return new ResponseEntity<String>(userService.deleteAllUser(),HttpStatus.OK);
	}
	
	
//	Booking Test
	
	@GetMapping("/booking/{user}")
	public ResponseEntity<List<BookingDetails>> getAllBooking(@PathVariable("user") String user) throws Exception{
		return new ResponseEntity<List<BookingDetails>>(bookingservice.getAllBooking(user),HttpStatus.OK);
	}
        
        
        
        @GetMapping("/bookings")
	public ResponseEntity<List<BookingDetails>> allBookings() throws Exception {
		List<BookingDetails> list = bookingservice.viewAllBookings();
		return new ResponseEntity<>(list, HttpStatus.OK);
	}
        
        
	@PostMapping("/booking/{user}")
public ResponseEntity<BookingDetails> saveBooking(@RequestBody BookingDetails bookingDetails, @PathVariable("user") String user) throws Exception {



    // Extract passenger, flightId, paymentInfo from bookingDetails object
            PersonDetails passenger = bookingDetails.getPassenger();
            
    Long flightId = bookingDetails.getFlightId();
    String paymentInfoJson = bookingDetails.getPaymentInfo();
    String departWeekday = bookingDetails.getDepartWeekday();
    

    BookingDetails savedBooking = bookingservice.createBooking(passenger,departWeekday,  flightId, paymentInfoJson);


    return new ResponseEntity<>(savedBooking, HttpStatus.CREATED);
}

	@DeleteMapping("/booking")
public ResponseEntity<List<BookingDetails>> deleteBooking() throws Exception {
    List<BookingDetails> deletedBookings = bookingservice.deletAllBooking();
    return new ResponseEntity<>(deletedBookings, HttpStatus.OK);
}

	
}














