// pages/index.js
import React from 'react';
import Grid from './components/power_ups';

const Home = () => {
  return (
    <div className="mx-auto pt-4 pb-1 pl-4 pr-4 w-full h-screen bg-gray-100">
      <h1 className="text-2xl font-bold align-middle justify-center grid mb-4 mt-10">Choose 4 power-ups</h1>
      <Grid />
    </div>

  );
};

export default Home;