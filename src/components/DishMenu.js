// /src/components/DishMenu.js
import React from 'react';

const DishMenu = ({ dishes }) => {
  return (
    <div className="max-h-96 overflow-y-auto">
      <h3 className="font-semibold mb-2" style={{ color: '#00796b' }}>Dish Menu</h3>
      <ul className="space-y-2">
        {dishes.map((dish) => (
          <li keys=s{dish.id} className="flex justify-between py-2 border-b border-gray-200">
            <span>{dish.name}</span>
            <span className="text-gray-500">${dish.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DishMenu;
