import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FlightsAdmin = () => {
  const [flights, setFlights] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:4000/flight")
      .then((res) => setFlights(res.data))
      .catch((err) => console.error("Failed to fetch flights", err));
  }, []);

  const handleDelete = async (pnr: string) => {
    console.log("Trying to delete flight with PNR:", pnr); // ✅ add this
  
    if (!pnr) return alert("Invalid PNR value!");
  
    if (!window.confirm(`Delete flight with PNR: ${pnr}?`)) return;
    try {
      await axios.delete(`http://localhost:4000/flight/${pnr}`);
      setFlights((prev) => prev.filter((f) => f.flightNo !== pnr));
      alert("Flight deleted!");
    } catch (err) {
      alert("Failed to delete flight");
      console.error(err);
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

      <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Flights</h2>
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">PNR</th>
            <th className="p-2 border">From</th>
            <th className="p-2 border">To</th>
            <th className="p-2 border">Depart</th>
            <th className="p-2 border">Airline</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight) => (
            <tr key={flight.flightId}>
              <td className="p-2 border">{flight.flightNo}</td>
              <td className="p-2 border">{flight.origin}</td>
              <td className="p-2 border">{flight.destination}</td>
              <td className="p-2 border">{flight.departTime}</td>
              <td className="p-2 border">{flight.airline}</td>
              <td className="p-2 border space-x-2">
             
              <button
      onClick={() => navigate(`/admin/flights/edit/${flight.flightNo}`)}
      className="bg-blue-500 text-white px-2 py-1 rounded"
    >
      Edit
    </button>

      <button
        onClick={() => handleDelete(flight.flightNo)}
        className="bg-red-500 text-white px-2 py-1 rounded"
      >
        Delete
      </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
 
  );
};

export default FlightsAdmin;
