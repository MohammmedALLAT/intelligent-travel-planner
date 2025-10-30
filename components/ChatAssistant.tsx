import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import type { Itinerary } from '../types';

interface ChatAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  itinerary: Itinerary;
  destination: string;
}

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const ChatAssistant: React.FC<ChatAssistantProps> = ({ isOpen, onClose, itinerary, destination }) => {
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const initialItineraryJson = JSON.stringify(itinerary, null, 2);
      const initialContext = `You are a helpful travel concierge. The user is planning a trip to ${destination}. Their current itinerary is: \n\n${initialItineraryJson}\n\nAnswer their questions about the trip, suggest modifications, or provide more details about locations. Keep your responses concise and helpful.`;

      const chatSession = ai.chats.create({
        model: 'gemini-2.5-flash',
        history: [
          { role: 'user', parts: [{ text: initialContext }] },
          { role: 'model', parts: [{ text: `Of course! I've reviewed your plan for ${destination}. How can I help you make this trip even better?` }] }
        ]
      });
      setChat(chatSession);
      setMessages([{ role: 'model', text: `Of course! I've reviewed your plan for ${destination}. How can I help you make this trip even better?` }]);
    }
  }, [isOpen, itinerary, destination]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || !chat || isLoading) return;

    const userMessage: Message = { role: 'user', text: userInput };
    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      const response = await chat.sendMessage({ message: userInput });
      const modelMessage: Message = { role: 'model', text: response.text };
      setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = { role: 'model', text: "Sorry, I encountered an error. Please try again." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-end justify-center sm:items-center" onClick={onClose}>
      <div 
        className="bg-white dark:bg-slate-800 w-full max-w-lg h-[80vh] sm:h-auto sm:max-h-[80vh] rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <header className="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center flex-shrink-0">
          <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100">AI Local Concierge</h3>
          <button onClick={onClose} className="p-1 rounded-full text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700">&times;</button>
        </header>
        <main className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs md:max-w-md p-3 rounded-2xl ${msg.role === 'user' ? 'bg-sky-500 text-white rounded-br-lg' : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-bl-lg'}`}>
                <p className="text-sm" style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-xs md:max-w-md p-3 rounded-2xl bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-bl-lg">
                  <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-slate-500 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-slate-500 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                      <div className="w-2 h-2 bg-slate-500 rounded-full animate-pulse [animation-delay:0.4s]"></div>
                  </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </main>
        <footer className="p-4 border-t border-slate-200 dark:border-slate-700 flex-shrink-0">
          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <input
              type="text"
              value={userInput}
              onChange={e => setUserInput(e.target.value)}
              placeholder="Ask about your trip..."
              className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-sky-500 focus:border-sky-500 transition"
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading || !userInput.trim()} className="px-4 py-2 bg-sky-600 text-white font-semibold rounded-md hover:bg-sky-700 disabled:bg-sky-400 disabled:cursor-not-allowed">Send</button>
          </form>
        </footer>
      </div>
    </div>
  );
};
