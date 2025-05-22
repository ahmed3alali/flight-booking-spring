import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PersonsList() {
  const [persons, setPersons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4000/persons")
      .then((res) => setPersons(res.data))
      .catch((err) => console.error("Error fetching persons", err));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this passenger?")) return;
    try {
      await axios.delete(`http://localhost:4000/passenger/${id}`);
      setPersons((prev) => prev.filter((p) => p.personDetailsId !== id));
    } catch (err) {
      console.error("Failed to delete passenger", err);
      alert("Delete failed.");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">All Passengers</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Passport No</th>
            <th className="p-2 border">Flight ID</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {persons.map((p) => (
            <tr key={p.personDetailsId} className="border-t">
              <td className="p-2 border">{p.personDetailsId}</td>
              <td className="p-2 border">{p.name}</td>
              <td className="p-2 border">{p.email}</td>
              <td className="p-2 border">{p.passportNo}</td>
              <td className="p-2 border">{p.flightId}</td>
              <td className="p-2 border space-x-2">
                <button
                  onClick={() => navigate(`/admin/passengers/edit/${p.personDetailsId}`)}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p.personDetailsId)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
