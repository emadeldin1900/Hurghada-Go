import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { HARA_PRESETS } from '../services/ai/haraAI';
import { useAuth } from './AuthContext';
import { userService } from '../services/firebase/userService';

const TripPlanContext = createContext();

export function TripPlanProvider({ children }) {
  const { user } = useAuth();
  const userId = user?.uid || null;

  const [favorites, setFavorites] = useState([]);
  const [activePlan, setActivePlanState] = useState(HARA_PRESETS[0]);
  const isLoadedRef = useRef(false);

  // When user logs in, logs out, or switches accounts: Load their specific data
  useEffect(() => {
    let isCurrent = true;

    async function loadUserData() {
      isLoadedRef.current = false;
      if (userId) {
        const data = await userService.getUserData(userId);
        if (isCurrent) {
          setFavorites(data?.favorites || []);
          if (data?.activePlan) {
            setActivePlanState(data.activePlan);
          } else {
            setActivePlanState(HARA_PRESETS[0]);
          }
          isLoadedRef.current = true;
        }
      } else {
        // Guest mode - use guest storage
        const saved = localStorage.getItem('gohurghada_favorites_guest');
        if (isCurrent) {
          setFavorites(saved ? JSON.parse(saved) : []);
          const guestPlan = localStorage.getItem('gohurghada_plan_guest');
          setActivePlanState(guestPlan ? JSON.parse(guestPlan) : HARA_PRESETS[0]);
          isLoadedRef.current = true;
        }
      }
    }

    loadUserData();

    return () => {
      isCurrent = false;
    };
  }, [userId]);

  const toggleFavorite = (placeId) => {
    setFavorites((prev) => {
      const next = prev.includes(placeId) 
        ? prev.filter((id) => id !== placeId) 
        : [...prev, placeId];

      userService.saveFavorites(userId, next);
      return next;
    });
  };

  const isFavorite = (placeId) => favorites.includes(placeId);

  const setActivePlan = (plan) => {
    setActivePlanState(plan);
    userService.savePlan(userId, plan);
  };

  return (
    <TripPlanContext.Provider value={{
      favorites,
      toggleFavorite,
      isFavorite,
      favoritesCount: favorites.length,
      activePlan,
      setActivePlan
    }}>
      {children}
    </TripPlanContext.Provider>
  );
}

export function useTripPlan() {
  const context = useContext(TripPlanContext);
  if (!context) throw new Error('useTripPlan must be used within TripPlanProvider');
  return context;
}
