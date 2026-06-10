export async function getForecastByZip(zip) {
  const geoResponse = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${zip}&count=1&countryCode=US&language=en&format=json`
  );

  if (!geoResponse.ok) {
    throw new Error('Unable to look up ZIP code.');
  }

  const geoData = await geoResponse.json();
  const location = geoData.results?.[0];

  if (!location) {
    throw new Error('No location found for that ZIP code.');
  }

  const forecastResponse = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&hourly=temperature_2m,weather_code,precipitation_probability&temperature_unit=fahrenheit&forecast_days=5&timezone=auto`
  );

  if (!forecastResponse.ok) {
    throw new Error('Unable to fetch forecast.');
  }

  const forecastData = await forecastResponse.json();

  return {
    location,
    forecast: forecastData,
  };
}