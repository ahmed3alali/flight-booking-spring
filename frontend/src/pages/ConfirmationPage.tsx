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
    const { name, value } = e.target;

    if (name === "number" && !/^\d*$/.test(value)) return; // Only digits
    if (name === "cvv" && !/^\d*$/.test(value)) return; // Only digits
    if (name === "name" && /[\d]/.test(value)) return; // No digits in name
    if (name === "expiry" && !/^\d{0,2}\/?\d{0,2}$/.test(value)) return; // MM/YY format as you type

    setCard((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    setError("");

    // Final validation before submission
    const expiryPattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryPattern.test(card.expiry)) {
      setError("Expiry date must be in MM/YY format.");
      return;
    }

    if (card.cvv.length !== 3) {
      setError("CVV must be 3 digits.");
      return;
    }

    setLoading(true);

    const bookingPayload = {
      passenger,
      departWeekday: flight.departWeekday,
      flightId: flight.flightId,
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
      navigate("/thankyou", {
        state: { flight, passenger, booking: response.data  },
      });
    } catch (err) {
      setLoading(false);
      setError("Failed to save booking. Please try again.");
      console.error(err);
    }
  };



  if (!flight || !passenger)
    return <p className="p-6 text-red-600">Missing data.</p>;

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
          <p className="text-sm text-gray-600">Date : {flight.departDate}</p>
        </div>

        <form onSubmit={handleConfirm} className="space-y-4">
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <input
            name="number"
            placeholder="Card Number (e.g. 4242424242424242)"
            value={card.number}
            onChange={handleChange}
            required
            maxLength={16}
            inputMode="numeric"
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
              maxLength={5}
              className="w-full p-2 border rounded"
            />
            <input
              name="cvv"
              placeholder="CVV"
              value={card.cvv}
              onChange={handleChange}
              required
              maxLength={3}
              inputMode="numeric"
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded font-semibold"
          >
            {loading ? "Processing..." : "Confirm Payment"}
          </button>
        </form>
      </div>
    </div>
  );
}
