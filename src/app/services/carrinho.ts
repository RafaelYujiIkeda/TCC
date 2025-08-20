import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Produto } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private carrinho: Produto[] = [];

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
    this.carrinho = (await this.storage.get('carrinho')) || [];
  }

  async adicionar(produto: Produto) {
    this.carrinho.push(produto);
    await this.storage.set('carrinho', this.carrinho);
  }

  async getCarrinho(): Promise<Produto[]> {
    return this.carrinho;
  }

  async remover(produtoId: number) {
    this.carrinho = this.carrinho.filter(p => p.id !== produtoId);
    await this.storage.set('carrinho', this.carrinho);
  }

  async limpar() {
    this.carrinho = [];
    await this.storage.set('carrinho', []);
  }
}
