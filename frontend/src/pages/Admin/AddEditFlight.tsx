import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

// TypeScript interface for the form fields
interface FlightForm {
  origin: string;
  destination: string;
  departTime: string;
  departWeekday: string;
  duration: string;
  arrivalTime: string;
  arrivalWeekday: string;
  flightNo: string;
  airlineCode: string;
  airline: string;
  economyFare: string;
  businessFare: string;
  firstFare: string;
  departDate: string;
}

const AddEditFlight = () => {
  const { pnr } = useParams<{ pnr?: string }>();
  const isEdit = !!pnr;
  const navigate = useNavigate();

  const [form, setForm] = useState<FlightForm>({
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
    departDate: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FlightForm, string>>>({});

  useEffect(() => {
    if (isEdit) {
      axios
        .get(`http://localhost:4000/flight/${pnr}`)
        .then((res) => {
          if (res.data.length > 0) {
            setForm(res.data[0]);
          }
        })
        .catch((err) => console.error("Failed to load flight", err));
    }
  }, [pnr, isEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof FlightForm, string>> = {};

    if (!/^[A-Za-z\s]+$/.test(form.origin)) {
      newErrors.origin = "Origin must contain only letters";
    }

    if (!/^[A-Za-z\s]+$/.test(form.destination)) {
      newErrors.destination = "Destination must contain only letters";
    }

    if (!/^\d{2}:\d{2}:\d{2}$/.test(form.departTime)) {
      newErrors.departTime = "Depart time must be in HH:MM:SS format";
    }

    if (!/^\d{2}:\d{2}:\d{2}$/.test(form.arrivalTime)) {
      newErrors.arrivalTime = "Arrival time must be in HH:MM:SS format";
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(form.departDate)) {
      newErrors.departDate = "Date must be in YYYY-MM-DD format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

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
    <>
      <header className="bg-white shadow-sm">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-airline-blue">Admin Dashboard</h1>
          <ul><a href="/admin">Dashboard Panel</a></ul>
          <div className="flex items-center space-x-4">
            <span className="text-sm">Welcome, Admin</span>
          </div>
        </div>
      </header>

      <div className="max-w-xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">{isEdit ? "Edit Flight" : "Add Flight"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.entries(form).map(([key, value]) => {
            let inputType = "text";
       

            return (
              <div key={key}>
                <input
                  name={key}
                  value={value}
                  onChange={handleChange}
                  type={inputType}
                  placeholder={key}
                  className="w-full p-2 border rounded"
                  required
                />
                {errors[key as keyof FlightForm] && (
                  <p className="text-red-600 text-sm">{errors[key as keyof FlightForm]}</p>
                )}
              </div>
            );
          })}
          <button className="bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded">
            {isEdit ? "Update" : "Create"} Flight
          </button>
        </form>
      </div>
    </>
  );
};

export default AddEditFlight;
