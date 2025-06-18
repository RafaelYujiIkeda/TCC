import { Injectable } from '@angular/core';
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    // Inicialize o cliente com a chave da API
    this.genAI = new GoogleGenerativeAI(environment.geminiApiKey);
    // Use um modelo válido, como 'gemini-1.5-pro'
    this.model = this.genAI.getGenerativeModel({
      model: 'gemini-1.5-flash', // Modelo atual e amplamente disponível
      generationConfig: {
        temperature: 0.9,
        topP: 1,
        topK: 32,
        maxOutputTokens: 100
      },
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE
        }
      ]
    });
  }

  async generateContent(prompt: string): Promise<string> {
    console.log('Enviando prompt:', prompt);
    try {
      const result = await this.model.generateContent(prompt);
      console.log('Resposta bruta:', result);
      const response = await result.response;
      console.log('Resposta final:', response);
      return response.text();
    } catch (error) {
      console.error('Erro ao chamar a API do Gemini:', error);
      throw error;
    }
  }
}
