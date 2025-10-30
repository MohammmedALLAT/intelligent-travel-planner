export interface UserPreferences {
  destination: string;
  days: number;
  interests: string[];
  mood?: string;
  budget?: string;
  experienceType?: string;
}

export interface AlternativeActivity {
    name: string;
    description: string;
}

export interface Activity {
  name: string;
  description: string;
  category: string;
  priceLevel: 'Free' | '$' | '$$' | '$$$' | '$$$$' | string;
  alternativeActivity?: AlternativeActivity;
}

export interface DayPlan {
  day: number;
  title: string;
  activities: Activity[];
}

export interface Accommodation {
    name: string;
    type: string;
    priceLevel: 'Budget-Friendly' | 'Mid-Range' | 'Luxury' | string;
    rating: number;
    description: string;
    bookingLink?: string;
}

export interface ShoppingItem {
    name: string;
    category: string;
    description: string;
    whereToBuy: string;
}

export interface Itinerary {
  title: string;
  summary: string;
  dailyPlans: DayPlan[];
  accommodationSuggestions: Accommodation[];
  shoppingGuide: ShoppingItem[];
}
