import { Plan } from './types';

export const plans: Plan[] = [
  {
    name: 'Base',
    price: 'Free',
    description: "Essential tools for managing Addison's Disease",
    features: [
      { name: 'Basic Medication Reminders', included: true },
      { name: 'Emergency Information Access', included: true },
      { name: 'Community Forum Access', included: true },
      { name: 'Basic Appointment Tracking', included: true },
      { name: 'Digital Emergency ID', included: true },
      { name: 'Grace AI Support Agent', included: false },
      { name: 'Advanced Emergency Protocols', included: false },
      { name: 'Extended History', included: false },
      { name: 'Family Accounts', included: false },
      { name: 'Advanced Analytics', included: false },
      { name: 'Priority Support', included: false }
    ]
  },
  {
    name: 'Pro',
    price: '£4.99',
    interval: 'month',
    description: 'Advanced features for comprehensive care management',
    features: [
      { name: 'Basic Medication Reminders', included: true },
      { name: 'Emergency Information Access', included: true },
      { name: 'Community Forum Access', included: true },
      { name: 'Basic Appointment Tracking', included: true },
      { name: 'Digital Emergency ID', included: true },
      { name: 'Grace AI Support Agent', included: true },
      { name: 'Advanced Emergency Protocols', included: true },
      { name: 'Extended History', included: true },
      { name: 'Family Accounts', included: true },
      { name: 'Advanced Analytics', included: true },
      { name: 'Priority Support', included: true }
    ]
  }
];