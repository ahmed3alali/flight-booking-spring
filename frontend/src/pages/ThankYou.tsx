import { useLocation, useNavigate } from "react-router-dom";

export default function ThankYouPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { flight, passenger } = location.state || {};

  if (!flight || !passenger) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-600">No booking found.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-md max-w-lg w-full p-6 space-y-6">
        <h2 className="text-2xl font-bold text-green-600">🎉 Booking Confirmed!</h2>
        <p className="text-gray-700">Thank you, {passenger.name}. Your flight is booked.</p>

        <div className="border-t pt-4 space-y-2 text-sm text-gray-700">
          <p><strong>Airline:</strong> {flight.airline}</p>
          <p><strong>Route:</strong> {flight.origin} → {flight.destination}          </p>
          <p><strong>Passenger:</strong> {passenger.name}</p>
          <p><strong>Passport:</strong> {passenger.passport}</p>
          <p><strong>Contact:</strong> {passenger.email} / {passenger.phone}</p>
          <p><strong>Price:</strong> ${flight.price}</p>
        </div>

        <div className="flex gap-4 mt-4">
          <button
            onClick={() => window.print()}
            className="flex-1 bg-blue-700 text-white py-2 rounded hover:bg-blue-800"
          >
            🖨️ Print Ticket
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex-1 bg-gray-300 py-2 rounded hover:bg-gray-400"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
