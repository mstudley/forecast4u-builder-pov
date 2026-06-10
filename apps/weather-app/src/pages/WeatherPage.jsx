import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Column, Grid, Loading, Tile } from '@carbon/react';
import { getForecastByZip } from '../services/weatherApi';

function WeatherPage() {
  const { zip } = useParams();
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadForecast() {
      try {
        setIsLoading(true);
        setError('');
        const data = await getForecastByZip(zip);
        setWeather(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadForecast();
  }, [zip]);

  if (isLoading) {
    return <Loading description="Loading forecast" withOverlay={false} />;
  }

  if (error) {
    return (
      <main style={{ padding: '2rem' }}>
        <Tile>
          <h1>Unable to load forecast</h1>
          <p>{error}</p>
        </Tile>
      </main>
    );
  }

  const times = weather.forecast.hourly.time.filter((_, index) => index % 3 === 0);

  const temperatures = weather.forecast.hourly.temperature_2m.filter(
    (_, index) => index % 3 === 0
  );

  const precipitation = weather.forecast.hourly.precipitation_probability.filter(
    (_, index) => index % 3 === 0
  );

  return (
    <main style={{ padding: '2rem' }}>
      <h1>
        5-Day Forecast for {weather.location.name}, {weather.location.admin1}
      </h1>

      <p>ZIP Code: {zip}</p>
      <p>Forecast shown in 3-hour increments.</p>

      <Grid>
        {times.map((time, index) => (
          <Column key={time} sm={4} md={4} lg={4}>
            <Tile style={{ marginBottom: '1rem' }}>
              <h3>{new Date(time).toLocaleDateString()}</h3>

              <p>
                {new Date(time).toLocaleTimeString([], {
                  hour: 'numeric',
                  minute: '2-digit',
                })}
              </p>

              <p>Temperature: {temperatures[index]}°F</p>
              <p>Rain Chance: {precipitation[index]}%</p>
            </Tile>
          </Column>
        ))}
      </Grid>
    </main>
  );
}

export default WeatherPage;