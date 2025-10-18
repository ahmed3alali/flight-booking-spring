<h1 align="center">✈️ Flight Management System (Java Spring Boot)</h1>

<p align="center">
  <b>A complete airline management system for flights, bookings, airports, and passengers — tested and verified with JUnit.</b><br>
  Built using <b>Spring Boot</b>, <b>Mockito</b>, and <b>JUnit 5</b> for robust performance and test-driven development.
</p>

---

## 📘 Overview

This project is a **Flight Management System** that handles all essential operations such as **managing flights, bookings, airports, and passengers**.  
It supports full CRUD functionality and integrates a suite of **unit and integration tests** to ensure system reliability.

The project follows a **layered architecture** — separating service, data access, and testing layers — to enhance maintainability and scalability.

---

## ⚙️ Core Modules

### ✈️ Flight Management
- View all flights  
- Add and update flights by **PNR / flight number**  
- Delete flights (individually or in bulk)  
- Validate airport creation when saving new flights  

### 🧾 Booking Management
- Create, view, update, and delete bookings  
- Filter bookings by email  
- Handle invalid booking cases gracefully  
- Automatic passenger linking and flight updates  

### 🏙️ Airport Management
- Retrieve all airports  
- Search airport by name (valid/invalid scenarios)  
- Exception handling for missing records  

### 👤 Person Management
- Retrieve, update, and delete passenger details  
- Maintain relationships with flight bookings  

---

## 🧩 Project Structure

📦 flight-management-system
┣ 📜 AirportServiceImplTest.java
┣ 📜 BookingServiceImplTest.java
┣ 📜 FlightServiceImplTest.java
┣ 📜 PersonServiceImplTest.java
┣ 📜 ControlFlowDiagrams/
┣ 📜 DataFlowDiagrams/
┣ 📜 Documentation.pdf
┗ 📜 README.md


---

## 🧠 Test-Driven Development

All core functionalities are verified using **JUnit 5 and Mockito**.  
Mocking isolates the service logic from data persistence layers for precise unit testing.

### ✅ Test Coverage Highlights

| Module | Tested Features | Exception Handling | Mocked Repos |
|---------|-----------------|--------------------|---------------|
| **AirportServiceImpl** | Fetch, search airports | Airport not found | `AirportDao` |
| **BookingServiceImpl** | CRUD operations, filters | Invalid booking ID/email | `BookingDetailsDao`, `PersonDetailsDao` |
| **FlightServiceImpl** | Flight CRUD, PNR updates | Missing flight or airport | `FlightDetailsDao`, `AirportDao` |
| **PersonServiceImpl** | CRUD operations | Invalid ID handling | `PersonDetailsDao` |

---

## 🧪 Example Test Snippets

<details>
<summary><b>AirportServiceImplTest.java</b></summary>

```java
@BeforeEach
public void setUp() {
    airportRepo = mock(AirportDao.class);
    airportService = new AirportServiceImp();
    airportService.setAirportRepository(airportRepo);
}

@Test
public void testGetAirportByName_ReturnsAirport() {
    when(airportRepo.findByName("Dubai"))
        .thenReturn(Optional.of(new Airport("Dubai")));

    Airport result = airportService.getAirportByName("Dubai");

    assertEquals("Dubai", result.getName());
    verify(airportRepo, times(1)).findByName("Dubai");
}

```

</details> <details> <summary><b>BookingServiceImplTest.java</b></summary>
@Test
public void testCreateBooking_SuccessfulCreation() {
    when(personRepo.save(any())).thenReturn(passenger);
    when(bookingRepo.save(any())).thenReturn(booking);

    BookingDetails result = bookingService.createBooking(booking);

    assertNotNull(result);
    verify(bookingRepo, times(1)).save(any());
}


📊 System Flow Diagrams
🧭 Control Flow
Login
Create a Flight
Get All Bookings
Delete Bookings
🔄 Data Flow
Add / Update / Delete Flights
Fetch Bookings
Manage Airports and Passengers
🧩 All diagrams are included in the Documentation.pdf file.

| Area         | Key Tests                      |
| ------------ | ------------------------------ |
| **Airports** | Retrieve, search valid/invalid |
| **Bookings** | Create, update, delete, search |
| **Flights**  | Add, update by PNR, delete     |
| **Persons**  | Retrieve, update, delete       |


| Category          | Stack                              |
| ----------------- | ---------------------------------- |
| **Backend**       | Java 17, Spring Boot               |
| **Database**      | MYSQL |
| **Testing**       | JUnit 5                            |
| **Build Tool**    | Maven                              |
| **Documentation** | Markdown, PDF diagrams             |


🧰 How to Run
▶️ Run Application

```
# Build and run
mvn spring-boot:run
```

🧪 Run Tests
```
mvn test
```



