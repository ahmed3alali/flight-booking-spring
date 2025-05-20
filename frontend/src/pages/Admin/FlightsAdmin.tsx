import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function FlightsAdmin() {
  
  const [flights, setFlights] = useState<any[]>([]);
  const [error, setError] = useState("");
  useEffect(() => {
    
    const fetchFlights = async () => {
      try {
        setError("");
        const res = await axios.get(
          `http://localhost:4000/flight`
        );
        console.log("Route flights API response:", res.data);
        setFlights(Array.isArray(res.data) ? res.data : []);
        if (!Array.isArray(res.data) || res.data.length === 0) {
          setError("No flights found.");







        }
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch flights");
        setFlights([]);
      }
    };

    fetchFlights();
  }, []);

  const deleteFlight = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this flight?");
    if (!confirm) return;
    try {
      await axios.delete(`/flights/${id}`);
      setFlights(flights.filter(f => f._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="min-h-screen p-10 bg-white">
      <h1 className="text-3xl font-bold mb-6">✈️ Flights Management</h1>

      <Link to="/admin/flights/new" className="bg-blue-600 text-white px-4 py-2 rounded-md mb-4 inline-block hover:bg-blue-700">
        ➕ Add New Flight
      </Link>

      <table className="w-full border mt-4">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Airline</th>
            <th>From → To</th>
            <th>Date</th>
            <th>Price</th>
            <th>Seats</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {flights.map(flight => (
            <tr key={flight._id} className="text-center border-t">
              <td className="p-2">{flight.airline}</td>
              <td>{flight.from} → {flight.to}</td>
              <td>{new Date(flight.date).toLocaleString()}</td>
              <td>${flight.price}</td>
              <td>{flight.seats}</td>
              <td className="space-x-2">
                <Link to={`/admin/flights/edit/${flight._id}`} className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600">
                  ✏️ Edit
                </Link>
                <button onClick={() => deleteFlight(flight._id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                  ❌ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
