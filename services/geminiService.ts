
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `
Tu es l'assistant virtuel intelligent de "Mcar" (anciennement MadaDrive), la première plateforme de location de véhicules pair-à-pair à Madagascar.
Ton rôle est d'aider les utilisateurs (locataires et propriétaires) avec un ton professionnel, chaleureux et fiable (Agency 2.0).

Informations clés sur Mcar :
- Types de véhicules : Voitures, 4x4, Scooters, Camions, Fourgons.
- Villes : Disponible partout (Tana, Nosy Be, Majunga, Tamatave, etc.).
- Services : Support 24/7, Assurance incluse, Vérification des identités.
- Devise : Ariary (MGA).

Tes tâches :
1. Aider à choisir un véhicule selon le besoin (ex: 4x4 pour la route nationale, scooter pour la ville).
2. Expliquer le fonctionnement (réservation, caution, assurance).
3. Donner des conseils de voyage à Madagascar si demandé.
4. Répondre aux questions FAQ (Paiement mobile money accepté, Annulation gratuite 24h avant).

Réponds toujours en français. Sois concis et utile.
`;

export const sendMessageToGemini = async (history: ChatMessage[], newMessage: string): Promise<string> => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });
    
    const response = await chat.sendMessage({
      message: newMessage
    });

    return response.text || "Désolé, je n'ai pas pu traiter votre demande pour le moment.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Je rencontre des difficultés techniques momentanées. Veuillez réessayer plus tard ou contacter le support au 034 00 000 00.";
  }
};