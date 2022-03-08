import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Produto } from 'src/app/models/produto';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-criar-produto',
  templateUrl: './criar-produto.component.html',
  styleUrls: ['./criar-produto.component.scss']
})
export class CriarProdutoComponent implements OnInit {
  public formCadastrar: FormGroup;
  constructor(private router: Router, private produtoService: ProdutoService, private formBuilder : FormBuilder) { 
    this.formCadastrar = this.formBuilder.group({
      nome : ["", [Validators.required, Validators.minLength(5)]],
      preco: ["", [Validators.required]]
    })
  }

  ngOnInit(): void {
  }
  private validarFormulario() : void {
    for(let campos in this.formCadastrar.controls) {
      this.formCadastrar.controls[campos].markAllAsTouched();
    }
  }
  public submitForm() {
    this.validarFormulario();
    if(!this.formCadastrar.valid) {
      return;
    }
    this.salvar();
  }
  public salvar() : void {
    if(this.produtoService.inserirProduto(new Produto(this.formCadastrar.controls["nome"].value, this.formCadastrar.controls["preco"].value))) {
      alert("Produto salvo com sucesso!");
      this.router.navigate(["/listaDeProdutos", this.formCadastrar.controls["nome"].value, this.formCadastrar.controls["preco"].value])
    } else {
      alert("Erro ao salvar produto!");
    }
    
  }
}
