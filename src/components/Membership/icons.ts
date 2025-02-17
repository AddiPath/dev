import { Bot, Shield, Clock, Users, LineChart, Zap } from 'lucide-react';
import { ComponentType } from 'react';

export const featureIcons: Record<string, ComponentType> = {
  'Grace AI Support Agent': Bot,
  'Advanced Emergency Protocols': Shield,
  'Extended History': Clock,
  'Family Accounts': Users,
  'Advanced Analytics': LineChart,
  'Priority Support': Zap
};