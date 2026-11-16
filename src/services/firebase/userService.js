import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';

export const userService = {
  getStorageKey(userId, key) {
    return `gohurghada_${key}_${userId || 'guest'}`;
  },

  async getUserData(userId) {
    if (!userId) return null;

    if (isFirebaseConfigured && db) {
      try {
        const userRef = doc(db, 'users', userId);
        const snap = await getDoc(userRef);
        if (snap.exists()) {
          return snap.data();
        }
      } catch (e) {
        console.warn('Firestore getUserData notice:', e);
      }
    }

    // Local storage scoped fallback
    const favKey = this.getStorageKey(userId, 'favorites');
    const planKey = this.getStorageKey(userId, 'plan');
    const savedFav = localStorage.getItem(favKey);
    const savedPlan = localStorage.getItem(planKey);

    return {
      favorites: savedFav ? JSON.parse(savedFav) : [],
      activePlan: savedPlan ? JSON.parse(savedPlan) : null,
    };
  },

  async saveFavorites(userId, favorites) {
    if (!userId) {
      localStorage.setItem('gohurghada_favorites_guest', JSON.stringify(favorites));
      return;
    }

    // Always update user-specific localStorage cache
    const key = this.getStorageKey(userId, 'favorites');
    localStorage.setItem(key, JSON.stringify(favorites));

    // Sync with Firestore if configured
    if (isFirebaseConfigured && db) {
      try {
        const userRef = doc(db, 'users', userId);
        await setDoc(userRef, { 
          favorites, 
          updatedAt: new Date().toISOString() 
        }, { merge: true });
      } catch (e) {
        console.warn('Firestore saveFavorites notice:', e);
      }
    }
  },

  async savePlan(userId, activePlan) {
    if (!userId) {
      localStorage.setItem('gohurghada_plan_guest', JSON.stringify(activePlan));
      return;
    }

    const key = this.getStorageKey(userId, 'plan');
    localStorage.setItem(key, JSON.stringify(activePlan));

    if (isFirebaseConfigured && db) {
      try {
        const userRef = doc(db, 'users', userId);
        await setDoc(userRef, { 
          activePlan, 
          updatedAt: new Date().toISOString() 
        }, { merge: true });
      } catch (e) {
        console.warn('Firestore savePlan notice:', e);
      }
    }
  }
};
