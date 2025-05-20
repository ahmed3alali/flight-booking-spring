import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomeBeta() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!origin || !destination || !date) return alert("Please fill all fields");
    navigate(`/search/${origin}/${destination}/${date}`);

  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Search Flights</h1>
        <form onSubmit={handleSearch} className="space-y-4">
          <input
            type="text"
            placeholder="Origin Airport Code (e.g. DEL)"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Destination Airport Code (e.g. DXB)"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-3 border rounded-lg"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg"
          >
            Search Flights
          </button>
        </form>
      </div>
    </div>
  );
}

