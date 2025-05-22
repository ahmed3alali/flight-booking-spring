import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditPerson() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    passportNo: "",
    flightId: ""
  });

  useEffect(() => {
    axios.get(`http://localhost:4000/passenger/${id}`)
    .then((res) => setForm(res.data))
    .catch((err) => {
        console.error("Failed to load passenger", err);
        alert("Could not load passenger");
      });
  }, [id]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/passenger/${id}`, form);
      alert("Passenger updated!");
      navigate("/admin/persons");
    } catch (err) {
      console.error("Failed to update passenger", err);
      alert("Update failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Passenger</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="passportNo"
          type="number"
          placeholder="Passport No"
          value={form.passportNo}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="flightId"
          type="number"
          placeholder="Flight ID"
          value={form.flightId}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button className="bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded">
          Save Changes
        </button>
      </form>
    </div>
  );
}
