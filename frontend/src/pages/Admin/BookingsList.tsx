import { useEffect, useState } from "react";
import axios from "axios";

export default function BookingsList() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  const fetchBookings = async () => {
    try {
      setError("");
      const res = await axios.get("http://localhost:4000/bookings");
      const bookingsData = Array.isArray(res.data) ? res.data : [];

      if (bookingsData.length === 0) {
        setError("No bookings found.");
        setBookings([]);
        return;
      }

      const bookingsWithFlights = await Promise.all(
        bookingsData.map(async (booking) => {
          const flightId = booking.flightId || booking.flight_id; // ensure compatibility
          try {
            const flightRes = await axios.get(`http://localhost:4000/flights/${flightId}`);
            console.log(`✈️ Flight data for flightId ${flightId}:`, flightRes.data);
            return { ...booking, flight: flightRes.data };
          } catch (error) {
            console.error(`❌ Failed to fetch flight ${flightId}:`, error.message);
            return { ...booking, flight: null };
          }
        })
      );

      console.log("✅ Enriched bookings with flights:", bookingsWithFlights);

      setBookings(bookingsWithFlights);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch bookings");
      setBookings([]);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancelBooking = async (bookingId: string) => {
    const confirmDelete = window.confirm("Are you sure you want to cancel this booking?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:4000/bookings/${bookingId}`);
      setBookings((prev) => prev.filter((b) => b.bookingId !== bookingId));
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to cancel booking");
    }
  };

  return (


    <>
    <header className="bg-white shadow-sm">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-airline-blue">Admin Dashboard</h1>


          <ul>

<a href="/admin">Dashboard Panel </a>

          </ul>
          <div className="flex items-center space-x-4">
            <span className="text-sm">Welcome, Admin</span>
   
          </div>
        </div>
      </header>
    
      <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">🧾 All Bookings</h1>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        {bookings.length === 0 && !error ? (
          <p className="text-gray-600">No bookings yet.</p>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking, index) => (
              <div
                key={booking.bookingId}
                className="bg-white rounded-xl shadow-md p-6 flex justify-between items-start border border-gray-200"
              >
                <div>
                  <h2 className="text-xl font-semibold text-gray-700 mb-2">
                    #{index + 1} — Flight {booking.flightId}{" "}
                    <span className="text-sm text-gray-500">
                      ({booking.flight?.origin ?? "?"} → {booking.flight?.destination ?? "?"})
                    </span>
                  </h2>
                  <p className="text-gray-600 mb-1">
                    👤 Passenger: {booking.passenger?.name ?? "Unknown"} ({booking.passenger?.email ?? "?"})
                  </p>
                  <p className="text-gray-600 mb-1">
                  ✈️ BOOKING PNR : {booking.bookingCode ?? "Unknown"} 
                  </p>
                  <p className="text-gray-600 mb-1">
                    🕒 Flight time: {booking.flight?.departDate  ?? "Uknown"}
                  </p>
                  <p className="text-gray-600">💳 Status: {booking.paymentStatus}</p>
                </div>
                <button
                  onClick={() => handleCancelBooking(booking.bookingId)}
                  className="text-red-600 border border-red-600 px-4 py-2 rounded-md hover:bg-red-100 transition"
                >
                  Cancel ❌
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    
    </>
  
  );
}
