import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function SearchResults() {
  const { from, to, date  } = useParams(); // read params from URL path
  const origin = from;
  const destination = to;
  const selectedDate = date;
const navigate = useNavigate();
  const [flights, setFlights] = useState<any[]>([]);
  const [error, setError] = useState("");

useEffect(() => {
  if (!origin || !destination || !selectedDate) return;

  const fetchFlightsByRoute = async () => {
    try {
      setError("");
      const res = await axios.get(
        `http://localhost:4000/flight/${origin}/${destination}`
      );
      console.log("Route flights API response:", res.data);

      // Filter by date
      const allFlights = Array.isArray(res.data) ? res.data : [];
      const filteredFlights = allFlights.filter(
        (flight) => flight.departDate === selectedDate
      );

      setFlights(filteredFlights);

      if (filteredFlights.length === 0) {
        setError("No flights found on the selected date.");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch flights");
      setFlights([]);
    }
  };

  fetchFlightsByRoute();
}, [origin, destination, selectedDate]);




  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Search Results</h1>

      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
    

<div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">
          Flights from {origin} to {destination} on {date}
        </h2>

        {error  ? (
          <p className="text-gray-600">Loading flights...</p>
        ) : flights.length === 0 ? (
          <p className="text-red-600">No flights found.</p>
        ) : (
          <div className="space-y-4">
            {flights.map((flight) => (



              <div
                key={flight.id}
                className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-semibold">{flight.airline}</h3>
                  <p className="text-sm text-gray-600">
                    Depart: {flight.origin} | Arrive: {flight.destination}
                  </p>
                  <p className="text-sm text-gray-600">
                    Day: {flight.departWeekday} | Time: {flight.departTime}
                  </p>

                  <p className="text-sm text-gray-600">
                    Day: {flight.departDate} 
                  </p>

                  <p className="text-sm text-gray-600">
                    Economy: {flight.economyFare} 
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-blue-600">${flight.economyFare}</p>
                  <button
  onClick={() => navigate(`/bookingPage/${flight.flightId}`,{ state: { flight } })}
  className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
>
  Book
</button>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>


      )}



    </div>
  );
}
