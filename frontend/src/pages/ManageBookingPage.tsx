// ManageBookingPage.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import Navigation from "@/components/Navigation";







// FlightEditForm component (defined inside this file for simplicity)
function FlightEditForm({ onSearch }: { onSearch: (origin: string, destination: string, date: string) => void }) {
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [date, setDate] = useState("");
    const [airports, setAirports] = useState<string[]>([]);
  
    useEffect(() => {
      axios.get("http://localhost:4000/airports")
        .then((res) => setAirports(res.data.map((a: any) => a.name)))
        .catch(() => alert("Failed to fetch airports"));
    }, []);
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!origin || !destination || !date) {
        alert("Please fill all fields.");
        return;
      }
      onSearch(origin, destination, date);
    };
  
    return (
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow-md mt-6">
        <h2 className="text-lg font-bold">🔁 Choose New Flight</h2>
  
        <select value={origin} onChange={(e) => setOrigin(e.target.value)} className="w-full p-2 border rounded">
          <option value="">Select Origin</option>
          {airports.map((a, i) => <option key={i} value={a}>{a}</option>)}
        </select>
  
        <select value={destination} onChange={(e) => setDestination(e.target.value)} className="w-full p-2 border rounded">
          <option value="">Select Destination</option>
          {airports.map((a, i) => <option key={i} value={a}>{a}</option>)}
        </select>
  
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border rounded"
        />
  
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">🔍 Find Flights</button>
      </form>
    );
  }
  



export default function ManageBookingPage() {
  const [pnr, setPnr] = useState("");
  const [email, setEmail] = useState("");
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState("");
  const [flights, setFlights] = useState([]);
  const [editing, setEditing] = useState(false);
  const [showFlightSearch, setShowFlightSearch] = useState(false)
  const handleSearch = async () => {
    if (!pnr || !email) {
      setError("Please enter both PNR and Email.");
      return;
    }
  
    try {
      setError("");
      const res = await axios.get(`http://localhost:4000/booking/${encodeURIComponent(email)}`);
      const bookings = res.data; // should be an array
  
      const found = bookings.find(
        (b: any) =>
          b.bookingCode?.toLowerCase() === pnr.toLowerCase() &&
          b.passenger?.email?.toLowerCase() === email.toLowerCase()
      );
  
      if (!found) {
        setError("No booking found with that PNR and Email.");
        setBooking(null);
        return;
      }
  
      setBooking(found);
    } catch (err) {
      console.error("Error fetching bookings", err);
      setError("Failed to fetch bookings.");
      setBooking(null);
    }
  };
  


  const handleSearchNewFlights = async (origin: string, destination: string, date: string) => {
    try {
      const res = await axios.get(`http://localhost:4000/flight/${origin}/${destination}`);
      setFlights(res.data);
      setEditing(true);
    } catch {
      alert("Failed to load matching flights.");
    }
  };


  const handleCancel = async () => {
    const confirm = window.confirm("Are you sure you want to cancel this booking?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:4000/bookings/${booking.bookingId}`);
      alert("Booking canceled successfully.");
      setBooking(null);
    } catch (err) {
      alert("Failed to cancel booking.");
    }
  };

  const confirmEdit = async (newFlightId: number) => {
    try {
      await axios.put(`http://localhost:4000/bookings/${booking.bookingId}`, {
        flightId: newFlightId,
      });
      alert("Flight updated successfully.");
      setBooking({ ...booking, flightId: newFlightId });
      setEditing(false);
      setShowFlightSearch(false);
    } catch {
      alert("Failed to change flight.");
    }
  };




   return (

    <>
        <Navigation />
        <div className="p-6 max-w-xl mx-auto">
         
      <h1 className="text-3xl font-bold mb-6 text-center">✈️ Manage My Booking</h1>

      {!booking && (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter PNR Code"
            value={pnr}
            onChange={(e) => setPnr(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Enter Passenger Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <button
            onClick={handleSearch}
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            Search Booking
          </button>
          {error && <p className="text-red-600">{error}</p>}
        </div>
      )}

      {booking && !editing && (
        <div className="mt-6 bg-white p-4 rounded shadow space-y-4">
          <p><strong>PNR:</strong> {booking.bookingCode}</p>
          <p><strong>Passenger:</strong> {booking.passenger?.name}</p>
          <p><strong>Email:</strong> {booking.passenger?.email}</p>
          <p><strong>Flight ID:</strong> {booking.flightId}</p>
          <p><strong>Status:</strong> {booking.paymentStatus}</p>

          <div className="flex gap-4 mt-4">
            <button
              onClick={handleCancel}
              className="flex-1 bg-red-600 text-white py-2 rounded"
            >
              ❌ Cancel Booking
            </button>
            <button
              onClick={() => setShowFlightSearch(true)}
              className="flex-1 bg-yellow-500 text-white py-2 rounded"
            >
              ✏️ Change Flight
            </button>
          </div>
        </div>
      )}

      {showFlightSearch && !editing && (
        <FlightEditForm onSearch={handleSearchNewFlights} />
      )}

      {editing && (
        <div className="mt-6 bg-white p-4 rounded shadow space-y-2">
          <h2 className="text-lg font-semibold">✈️ Select a New Flight</h2>
          {flights.length === 0 ? (
            <p>No available flights found.</p>
          ) : (
            flights.map((flight) => (
              <button
                key={flight.flightId}
                onClick={() => confirmEdit(flight.flightId)}
                className="block w-full text-left p-2 border rounded hover:bg-blue-100"
              >
                {flight.origin} → {flight.destination} — {flight.departDate} ({flight.departTime})
              </button>
            ))
          )}
          <button
            onClick={() => {
              setEditing(false);
              setShowFlightSearch(false);
            }}
            className="w-full mt-2 bg-gray-300 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
    </>
    
  );
}