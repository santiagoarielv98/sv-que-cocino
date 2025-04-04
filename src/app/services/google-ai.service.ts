import { Injectable } from '@angular/core';
import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GoogleAiService {
  private genAI = new GoogleGenerativeAI(environment.GOOGLE_GENERATIVE_AI_API_KEY);
  private model: GenerativeModel;

  constructor() {
    this.model = this.genAI.getGenerativeModel({ model: environment.GOOGLE_GENERATIVE_AI_MODEL });
  }

  async generateContent(prompt: string): Promise<string> {
    try {
      const result = await this.model.generateContent([prompt]);
      return result.response.text();
    } catch (error) {
      console.error('Error generating text:', error);
      throw error;
    }
  }
}
