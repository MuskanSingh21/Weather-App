import React, { useEffect, useRef, useState } from "react";

import "./Weather.css";
import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import humidity_icon from "../Assets/humidity.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";

const Weather = () => {
  const inputref = useRef();
  const [weatherData, setWeatherData] = useState(false);

  const allIcons = {
    o1d: clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    o4d: drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    o9n: rain_icon,
    "010d": rain_icon,
    "010n": rain_icon,
    o13d: snow_icon,
    "013n": snow_icon,
  };

  const search = async (city) => {
    if (city === "") {
      alert("Please enter city name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }
      console.log(data);
      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        windspeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setWeatherData(false);
      console.error("Error in fetching weather data ");
    }
  };

  useEffect(() => {
    search("London");
  }, []);

  return (
    <>
      <div className="weather">
        <div className="search-bar">
          <input ref={inputref} type="text" placeholder="Search" />
          <img
            src={search_icon}
            alt=""
            onClick={() => search(inputref.current.value)}
          />
        </div>
        {weatherData ? (
          <>
            <img src={weatherData.icon} alt="" className="weather-icon" />
            <p className="temperature">{weatherData.temperature}&deg;c</p>
            <p className="location">{weatherData.location}</p>
            <div className="weather-data">
              <div className="col">
                <img src={humidity_icon} alt="" />
                <div>
                  <p>{weatherData.humidity} %</p>

                  <span>Humidity</span>
                </div>
              </div>
              <div className="col">
                <img src={wind_icon} alt="" />
                <div>
                  <p>{weatherData.windspeed} km/h</p>

                  <span>Wind Speed</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Weather;
