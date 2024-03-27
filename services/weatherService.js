const axios = require("axios");

async function getWeather(city, country) {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${process.env.OPENWEATHERMAP_API_KEY}`
    );
    return response?.data;
  } catch (error) {
    throw new Error("Failed to fetch weather data");
  }
}

module.exports = { getWeather };
