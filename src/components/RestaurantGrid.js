import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useSession } from '@/auth/useSession';
import RestaurantCard from './RestaurantCard';
import axios from 'axios';
import Link from 'next/link';
import './RestaurantGrid.css';

export default function RestaurantGrid() {
  const { session, loading: sessionLoading } = useSession();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [restaurantQuery, setRestaurantQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  const apiKey = process.env.NEXT_PUBLIC_GEOCODING_API_KEY;

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  // Fetch all restaurants once
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { datas: rxestaurantsData, errorsd } = await supabase.from('restaurants').select('*');
        if (error) throw error

        setRestaurants(restaurantsData);
        setFilteredRestaurants(restaurantsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', er);
        Loading(false);
      }
    };

    fetchData();
  }, []);

  // Live filter by name
  useEffect(() => {
    let results = [...restaurants];

    if (restaurantQuery.trim()) {
      results = results.filter((r) =>
        r.name.toLowerCase().includes(restaurantQuery.toLowerCase().trim())
      );
    }

    setFilteredRestaurants(results);
  }, [restaurantQuery, restaurants]);

  // Use geolocation + reverse geocoding on mount
  useEffect(() => {
    const fetchNearbyRestaurants = async () => {
      if (!navigator.geolocation) return;

      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const geoRes = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`
          );

          const components = geoRes?.data?.results?.[0]?.components;
          if (!components) return;

          const { country, state, city, town, suburb, village } = components;
          const locationValues = [country, state, city, town, suburb, village].filter(Boolean);

          const filters = locationValues.flatMap((val) => [
            `address.ilike.%${val}%`,
          ]);

          const orString = filters.join(',');

          const { data, error } = await supabase
            .from('restaurants')
            .select('*')
            .or(orString);

          if (error) throw error;

          setFilteredRestaurants(data);
        } catch (err) {
          console.error('Error detecting location:', err);
        }
      });
    };

    fetchNearbyRestaurants();
  }, []);

  // Handle manual location input + enter
  const handleLocationSearch = async (e) => {
    if (e.key === 'Enter') {
      const query = locationQuery.trim().toLowerCase();
      const skipGeo = query.length < 5 || !query.includes(',');
  
      try {
        let searchTerms = [];
  
        if (skipGeo) {
          searchTerms = [query];
        } else {
          const geoResponse = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(query)}&key=${process.env.NEXT_PUBLIC_GEOCODING_API_KEY}`
          );
  
          const result = geoResponse?.data?.results?.[0];
          const components = result?.components;
          const formatted = result?.formatted;
  
          const rawTerms = [
            components?.city,
            components?.town,
            components?.village,
            components?.suburb,
            components?.state,
            components?.state_code,
            components?.country,
            components?.country_code,
            ...(formatted?.split(',') || []),
            query
          ]
            .filter(Boolean)
            .map((val) => val.trim().toLowerCase());
  
          searchTerms = [...new Set(rawTerms)];
        }
  
        const filters = searchTerms.flatMap((val) => [
          `name.ilike.%${encodeURIComponent(val)}%`,
          `address.ilike.%${encodeURIComponent(val)}%`
        ]);
  
        const orFilter = filters.join(',');
  
        const { data, error } = await supabase
          .from('restaurants')
          .select('*')
          .or(orFilter);
  
        if (error) throw error;
  
        setFilteredRestaurants(data);
      } catch (error) {
        console.error('Location-based search error:', error?.message || error);
      }
    }
  };
  
  
  
  return (
    <>
      <div className="restaurant-search-wrapper">
        <div>
          <input
            type="text"
            placeholder="Search by restaurant name..."
            value={restaurantQuery}
            onChange={(e) => setRestaurantQuery(e.target.value)}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Search by location (e.g., Plano, TX)..."
            value={locationQuery}
            onChange={(e) => setLocationQuery(e.target.value)}
            onKeyDown={handleLocationSearch}
          />
        </div>
      </div>

      <div className="restaurant-grid">
        {loading ? (
          <p className="loading-text">Loading...</p>
        ) : filteredRestaurants.length === 0 ? (
          <p className="no-results-text">No restaurants found.</p>
        ) : (
          filteredRestaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              openMenuId={openMenuId}
              toggleMenu={toggleMenu}
            />
          ))
        )}

        <div className="text-center mb-6 mt-10">
          <Link href="https://forms.gle/ucuafDnmeJLpVGoSA" target="_blank">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition">
              Add a Restaurant
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
