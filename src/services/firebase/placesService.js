import { collection, getDocs, addDoc, query, where } from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';
import { PLACES_DATA, CATEGORIES_DATA } from '../../data/placesData';

export const placesService = {
  async getAllPlaces() {
    if (isFirebaseConfigured && db) {
      try {
        const snap = await getDocs(collection(db, 'places'));
        if (!snap.empty) {
          return snap.docs.map(d => ({ id: d.id, ...d.data() }));
        }
      } catch (e) {
        console.warn('Firestore fetch failed, using local places:', e);
      }
    }
    return PLACES_DATA;
  },

  async getPlaceById(id) {
    const list = await placesService.getAllPlaces();
    return list.find(p => p.id === id) || null;
  },

  async getPlacesByCategory(categorySlug) {
    const list = await placesService.getAllPlaces();
    if (!categorySlug || categorySlug === 'all') return list;
    return list.filter(p => p.category.toLowerCase() === categorySlug.toLowerCase());
  },

  async searchPlaces({ query: qText = '', category = 'all', destination = '', minRating = 0 }) {
    const list = await placesService.getAllPlaces();
    return list.filter(place => {
      const matchQuery = !qText || 
        place.name.toLowerCase().includes(qText.toLowerCase()) ||
        place.nameAr.includes(qText) ||
        place.description.toLowerCase().includes(qText.toLowerCase()) ||
        place.descriptionAr.includes(qText) ||
        place.tags?.some(t => t.toLowerCase().includes(qText.toLowerCase()));

      const matchCat = category === 'all' || 
        place.category.toLowerCase() === category.toLowerCase();

      const matchDest = !destination || 
        place.location.toLowerCase().includes(destination.toLowerCase()) ||
        place.locationAr.includes(destination);

      const matchRating = place.rating >= minRating;

      return matchQuery && matchCat && matchDest && matchRating;
    });
  },

  async getCategories() {
    return CATEGORIES_DATA;
  }
};

export const bookingsService = {
  getStorageKey(userId) {
    return `gohurghada_bookings_${userId || 'guest'}`;
  },

  async getUserBookings(userId) {
    if (isFirebaseConfigured && db && userId) {
      try {
        const q = query(collection(db, 'bookings'), where('userId', '==', userId));
        const snap = await getDocs(q);
        if (!snap.empty) {
          return snap.docs.map(d => ({ id: d.id, ...d.data() }));
        }
      } catch (e) {
        console.warn('Firestore bookings fetch failed, using local cache:', e);
      }
    }
    const key = this.getStorageKey(userId);
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  },

  async createBooking(bookingData) {
    const userId = bookingData.userId || 'guest';
    const newBooking = {
      id: 'BK-' + Math.random().toString(36).substr(2, 8).toUpperCase(),
      createdAt: new Date().toISOString(),
      status: 'confirmed',
      ...bookingData
    };

    if (isFirebaseConfigured && db) {
      try {
        const docRef = await addDoc(collection(db, 'bookings'), newBooking);
        newBooking.id = docRef.id;
      } catch (e) {
        console.warn('Firestore addDoc failed, saved locally:', e);
      }
    }

    const key = this.getStorageKey(userId);
    const list = await this.getUserBookings(userId);
    list.unshift(newBooking);
    localStorage.setItem(key, JSON.stringify(list));
    return newBooking;
  }
};
