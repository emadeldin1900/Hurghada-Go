import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { TripPlanProvider } from './context/TripPlanContext';
import { seedFirestoreIfEmpty } from './services/firebase/seedFirestore';

import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import PlaceDetailsPage from './pages/PlaceDetailsPage';
import AiPlannerPage from './pages/AiPlannerPage';
import SavedPlacesPage from './pages/SavedPlacesPage';
import ProfilePage from './pages/ProfilePage';
import AuthPage from './pages/AuthPage';

export default function App() {
  useEffect(() => {
    seedFirestoreIfEmpty();
  }, []);

  return (
    <LanguageProvider>
      <AuthProvider>
        <TripPlanProvider>
          <BrowserRouter>
            <Routes>
              {/* Main Site with Header & Footer */}
              <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="explore" element={<ExplorePage />} />
                <Route path="place/:id" element={<PlaceDetailsPage />} />
                <Route path="ai-planner" element={<AiPlannerPage />} />
                <Route path="saved" element={<SavedPlacesPage />} />
                <Route path="profile" element={<ProfilePage />} />
              </Route>

              {/* Dedicated Authentication Flow */}
              <Route path="/auth" element={<AuthPage />} />

              {/* Catch-all redirect */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </TripPlanProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
