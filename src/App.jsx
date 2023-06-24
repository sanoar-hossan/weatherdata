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
    <div className="max-w-xl mx-auto py-8">
      <div className="flex items-center justify-between my-2">
        <input
          type="text"
          ref={inputRef}
          placeholder="Enter Your Location"
          className="text-xl border-b p-1 border-black  font-semibold uppercase flex-1"
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={fetchWeather}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
        >
          Search Location
        </button>
      </div>

      {weather && (
        <div className="card card-side bg-base-100 shadow-xl py-10">
          <figure>
            <img src={weather.current.condition.icon} alt="Temp Icon" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {weather.current.condition.text}
            </h2>
            <p>
              Now Temperature {weather.current.temp_c}
              <sup>°</sup> C
            </p>
            <p>
              Feels Like {weather.current.feelslike_c}
              <sup>°</sup> C
            </p>
            <p>Humidity {weather.current.humidity}</p>
            <p>Wind Speed {weather.current.vis_km} km/h</p>
            <p>City: {weather.location.name}</p>
            <p>Date: {weather.forecast.forecastday[0].date}</p>
            <div className="card-actions">
              Country: {weather.location.country}
            </div>
          </div>
        </div>
      )}

      {weather && (
        <div>
          <h1>Last Few Days Temperature For {weather.location.name}</h1>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th></th>
                  <th>Sunrise Time</th>
                  <th>Sunset Time</th>
                  <th>Max temp</th>
                </tr>
              </thead>
              <tbody>
                {weather.forecast.forecastday.map((day) => (
                  <tr key={day.date}>
                    <th>{day.date}</th>
                    <th>{day.astro.sunrise}</th>
                    <th>{day.astro.sunset}</th>
                    <th>{day.day.maxtemp_c} degree</th>
                    {/* Add other columns here */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
