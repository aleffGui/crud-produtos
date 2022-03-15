import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from 'src/app/models/produto';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html',
  styleUrls: ['./editar-produto.component.scss']
})
export class EditarProdutoComponent implements OnInit {
  public formEditar: FormGroup;
  public indice: number = -1;
  public lista_produtos : Produto[] = [];
  constructor(private router: Router, private actRoute: ActivatedRoute, private produtoService: ProdutoService,private formBuilder : FormBuilder) { 
    this.formEditar = this.formBuilder.group({
      nome : ["", [Validators.required, Validators.minLength(5)]],
      preco: ["", [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.actRoute.params.subscribe((parametros) => {
      if(parametros['indice']) {
        this.indice = parametros['indice']
        let produto = this.produtoService.getProduto(this.indice);
        this.formEditar = this.formBuilder.group({
          nome : [produto.getNome(), [Validators.required, Validators.minLength(5)]],
          preco: [produto.getPreco(), [Validators.required]]
        })
      }
    });
  }
  public salvar() : void {
    let produto = new Produto(this.formEditar.controls["nome"].value, this.formEditar.controls["preco"].value);
    if(this.produtoService.editarProduto(this.indice, produto)) {
      alert("Produto editado com sucesso!");
      this.router.navigate(["/listaDeProduto"]);
    } else {
      alert("Erro ao salvar Produto");
    }
  }
  private validarFormulario() : void {
    for(let campos in this.formEditar.controls) {
      this.formEditar.controls[campos].markAllAsTouched();
    }
  }
  public submitForm() {
    this.validarFormulario();
    if(!this.formEditar.valid) {
      return;
    }
    this.salvar();
  }
}
