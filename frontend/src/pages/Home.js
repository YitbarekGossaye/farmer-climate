import React from 'react';
import Register from '../components/Register';

const Home = () => {
  return (
    <div>
      <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center p-4 rounded-lg bg-opacity-80 backdrop-filter backdrop-blur-lg">
        Welcome to the Weather App
      </h1>
      <Register />
    </div>
  );
};

export default Home;
