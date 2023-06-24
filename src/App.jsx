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
      console.log(loading);

      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_API_KEY}&q=${searchTerm}`
        );
        setWeather(response.data);
        console.log(weather);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }

      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      fetchWeather();
    }
  };

  return (
    <div >
      <div className="flex items-center justify-between">
      <input
        type="text"
        ref={inputRef}
        placeholder="Enter Your Location"
        className="text-xl border-b p-1 border-gray-200 font-semibold uppercase flex-1"
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={fetchWeather}
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
      >
        Search Location
      </button>
    </div>
<div>

<div className="card card-side bg-base-100 shadow-xl">
  <figure><img src={weather?.current.condition.icon} alt="Movie"/></figure>
  <div className="card-body">
    <h2 className="card-title">{weather ? weather.current.condition.text : "Your city name is not correct"}</h2>
    <p>Now Temperature {weather&& weather.current.temp_c} <sup>°</sup> C</p>
    <p>Now Temperature {weather&& weather.current.humidity} <sup>°</sup> C</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Watch</button>
    </div>
  </div>
</div>
</div>
    </div>
  );
};

export default App;
