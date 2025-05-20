import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { flight, passenger } = location.state || {};


  const [card, setCard] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (e) => {
    setCard((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Prepare booking data payload matching your backend BookingDetails model
    const bookingPayload = {
      passenger: passenger,
      departWeekday:flight.departWeekday,

      flightId: flight.flightId, // or flight.flightId depending on your model
      paymentInfo: JSON.stringify({
        cardNumber: card.number,
        cardName: card.name,
        expiry: card.expiry,
        cvv: card.cvv,
      }),
    };

    try {
      const response = await axios.post(
        `http://localhost:4000/booking/${encodeURIComponent(passenger.name)}`,
        bookingPayload
      );

      setLoading(false);
      // On success navigate to thank you page with booking response
      navigate("/thankyou", {
        state: { flight, passenger, booking: response.data },
      });
    } catch (err) {
      setLoading(false);
      setError("Failed to save booking. Please try again.");
      console.error(err);
    }
  };

  useEffect(()=>{


console.log(passenger);
console.log(flight);
console.log(flight.departWeekday);



  })


  if (!flight || !passenger) return <p className="p-6 text-red-600">Missing data.</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow space-y-6">
        <h2 className="text-2xl font-bold">Payment Information</h2>

        <div className="bg-blue-50 p-4 rounded">
          <h3 className="font-semibold text-blue-700">Booking Summary</h3>
          <p className="text-sm text-gray-600">
            <strong>{flight.airline}</strong>: {flight.origin} → {flight.destination}
          </p>
          <p className="text-sm text-gray-600">Passenger: {passenger.name}</p>
          <p className="text-sm text-gray-600">Total: ${flight.economyFare}</p>
        </div>

        <form onSubmit={handleConfirm} className="space-y-4">
          <input
            name="number"
            placeholder="Card Number (e.g. 4242 4242 4242 4242)"
            value={card.number}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="name"
            placeholder="Name on Card"
            value={card.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <div className="flex gap-4">
            <input
              name="expiry"
              placeholder="MM/YY"
              value={card.expiry}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
            <input
              name="cvv"
              placeholder="CVV"
              value={card.cvv}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <button className="bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded font-semibold">
            Confirm Payment
          </button>
        </form>
      </div>
    </div>
  );
}
