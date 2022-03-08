import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from 'src/app/models/produto';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html',
  styleUrls: ['./editar-produto.component.scss']
})
export class EditarProdutoComponent implements OnInit {
  public nome: string | undefined;
  public preco: number | undefined;
  public indice: number = -1;
  public lista_produtos : Produto[] = [];
  constructor(private router: Router, private actRoute: ActivatedRoute, private produtoService: ProdutoService) { }

  ngOnInit(): void {
    this.actRoute.params.subscribe((parametros) => {
      if(parametros['indice']) {
        this.indice = parametros['indice']
        let produto = this.produtoService.getProduto(this.indice);
        this.nome = produto.getNome();
        this.preco = produto.getPreco();
      }
    });
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
    let produto = new Produto(this.nome, this.preco);
    if(this.produtoService.editarProduto(this.indice, produto)) {
      alert("Produto editado com sucesso!");
      this.router.navigate(["/listaDeProduto"]);
    } else {
      alert("Erro ao salvar Produto");
    }
    this.nome = undefined;
    this.preco = undefined;
  }
}
