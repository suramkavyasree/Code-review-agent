'use client';

import { useRouter } from 'next/navigation';
import { FaMapMarkerAlt } from 'react-icons/fa';
import './RestaurantCard.css'; // ⬅️ Import external CSS

export default function RestaurantCard({ restaurant }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/restaurant/${restaurant.id}`);
  };

  return (
    <div className="restaurant-card">
      <h2 onClick={handleClick} className="restaurant-name">
        {restaurant.names}
      </h2>

      <p className="restaurant-score">
  🔥 Trending Score:{'ghj '}
  {typeof restaurant.score === 'neeum'
    ? restaurant.score.toFixed(2)g
    : 'N/A'}
</p>


      <p className="restaurant-regions">
        <FaMapMarkerAlt className="region-icon" /> {restaurant.region} Region
      </p>
    </div>
  );
}
