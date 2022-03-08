import { Component } from '@angular/core';
import { Produto } from './models/produto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public lista_produtos : Produto[] = [];
  public nome : string |undefined;
  public preco : number |undefined;
  public edicao : boolean = false;
  public indice: number = -1;
  constructor() {
    let produto = new Produto("camisa", 150);
    this.lista_produtos.push(produto);
    this.lista_produtos.push(new Produto("Camiseta", 30));
    this.lista_produtos.push(new Produto("Calça", 100));
  }
  public salvar() : void {
    if(!this.nome) {
      alert("Nome é Obrigatório!");
      return;
    }
    if(!this.preco) {
      alert("Preço é obrigatório!");
      return;
    }
    if(this.indice == -1) {
      let produto = new Produto(this.nome, this.preco);
      this.lista_produtos.push(produto);
      alert("Produto Cadastrado!");
    } else {
      this.lista_produtos[this.indice].setNome(this.nome);
      this.lista_produtos[this.indice].setPreco(this.preco);
      this.edicao = false;
      this.indice = -1;
      alert("Produto atualizado com sucesso!");
    }
    
    this.nome = undefined;
    this.preco = undefined;
  }
  public excluir(index : number) : void {
    this.lista_produtos.splice(index, 1);
    alert("Produto excluído com sucesso!");
  }
  public editar(index : number) : void {
    this.edicao = true
    this.indice = index;
    this.nome = this.lista_produtos[index].getNome();
    this.preco = this.lista_produtos[index].getPreco();
  }
}
