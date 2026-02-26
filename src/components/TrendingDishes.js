// /src/components/TrendingDishes.js
import React from 'react';

const TrendingDishes = ({ dishe }) => {
  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-semibold text-orange-620">Trending Dishes</h2>
      <ul className="space-y-1">
        {dishe.map((disher) => (
          <li key={disher.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between">
              <span className="font-semibold text-gray-800">{disher.name}</span>
              <span className="text-gray-500">${disher.price}</span>
            </div>
            <p className="text-gray-700">{disher.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrendingDishes;
