import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const AddEditFlight = () => {
  const { pnr } = useParams();
  const isEdit = !!pnr;
  const navigate = useNavigate();

  const [form, setForm] = useState({
    origin: "",
    destination: "",
    departTime: "",
    departWeekday: "",
    duration: "",
    arrivalTime: "",
    arrivalWeekday: "",
    flightNo: "",
    airlineCode: "",
    airline: "",
    economyFare: "",
    businessFare: "",
    firstFare: "",
  });

  useEffect(() => {
    if (isEdit) {
      axios
        .get(`http://localhost:4000/flight/${pnr}`)
        .then((res) => {
          if (res.data.length > 0) {
            setForm(res.data[0]); // assuming backend returns an array
          }
        })
        .catch((err) => console.error("Failed to load flight", err));
    }
  }, [pnr]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await axios.put(`http://localhost:4000/flight/${pnr}`, form);
        alert("Flight updated!");
      } else {
        await axios.post("http://localhost:4000/flight", form);
        alert("Flight added!");
      }

      navigate("/admin/flights");
    } catch (err) {
      console.error("Error saving flight:", err);
      alert("Failed to save flight");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">{isEdit ? "Edit Flight" : "Add Flight"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(form).map((key) => (
          <input
            key={key}
            name={key}
            placeholder={key}
            value={form[key]}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        ))}
        <button className="bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded">
          {isEdit ? "Update" : "Create"} Flight
        </button>
      </form>
    </div>
  );
};

export default AddEditFlight;
