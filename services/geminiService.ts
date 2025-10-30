import { GoogleGenAI, Type } from "@google/genai";
import type { UserPreferences, Itinerary } from '../types';

// FIX: Initialize GoogleGenAI with apiKey from environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING, description: "A creative and catchy title for the trip itinerary. e.g., 'An Adventurous 5 Days in Tokyo'" },
        summary: { type: Type.STRING, description: "A brief, engaging summary of the overall trip plan." },
        dailyPlans: {
            type: Type.ARRAY,
            description: "An array of daily plans, one for each day of the trip.",
            items: {
                type: Type.OBJECT,
                properties: {
                    day: { type: Type.INTEGER, description: "The day number (e.g., 1, 2, 3)." },
                    title: { type: Type.STRING, description: "A theme or title for the day. e.g., 'Historic Heart and Culinary Delights'" },
                    activities: {
                        type: Type.ARRAY,
                        description: "An array of activities for the day, in a logical sequence.",
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                name: { type: Type.STRING, description: "The name of the place or activity." },
                                description: { type: Type.STRING, description: "A short (1-2 sentence) description of the activity and what makes it interesting." },
                                category: { type: Type.STRING, description: "A category for the activity (e.g., 'Food', 'Culture', 'History', 'Nature', 'Shopping', 'Adventure')." },
                                priceLevel: { type: Type.STRING, description: "Estimated price level: 'Free', '$' (Inexpensive), '$$' (Moderate), '$$$' (Expensive), '$$$$' (Very Expensive)." },
                                alternativeActivity: {
                                    type: Type.OBJECT,
                                    description: "A suggested alternative activity in case of bad weather (e.g., rain). Must be an indoor activity.",
                                    properties: {
                                        name: { type: Type.STRING, description: "Name of the alternative indoor activity." },
                                        description: { type: Type.STRING, description: "Short description of the alternative activity." }
                                    }
                                }
                            },
                            required: ["name", "description", "category", "priceLevel"]
                        }
                    }
                },
                required: ["day", "title", "activities"]
            }
        },
        accommodationSuggestions: {
            type: Type.ARRAY,
            description: "A list of 3-5 accommodation suggestions matching the user's budget.",
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING, description: "Name of the hotel or accommodation." },
                    type: { type: Type.STRING, description: "Type of accommodation (e.g., Hotel, Boutique Hotel, Hostel, Airbnb)." },
                    priceLevel: { type: Type.STRING, description: "Price category (e.g., 'Budget-Friendly', 'Mid-Range', 'Luxury')." },
                    rating: { type: Type.NUMBER, description: "User rating out of 5, can be a decimal like 4.5." },
                    description: { type: Type.STRING, description: "A brief description of the accommodation and why it's a good fit." },
                    bookingLink: { type: Type.STRING, description: "A placeholder or example booking link. (e.g., 'booking.com/hotel-name')" }
                },
                required: ["name", "type", "priceLevel", "rating", "description"]
            }
        },
        shoppingGuide: {
            type: Type.ARRAY,
            description: "A list of 3-5 unique shopping recommendations or local products to buy.",
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING, description: "Name of the product or souvenir." },
                    category: { type: Type.STRING, description: "Category of the item (e.g., 'Local Craft', 'Fashion', 'Food Souvenir')." },
                    description: { type: Type.STRING, description: "A brief description of the item." },
                    whereToBuy: { type: Type.STRING, description: "A suggestion of where to find this item (e.g., 'Local markets', 'Specific store name', 'A famous shopping street')." }
                },
                required: ["name", "category", "description", "whereToBuy"]
            }
        }
    },
    required: ["title", "summary", "dailyPlans", "accommodationSuggestions", "shoppingGuide"]
};


export const generateItinerary = async (preferences: UserPreferences): Promise<Itinerary> => {
    const { destination, days, interests, mood, budget, experienceType } = preferences;

    const prompt = `
        Create a detailed travel itinerary for a trip to ${destination} for ${days} days.
        The traveler's interests are: ${interests.join(', ')}.
        ${mood ? `The desired mood for the trip is ${mood}.` : ''}
        ${budget ? `The budget is ${budget}.` : ''}
        ${experienceType ? `They are interested in ${experienceType}.` : ''}

        Please provide the following in a structured JSON format:
        1.  A creative title for the trip.
        2.  A brief summary of the trip.
        3.  A detailed plan for each day, with a sequence of 3-5 activities per day. For each activity, include a name, a short description, a category, and a price level. Also, suggest one indoor alternative for each activity in case of bad weather.
        4.  A list of 3-5 accommodation suggestions that fit the specified budget. Include name, type, price level, rating (out of 5), and a short description.
        5.  A shopping guide with 3-5 recommendations for local products or souvenirs, including what they are and where to find them.
        
        Ensure the activities are logically sequenced and geographically clustered for each day to minimize travel time. The entire output must be a single JSON object that strictly follows the provided schema.
    `;

    try {
        // FIX: Use the correct method `ai.models.generateContent` and pass the model and configs.
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });

        // FIX: Extract text correctly from the response and parse it as JSON.
        const jsonText = response.text.trim();
        const itineraryData = JSON.parse(jsonText);
        
        // Basic validation
        if (!itineraryData.dailyPlans || !itineraryData.title) {
          throw new Error("Invalid itinerary format received from API.");
        }
        
        return itineraryData as Itinerary;

    } catch (error) {
        console.error("Error generating itinerary:", error);
        throw new Error("Failed to generate itinerary. The model may have returned an invalid response. Please try again.");
    }
};
