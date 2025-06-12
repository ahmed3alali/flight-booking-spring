import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function BookingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const flight = location.state?.flight;

  const [form, setForm] = useState({
    name: "",
    email: "",
    passportNo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      // Allow letters, spaces, hyphen, apostrophe
      if (!/^[a-zA-Z\s'-]*$/.test(value)) return;
    }

    if (name === "passportNo") {
      // Allow digits only
      if (!/^\d*$/.test(value)) return;
    }



    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBooking = (e) => {
    e.preventDefault();

    // Additional final validation example (optional)
    if (form.name.trim().length < 2) {
      alert("Name must be at least 2 characters.");
      return;
    }


    console.log("Booking confirmed:", form, flight);

    navigate("/confirmation", {
      state: {
        flight,
        passenger: { ...form, flightId: flight.flightId },
      },
    });
  };

  if (!flight) return <p className="p-6 text-red-600">No flight selected.</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4">Passenger Information</h2>

        <div className="mb-4 p-4 bg-blue-50 rounded">
          <p className="font-semibold text-blue-700">{flight.airline}</p>
          <p className="text-sm text-gray-600">
            {flight.origin} → {flight.destination} | ${flight.economyFare}
          </p>
          <p className="text-sm text-gray-600">
           Departure  {flight.departTime} → Arrival : {flight.arrivalTime}
          </p>
          <p className="text-sm text-gray-600">
            Date : {flight.departDate}
          </p>
        </div>

        <form onSubmit={handleBooking} className="space-y-4">
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="email"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="passportNo"
            placeholder="Passport Number (e.g. A1234567)"
            value={form.passportNo}
            onChange={handleChange}
            maxLength={9}  // typical passport length
            required
            className="w-full p-2 border rounded uppercase"
            style={{ textTransform: "uppercase" }}
          />
          <button className="bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded font-semibold">
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
}
