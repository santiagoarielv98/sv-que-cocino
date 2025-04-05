import { Injectable } from '@angular/core';
import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { environment } from '../../environments/environment';
import { GoogleGenAI } from '@google/genai';

@Injectable({
  providedIn: 'root',
})
export class GoogleAiService {
  ai = new GoogleGenAI({
    apiKey: environment.GOOGLE_GENERATIVE_AI_API_KEY,
  });

  genAI = new GoogleGenerativeAI(environment.GOOGLE_GENERATIVE_AI_API_KEY);
  model: GenerativeModel;

  constructor() {
    this.model = this.genAI.getGenerativeModel({
      model: environment.GOOGLE_GENERATIVE_AI_MODEL,
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
      },
    });
  }

  async generateContent(prompt: string): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
        model: environment.GOOGLE_GENERATIVE_AI_MODEL,
        contents: [prompt],
        config: {
          responseMimeType: 'application/json',
        },
      });

      return response.text!;
    } catch (error) {
      console.error('Error generating text:', error);
      throw error;
    }
    // try {
    //   const result = await this.model.generateContent([prompt]);
    //   return result.response.text();
    // } catch (error) {
    //   console.error('Error generating text:', error);
    //   throw error;
    // }
  }
}
