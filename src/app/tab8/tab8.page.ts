import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Produto {
  id: number;
  nome: string;
  preco: number;
  imagem: string;
}

@Component({
  selector: 'app-tab8',
  templateUrl: 'tab8.page.html',
  styleUrls: ['tab8.page.scss'],
  standalone: false
})
export class Tab8Page implements OnInit {
  secaoAtiva = 'produtos';
  produtos: Produto[] = [
    { id: 1, nome: 'Jaqueta Jeans', preco: 199.90, imagem: 'src\assets\lado-1-2108193131.jpg' },
    { id: 2, nome: 'Camiseta Branca', preco: 59.90, imagem: 'https://example.com/camiseta.jpg' },
    { id: 3, nome: 'Calça Jeans', preco: 149.90, imagem: 'https://example.com/calca.jpg' },
    { id: 4, nome: 'Vestido Preto', preco: 299.90, imagem: 'https://example.com/vestido.jpg' }
  ];
  produtosFiltrados: Produto[] = [...this.produtos]; // Inicializa com todos os produtos
  carrinho: Produto[] = [];
  filtroPreco: number = 500;

  constructor(private router: Router) {}

  ngOnInit() {
    // Não há chamada à API, os produtos são locais
  }

  adicionarAoCarrinho(produto: Produto) {
    this.carrinho.push({ ...produto }); // Adiciona uma cópia do produto ao carrinho
  }

  removerDoCarrinho(produtoId: number) {
    const index = this.carrinho.findIndex(item => item.id === produtoId);
    if (index !== -1) {
      this.carrinho.splice(index, 1); // Remove o item do carrinho
    }
  }

  calcularTotal(): number {
    return this.carrinho.reduce((total, item) => total + item.preco, 0);
  }

  irParaCheckout() {
    if (this.carrinho.length > 0) {
      this.router.navigate(['/checkout']); // Navega para a página de checkout
    }
  }

  irParaHome() {
    // Lógica para voltar à home (ajuste conforme necessário)
    console.log('Navegar para Home');
  }

  abrirMenu() {
    // Lógica para abrir o menu (depende da implementação do menu)
    console.log('Abrir menu');
  }

  onSegmentChange(event: any) {
    if (event.detail.value === 'busca') {
      this.aplicarFiltro(); // Aplica filtro ao mudar para a seção de busca
    }
  }

  buscarProdutos(event: any) {
    const termo = event.target.value.toLowerCase();
    this.produtosFiltrados = this.produtos.filter(produto =>
      produto.nome.toLowerCase().includes(termo)
    );
  }

  aplicarFiltro() {
    this.produtosFiltrados = this.produtos.filter(produto =>
      produto.preco <= this.filtroPreco
    );
  }
}
