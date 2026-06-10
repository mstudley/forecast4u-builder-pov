import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Tile } from '@carbon/react';
import '@carbon/react/index.scss';
import './builder-registry';

import WeatherPage from './pages/WeatherPage';

function HomePage() {
  return (
    <main style={{ padding: '2rem' }}>
      <Tile>
        <h1>Forecast4U</h1>
        <p>Builder.io Sales Engineer Technical Challenge</p>
      </Tile>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/weather/:zip" element={<WeatherPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;