import React from 'react';
import ForecastChart from './src/components/ForecastChart.js';
import PerformanceChart from './src/components/PerformanceChart.js';

// Static data imports (replace with fetch()/axios for real APIs)
import forecastData from './src/data/forecast.json';
import perfData from './src/data/performance.json';

const App = () => (
  <div style={{ padding: '1rem', fontFamily: 'sans-serif' }}>
    <h1>Supermart Analytics Dashboard</h1>
    <section style={{ marginBottom: '2rem' }}>
      <h2>1. Sales Forecast</h2>
      <ForecastChart data={forecastData} width={800} height={300} />
    </section>
    <section>
      <h2>2. ML Model Performance (RMSE)</h2>
      <PerformanceChart data={perfData} width={600} height={300} />
    </section>
  </div>
);

export default App;
