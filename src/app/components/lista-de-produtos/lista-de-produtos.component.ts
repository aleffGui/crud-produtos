import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from 'src/app/models/produto';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-lista-de-produtos',
  templateUrl: './lista-de-produtos.component.html',
  styleUrls: ['./lista-de-produtos.component.scss']
})
export class ListaDeProdutosComponent implements OnInit {

  public lista_produtos : Produto[] = [];

  ngOnInit(): void {
   this.lista_produtos = this.produtoService.getProdutos();
  }
  constructor(private router: Router, private produtoService: ProdutoService) {
    
  }
  public excluir(index : number) : void {
    let resultado = confirm("Deseja excluir o produto: " + this.produtoService.getProduto(index).getNome() + "?");
    if(resultado) {
      if(this.produtoService.excluir(index)) {
        alert("Produto excluído com sucesso!")
      } else {
        alert("Erro ao excluir produto!");
      }
    }
  }
  public editar(indice : number) : void {
    this.router.navigate(['/editarProduto', indice])
  }
  public irParaCriarProduto() : void {
    this.router.navigate(['/criarProduto']);
  }
}
