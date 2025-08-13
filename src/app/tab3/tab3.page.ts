import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonContent } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { GeminiService } from '../services/gemini.service';

interface Mensagem {
  texto: string;
  enviada: boolean;
}

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page implements OnInit {
  @ViewChild(IonContent) content: IonContent | undefined;

  mensagens: Mensagem[] = [];
  chatForm: FormGroup;
  private storage: Storage | null = null;

  constructor(
    private fb: FormBuilder,
    private storageService: Storage,
    private geminiService: GeminiService
  ) {
    this.chatForm = this.fb.group({
      mensagem: ['', Validators.required]
    });
  }

  async ngOnInit() {
    this.storage = await this.storageService.create();
    await this.carregarMensagens();

    if (this.mensagens.length === 0) {
      this.mensagens.push({ texto: 'Olá! Bem-vindo ao TrendFy. Como posso ajudar com tendências hoje?', enviada: false });
      await this.salvarMensagens();
    }
  }

  async sendPrompt() {
    if (this.chatForm.valid) {
      const mensagem = this.chatForm.get('mensagem')?.value;
      this.mensagens.push({ texto: mensagem, enviada: true });
      await this.salvarMensagens();

      try {
        const resposta = await this.geminiService.generateContent(mensagem);
        this.mensagens.push({ texto: resposta, enviada: false });
      } catch (error) {
        console.error('Erro no componente:', error);
        this.mensagens.push({ texto: 'Erro ao obter resposta da API.', enviada: false });
      }

      await this.salvarMensagens();
      this.chatForm.reset();

      setTimeout(() => this.content?.scrollToBottom(300), 100);
    }
  }

  private async carregarMensagens() {
    const mensagensSalvas = await this.storage?.get('chatMensagens');
    if (mensagensSalvas) {
      this.mensagens = mensagensSalvas;
    }
  }

  private async salvarMensagens() {
    await this.storage?.set('chatMensagens', this.mensagens);
  }

  async limparMensagens() {
    this.mensagens = []; // Limpa o array
    await this.storage?.remove('chatMensagens'); // Remove do armazenamento
    // Opcional: Adicionar uma mensagem de confirmação
    this.mensagens.push({ texto: 'Histórico de chat limpo às 01:35 PM -03, 13/08/2025.', enviada: false });
    await this.salvarMensagens();
    setTimeout(() => this.content?.scrollToBottom(300), 100);
  }
}
