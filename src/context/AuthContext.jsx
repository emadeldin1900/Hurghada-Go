import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/firebase/authService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initUser() {
      try {
        const current = await authService.getCurrentUser();
        setUser(current);
      } finally {
        setLoading(false);
      }
    }
    initUser();
  }, []);

  const signIn = async (email, password) => {
    const loggedUser = await authService.signInWithEmail(email, password);
    setUser(loggedUser);
    return loggedUser;
  };

  const signUp = async (email, password, name) => {
    const newUser = await authService.signUpWithEmail(email, password, name);
    setUser(newUser);
    return newUser;
  };

  const signInGoogle = async () => {
    const loggedUser = await authService.signInWithGoogle();
    setUser(loggedUser);
    return loggedUser;
  };

  const sendPhoneOTP = async (phoneNumber, forceMock = false) => {
    return await authService.sendPhoneOTP(phoneNumber, forceMock);
  };

  const verifyPhoneOTP = async (confirmationResult, otpCode, phoneNumber) => {
    const loggedUser = await authService.verifyPhoneOTP(confirmationResult, otpCode, phoneNumber);
    setUser(loggedUser);
    return loggedUser;
  };

  const logout = async () => {
    await authService.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      signIn, 
      signUp, 
      signInGoogle, 
      sendPhoneOTP, 
      verifyPhoneOTP, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
