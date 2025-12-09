

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, Bot, Headset } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Bonjour ! Je suis l\'assistant MadaDrive. Je peux vous aider à trouver un véhicule ou répondre à vos questions sur la location à Madagascar. Si vous souhaitez parler à un agent, tapez "live".',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // INTERCEPT "LIVE" KEYWORD
    if (input.toLowerCase().trim() === 'live') {
         setTimeout(() => {
             const botMessage: ChatMessage = {
                id: (Date.now() + 1).toString(),
                role: 'model',
                text: "Je vous mets immédiatement en relation avec un agent humain... \n\n(Simulation : Un conseiller a été notifié. Veuillez ouvrir un ticket dans le Dashboard Support si l'attente est trop longue.)",
                timestamp: new Date()
             };
             setMessages(prev => [...prev, botMessage]);
             setIsLoading(false);
         }, 1000);
         return;
    }

    const responseText = await sendMessageToGemini(messages, input);

    const botMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMessage]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 ${
          isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100 bg-primary-600 hover:bg-primary-700 text-white'
        }`}
      >
        <MessageSquare size={28} />
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 z-50 w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col transition-all duration-300 origin-bottom-right overflow-hidden ${
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'
        }`}
        style={{ height: '500px', maxHeight: '80vh' }}
      >
        {/* Header */}
        <div className="bg-secondary-900 p-4 flex justify-between items-center text-white">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-primary-500 rounded-lg">
              <Bot size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Assistant MadaDrive</h3>
              <p className="text-xs text-gray-300 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full inline-block animate-pulse"></span>
                En ligne 24/7
              </p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 scrollbar-hide">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                  msg.role === 'user'
                    ? 'bg-primary-600 text-white rounded-br-none'
                    : 'bg-white text-gray-800 border border-gray-200 shadow-sm rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white p-3 rounded-2xl rounded-bl-none border border-gray-200 shadow-sm">
                <Loader2 size={16} className="animate-spin text-primary-600" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-100">
          <div className="flex items-center space-x-2 bg-gray-100 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-primary-500 transition-all">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Posez une question ou tapez 'live'..."
              className="flex-1 bg-transparent border-none focus:outline-none text-sm text-gray-800 placeholder-gray-500"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className={`p-2 rounded-full transition-colors ${
                input.trim() ? 'text-primary-600 hover:bg-primary-50' : 'text-gray-400'
              }`}
            >
              <Send size={18} />
            </button>
          </div>
          <div className="text-center mt-2 flex justify-center gap-4">
             <span className="text-[10px] text-gray-400">Propulsé par Google Gemini</span>
             <button onClick={() => { setInput('live'); handleSend(); }} className="text-[10px] text-primary-600 font-bold hover:underline flex items-center gap-1">
                 <Headset size={10}/> Parler à un humain
             </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBot;