import { FirebaseError } from 'firebase/app';

export function getFirebaseErrorMessage(error: unknown): string {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case 'auth/invalid-email':
        return 'Invalid email address';
      case 'auth/user-disabled':
        return 'This account has been disabled';
      case 'auth/user-not-found':
        return 'No account found with this email';
      case 'auth/wrong-password':
        return 'Incorrect password';
      case 'auth/email-already-in-use':
        return 'An account already exists with this email';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters';
      case 'auth/operation-not-allowed':
        return 'Operation not allowed';
      case 'auth/popup-closed-by-user':
        return 'Sign in popup was closed before completion';
      case 'auth/invalid-api-key':
        return 'Authentication service is temporarily unavailable';
      case 'auth/network-request-failed':
        return 'Network error occurred. Please check your connection';
      case 'auth/internal-error':
        return 'An internal authentication error occurred. Please try again.';
      case 'auth/too-many-requests':
        return 'Too many unsuccessful login attempts. Please try again later.';
      default:
        console.error('Firebase Auth Error:', error.code, error.message);
        return 'An error occurred during authentication';
    }
  }
  return 'An unexpected error occurred';
}