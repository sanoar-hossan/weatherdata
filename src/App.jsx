import axios from "axios";
import { useRef, useState } from "react";

const App = () => {
  const inputRef = useRef(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    const searchTerm = inputRef.current.value;

    if (searchTerm) {
      setLoading(true);

      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_API_KEY}&q=${searchTerm}`
        );
        setWeather(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }

      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <input
        type="text"
        ref={inputRef}
        placeholder="Enter Your Location"
        className="text-xl border-b p-1 border-gray-200 font-semibold uppercase flex-1"
      />
      <button
        onClick={fetchWeather}
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
      >
        Search Location
      </button>
    </div>
  );
};

export default App;
