import { useEffect, useState } from "react";

interface FoodTruck {
  id: number;
  name: string;
  location: string;
  menu: string[];
}

function App() {
  const [data, setData] = useState<FoodTruck[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTruck, setNewTruck] = useState({ name: "", location: "", menu: "" });

  const fetchData = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:3000/api/foodtrucks");
    const json = await res.json();
    setData(json);
    setLoading(false);
  };

  const handleAdd = async () => {
    if (!newTruck.name || !newTruck.location) return alert("Isi semua data!");
    await fetch("http://localhost:3000/api/foodtrucks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newTruck.name,
        location: newTruck.location,
        menu: newTruck.menu.split(","),
      }),
    });
    setNewTruck({ name: "", location: "", menu: "" });
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-orange-600">
        🍔 FoodTruck Finder
      </h1>

      {/* Add new foodtruck */}
      <div className="max-w-md mx-auto bg-white shadow p-4 rounded-xl mb-6">
        <h2 className="font-semibold mb-2 text-lg">Tambah FoodTruck</h2>
        <input
          type="text"
          placeholder="Nama"
          className="border p-2 w-full mb-2 rounded"
          value={newTruck.name}
          onChange={(e) => setNewTruck({ ...newTruck, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Lokasi"
          className="border p-2 w-full mb-2 rounded"
          value={newTruck.location}
          onChange={(e) => setNewTruck({ ...newTruck, location: e.target.value })}
        />
        <input
          type="text"
          placeholder="Menu (pisahkan dengan koma)"
          className="border p-2 w-full mb-2 rounded"
          value={newTruck.menu}
          onChange={(e) => setNewTruck({ ...newTruck, menu: e.target.value })}
        />
        <button
          onClick={handleAdd}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 w-full"
        >
          Tambah
        </button>
      </div>

      {/* List foodtrucks */}
      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((truck) => (
            <div
              key={truck.id}
              className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-orange-700">
                {truck.name}
              </h3>
              <p className="text-gray-600">📍 {truck.location}</p>
              <ul className="mt-2 text-sm text-gray-800 list-disc pl-5">
                {truck.menu.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
