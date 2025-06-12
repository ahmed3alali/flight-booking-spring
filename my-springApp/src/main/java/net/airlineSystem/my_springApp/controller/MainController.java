package net.airlineSystem.my_springApp.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import net.airlineSystem.my_springApp.model.Airports;

import net.airlineSystem.my_springApp.model.BookingDetails;
import net.airlineSystem.my_springApp.model.FlightData;
import net.airlineSystem.my_springApp.model.PersonDetails;
import net.airlineSystem.my_springApp.model.UserDetails;
import net.airlineSystem.my_springApp.repositery.FlightDetailsDao;
import net.airlineSystem.my_springApp.repositery.PersonDetailsDao;
import net.airlineSystem.my_springApp.service.AirportService;

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
import net.airlineSystem.my_springApp.service.PersonService;
import net.airlineSystem.my_springApp.service.UserService;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@CrossOrigin(origins = "http://localhost:4000")
public class MainController {

    @Autowired
    private FlightService flightService;

    @Autowired
    FlightDetailsDao flightdetaisdao;
    
   @Autowired
private AirportService airportService;

    @Autowired
    private UserService userService;

    @Autowired
    private BookingService bookingservice;

    @Autowired
    private PersonService personService;

    @GetMapping("/hello")
    public ResponseEntity<String> getHello() throws Exception {
        return new ResponseEntity<String>("Hello From Server", HttpStatus.OK);
    }

    @GetMapping("/flight")
    public ResponseEntity<List<FlightData>> allFlight() throws Exception {
        List<FlightData> list = flightService.viewAllFlight();
        return new ResponseEntity<>(list, HttpStatus.OK);
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

    @PostMapping("/flight")
    public ResponseEntity<FlightData> addFlight(@RequestBody FlightData flight) {
        FlightData saved = flightService.saveFlight(flight);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @PutMapping("/flight/{pnr}")
    public ResponseEntity<FlightData> updateFlightByPNR(@PathVariable("pnr") String pnr, @RequestBody FlightData updatedFlight) {
        FlightData updated = flightService.updateFlightByPnr(pnr, updatedFlight);
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    @DeleteMapping("/flight/{pnr}")
    public ResponseEntity<String> deleteFlightByPnr(@PathVariable("pnr") String pnr) {
        try {
            flightService.deleteFlightByPnr(pnr);
            return new ResponseEntity<>("Flight with PNR " + pnr + " deleted.", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error: " + e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    //show persons
    @GetMapping("/persons")
    public ResponseEntity<List<PersonDetails>> getAllPersons() {
        return new ResponseEntity<>(personService.getAllPersons(), HttpStatus.OK);
    }

    @DeleteMapping("/passenger/{id}")
    public ResponseEntity<String> deletePassenger(@PathVariable Integer id) {
        personService.deletePersonById(id);
        return ResponseEntity.ok("Passenger deleted successfully");
    }

    @PutMapping("/passenger/{id}")
    public ResponseEntity<PersonDetails> updatePassenger(@PathVariable Integer id, @RequestBody PersonDetails updatedPerson) {
        PersonDetails person = personService.updatePerson(id, updatedPerson);
        return ResponseEntity.ok(person);
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
    public ResponseEntity<String> deleteAllUser() throws Exception {
        return new ResponseEntity<String>(userService.deleteAllUser(), HttpStatus.OK);
    }

//	Booking Test
    @GetMapping("/booking/{user}")
    public ResponseEntity<List<BookingDetails>> getAllBooking(@PathVariable("user") String user) throws Exception {
        return new ResponseEntity<List<BookingDetails>>(bookingservice.getAllBooking(user), HttpStatus.OK);
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

        BookingDetails savedBooking = bookingservice.createBooking(passenger, departWeekday, flightId, paymentInfoJson);

        return new ResponseEntity<>(savedBooking, HttpStatus.CREATED);
    }

    @DeleteMapping("/booking")
    public ResponseEntity<List<BookingDetails>> deleteBooking() throws Exception {
        List<BookingDetails> deletedBookings = bookingservice.deletAllBooking();
        return new ResponseEntity<>(deletedBookings, HttpStatus.OK);
    }
    
    
    @DeleteMapping("/bookings/{bookingId}")
public ResponseEntity<?> deleteBookingById(@PathVariable int bookingId) {
    try {
        Optional<BookingDetails> booking = bookingservice.findById((long) bookingId);
        if (booking.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Booking not found with ID: " + bookingId);
        }

        bookingservice.deleteBookingById((long) bookingId);
        return ResponseEntity.ok("Booking deleted successfully.");
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting booking: " + e.getMessage());
    }
}

    
    // GET /api/airports - Get all airports
@GetMapping("/airports")
public ResponseEntity<List<Airports>> getAllAirports() {
    List<Airports> airports = airportService.getAllAirports();
    return new ResponseEntity<>(airports, HttpStatus.OK);
}

// GET /api/airports/{name} - Get airport by name
@GetMapping("/airports/{name}")
public ResponseEntity<Airports> getAirportByName(@PathVariable String name) {
    Airports airport = airportService.getAirportByName(name);
    return new ResponseEntity<>(airport, HttpStatus.OK);
}


@GetMapping("/flights/{id}")
public ResponseEntity<FlightData> getFlightById(@PathVariable Integer id) {
    System.out.println("🔍 Looking for flight with ID: " + id);
    FlightData flight = flightService.getFlightById(id);
    if (flight != null) {
        
        return new ResponseEntity<>(flight, HttpStatus.OK);
    } else {
        System.out.println("❌ Flight not found with ID: " + id);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}


@PutMapping("/bookings/{bookingId}")
public ResponseEntity<?> updateBookingFlight(@PathVariable Long bookingId, @RequestBody Map<String, Object> updates) {
    try {
        Long newFlightId = Long.valueOf(updates.get("flightId").toString());
        BookingDetails updatedBooking = bookingservice.updateBooking(bookingId, newFlightId);
        return ResponseEntity.ok(updatedBooking);
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body("Failed to update booking: " + e.getMessage());
    }
}






}
