import { Injectable } from '@angular/core';
import { Produto } from '../models/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private produtos: Produto[] = [];

  constructor() { 
    this.inserirProduto(new Produto("camiseta", 80));
    this.inserirProduto(new Produto("calça", 30));
  }
  
  public inserirProduto(produto : Produto) : boolean {
    this.produtos.push(produto);
    return true;
  }
  
  public getProdutos() : Produto[] {
    return this.produtos;
  }
  public getProduto(indice : number) : Produto {
    return this.produtos[indice];
  }
  public editarProduto(indice: number, produto : Produto) : boolean {
    this.produtos[indice] = produto
    //this.produtos[indice].setNome(produto.getNome());
    //this.produtos[indice].setPreco(produto.getPreco());
    return true;
  }
  public excluir(indice: number) : boolean {
    this.produtos.splice(indice, 1);
    return true;
  }
}
