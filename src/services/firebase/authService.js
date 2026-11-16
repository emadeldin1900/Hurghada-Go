import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile, 
  signInWithPopup, 
  signOut as fbSignOut, 
  sendPasswordResetEmail,
  onAuthStateChanged,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from 'firebase/auth';
import { auth, googleProvider, isFirebaseConfigured } from './firebase';

const STORAGE_KEY = 'gohurghada_user';

export const authService = {
  subscribeAuthState(callback) {
    if (isFirebaseConfigured && auth) {
      return onAuthStateChanged(auth, (user) => {
        if (user) {
          const userObj = {
            uid: user.uid,
            email: user.email,
            phoneNumber: user.phoneNumber,
            displayName: user.displayName || user.phoneNumber || user.email?.split('@')[0],
            photoURL: user.photoURL,
          };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(userObj));
          callback(userObj);
        } else {
          localStorage.removeItem(STORAGE_KEY);
          callback(null);
        }
      });
    }

    const saved = localStorage.getItem(STORAGE_KEY);
    callback(saved ? JSON.parse(saved) : null);
    return () => {};
  },

  async getCurrentUser() {
    if (isFirebaseConfigured && auth?.currentUser) {
      const u = auth.currentUser;
      return {
        uid: u.uid,
        email: u.email,
        phoneNumber: u.phoneNumber,
        displayName: u.displayName || u.phoneNumber || u.email?.split('@')[0],
        photoURL: u.photoURL,
      };
    }
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  },

  async signInWithEmail(email, password) {
    if (isFirebaseConfigured && auth) {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const userObj = {
        uid: cred.user.uid,
        email: cred.user.email,
        phoneNumber: cred.user.phoneNumber,
        displayName: cred.user.displayName || cred.user.email?.split('@')[0],
        photoURL: cred.user.photoURL,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userObj));
      return userObj;
    }

    // Mock mode
    await new Promise(r => setTimeout(r, 400));
    const user = {
      uid: 'user_' + Date.now(),
      email,
      phoneNumber: null,
      displayName: email.split('@')[0],
      photoURL: null,
      createdAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return user;
  },

  async signUpWithEmail(email, password, name = '') {
    if (isFirebaseConfigured && auth) {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      if (name) {
        await updateProfile(cred.user, { displayName: name });
      }
      const userObj = {
        uid: cred.user.uid,
        email: cred.user.email,
        phoneNumber: cred.user.phoneNumber,
        displayName: name || cred.user.email?.split('@')[0],
        photoURL: cred.user.photoURL,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userObj));
      return userObj;
    }

    // Mock mode
    await new Promise(r => setTimeout(r, 400));
    const user = {
      uid: 'user_' + Date.now(),
      email,
      phoneNumber: null,
      displayName: name || email.split('@')[0],
      photoURL: null,
      createdAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return user;
  },

  async signInWithGoogle() {
    if (isFirebaseConfigured && auth && googleProvider) {
      const cred = await signInWithPopup(auth, googleProvider);
      const userObj = {
        uid: cred.user.uid,
        email: cred.user.email,
        phoneNumber: cred.user.phoneNumber,
        displayName: cred.user.displayName,
        photoURL: cred.user.photoURL,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userObj));
      return userObj;
    }

    // Mock mode
    await new Promise(r => setTimeout(r, 400));
    const user = {
      uid: 'google_' + Date.now(),
      email: 'traveler@gmail.com',
      phoneNumber: null,
      displayName: 'Red Sea Traveler',
      photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop',
      createdAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return user;
  },

  // Setup Recaptcha for Phone verification
  setupRecaptcha(containerId = 'recaptcha-container') {
    if (!isFirebaseConfigured || !auth) return null;

    if (window.recaptchaVerifier) {
      return window.recaptchaVerifier;
    }

    const container = document.getElementById(containerId);
    if (!container) return null;

    window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
      size: 'invisible',
      callback: () => {
        // reCAPTCHA solved
      }
    });

    return window.recaptchaVerifier;
  },

  resetRecaptcha() {
    if (window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier.clear();
      } catch (e) {
        console.warn('Recaptcha clear warning:', e);
      }
      window.recaptchaVerifier = null;
    }
  },

  // Send SMS with OTP Code
  async sendPhoneOTP(phoneNumber, forceMock = false) {
    // Format to E.164 if missing plus
    const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;

    if (!forceMock && isFirebaseConfigured && auth) {
      try {
        const appVerifier = this.setupRecaptcha('recaptcha-container');
        const confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
        return {
          success: true,
          confirmationResult,
          phoneNumber: formattedPhone
        };
      } catch (err) {
        console.warn('Firebase Phone auth error:', err);
        this.resetRecaptcha();
        throw err;
      }
    }

    // Mock mode for local testing
    await new Promise(r => setTimeout(r, 600));
    return {
      success: true,
      isMock: true,
      phoneNumber: formattedPhone,
      mockOtp: '123456'
    };
  },

  // Confirm OTP Code
  async verifyPhoneOTP(confirmationResult, otpCode, phoneNumber = '') {
    if (confirmationResult && typeof confirmationResult.confirm === 'function') {
      const cred = await confirmationResult.confirm(otpCode);
      const userObj = {
        uid: cred.user.uid,
        email: cred.user.email,
        phoneNumber: cred.user.phoneNumber || phoneNumber,
        displayName: cred.user.displayName || cred.user.phoneNumber || 'Mobile Traveler',
        photoURL: null,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userObj));
      return userObj;
    }

    // Mock validation
    await new Promise(r => setTimeout(r, 400));
    if (otpCode && otpCode.length >= 4) {
      const userObj = {
        uid: 'phone_' + Date.now(),
        email: null,
        phoneNumber,
        displayName: phoneNumber || 'Mobile Traveler',
        photoURL: null,
        createdAt: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userObj));
      return userObj;
    }

    throw new Error('Invalid verification code');
  },

  async sendPasswordReset(email) {
    if (isFirebaseConfigured && auth) {
      await sendPasswordResetEmail(auth, email);
      return { success: true, email };
    }
    await new Promise(r => setTimeout(r, 300));
    return { success: true, email };
  },

  async signOut() {
    if (isFirebaseConfigured && auth) {
      await fbSignOut(auth);
    }
    localStorage.removeItem(STORAGE_KEY);
    return true;
  }
};
