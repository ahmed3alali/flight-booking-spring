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





