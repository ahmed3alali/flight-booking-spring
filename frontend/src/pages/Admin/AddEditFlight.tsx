import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function AddEditFlight() {
  const [formData, setFormData] = useState({
    airline: "",
    from: "",
    to: "",
    date: "",
    price: "",
    seats: "",
  });

  const { id } = useParams(); // if editing, will have flight id
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(`/flights/${id}`)
        .then(res => setFormData(res.data))
        .catch(err => console.error("Load failed:", err));
    }
  }, [id]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`/flights/${id}`, formData);
      } else {
        await axios.post("/flights", formData);
      }
      navigate("/admin/flights");
    } catch (err) {
      console.error("Save failed:", err);
    }
  };

  return (
    <div className="min-h-screen p-10 bg-white">
      <h1 className="text-3xl font-bold mb-6">
        {id ? "✏️ Edit Flight" : "➕ Add New Flight"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <input name="airline" value={formData.airline} onChange={handleChange} placeholder="Airline" required className="w-full border p-2 rounded" />
        <input name="from" value={formData.from} onChange={handleChange} placeholder="From" required className="w-full border p-2 rounded" />
        <input name="to" value={formData.to} onChange={handleChange} placeholder="To" required className="w-full border p-2 rounded" />
        <input name="date" value={formData.date} onChange={handleChange} placeholder="Date (e.g. 2025-06-01T12:00)" required className="w-full border p-2 rounded" />
        <input name="price" value={formData.price} onChange={handleChange} placeholder="Price (USD)" type="number" required className="w-full border p-2 rounded" />
        <input name="seats" value={formData.seats} onChange={handleChange} placeholder="Seats" type="number" required className="w-full border p-2 rounded" />

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          {id ? "Update Flight ✈️" : "Create Flight 🛫"}
        </button>
      </form>
    </div>
  );
}
