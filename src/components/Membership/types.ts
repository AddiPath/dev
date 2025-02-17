export interface PlanFeature {
  name: string;
  included: boolean;
}

export interface Plan {
  name: string;
  price: string;
  interval?: string;
  description: string;
  features: PlanFeature[];
}