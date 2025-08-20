import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Mensagem {
  texto: string;
  data: Date;
  enviadaPorUsuario: boolean;
}

@Component({
  selector: 'app-tab7',
  templateUrl: 'tab7.page.html',
  styleUrls: ['tab7.page.scss'],
  standalone: false
})
export class Tab7Page implements OnInit {
  mensagens: Mensagem[] = [];
  novaMensagem: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.mensagens = [
      { texto: 'Olá! Como posso ajudar você hoje?', data: new Date(), enviadaPorUsuario: false }
    ];
  }

  enviarMensagem() {
    if (this.novaMensagem.trim()) {
      this.mensagens.push({
        texto: this.novaMensagem,
        data: new Date(),
        enviadaPorUsuario: true
      });
      this.novaMensagem = ''; // Clear the input after sending
      // Simulate a response
      setTimeout(() => {
        this.mensagens.push({
          texto: 'Obrigado pela mensagem! Estamos analisando.',
          data: new Date(),
          enviadaPorUsuario: false
        });
      }, 1000);
    }
  }

  irParaHome() {
    console.log('Navegar para Home');
  }

  abrirMenu() {
    console.log('Abrir menu');
  }
}
