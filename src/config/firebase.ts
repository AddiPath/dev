import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Use environment variables with fallback values for development
const firebaseConfig = {
  apiKey: "AIzaSyBmV4VC_Ow-XG4-NUYoQQy4QHBwUpd2Rbc",
  authDomain: "addipath-prod.firebaseapp.com", 
  projectId: "addipath-prod",
  storageBucket: "addipath-prod.appspot.com",
  messagingSenderId: "859012234567",
  appId: "1:859012234567:web:a1b2c3d4e5f6g7h8i9j0k1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Configure additional scopes for Google Auth
googleProvider.addScope('profile');
googleProvider.addScope('email');

export default app;