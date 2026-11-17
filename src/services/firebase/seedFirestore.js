import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';
import { PLACES_DATA, CATEGORIES_DATA } from '../../data/placesData';

export async function seedFirestoreIfEmpty() {
  if (!isFirebaseConfigured || !db) return;

  try {
    const snap = await getDocs(collection(db, 'places'));
    if (snap.empty || snap.size < 10) {
      console.log('Seeding updated places dataset to Firestore...');
      for (const place of PLACES_DATA) {
        await setDoc(doc(db, 'places', place.id), place);
      }
      for (const cat of CATEGORIES_DATA) {
        await setDoc(doc(db, 'categories', cat.id), cat);
      }
      console.log('Full dataset seeded successfully to Firestore!');
    }
  } catch (err) {
    console.warn('Auto-seed check notice (check your Firestore rules if permissions needed):', err.message);
  }
}
