import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with the live key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PAYMENT_URL = 'https://buy.stripe.com/8wM6p4gtWemXeqccMM';

// For redirecting to the payment page
export const redirectToStripePro = () => {
  try {
    // First check if we can open windows
    if (!window) {
      throw new Error('Window object not available');
    }

    // Try to open the payment page in a popup first
    const paymentWindow = window.open(PAYMENT_URL, '_blank', 'noopener,noreferrer');
    
    if (!paymentWindow) {
      // If popup blocked, redirect in same window
      window.location.href = PAYMENT_URL;
      return true;
    }

    // Return true to indicate success
    return true;
  } catch (error) {
    // Log with actual error object
    console.error('Payment redirect error:', error instanceof Error ? error.message : 'Unknown error');
    
    // Fallback to direct navigation
    window.location.href = PAYMENT_URL;
    return true;
  }
};

// For future use with custom checkout
export const getStripeInstance = () => stripePromise;