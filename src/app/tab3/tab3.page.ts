import { Component } from '@angular/core';
import { GeminiService } from '../services/gemini.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page {
  prompt: string = '';
  response: string = '';

  constructor(private geminiService: GeminiService) {}

  async sendPrompt() {
    if (this.prompt.trim()) {
      try {
        this.response = await this.geminiService.generateContent(this.prompt);
      } catch (error) {
        console.error('Erro no componente:', error);
        this.response = 'Erro ao obter resposta da API.';
      }
    } else {
      this.response = 'Por favor, digite um prompt válido.';
    }
  }
}
 