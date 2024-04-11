import { Component, OnInit } from '@angular/core';
import { Contato } from './contato';
import { ContatoService } from '../contato.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ContatoDetalheComponent } from '../contato-detalhe/contato-detalhe/contato-detalhe.component';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit{

  formulario!: FormGroup;
  contatos: Contato[] = []
  colunas: string[] = ['foto', 'id', 'nome', 'email', 'favorito'];
  dataSource = this.contatos;
  totalElementos = 0;
  pagina = 0
  tamanho = 10
  pageSizeOptions : number[] = [10]
  
  constructor(private service: ContatoService, private fb: FormBuilder, private dialog: MatDialog, private snackBar: MatSnackBar){}
  
  ngOnInit(): void {
   this.montarFormulario();
  }

  montarFormulario(){
   this.listar(this.pagina, this.tamanho); 
   this.formulario = this.fb.group({
   nome: ['', Validators.required],
   email: ['', [Validators.required,Validators.email]]
   })
  }

  favoritar(contato:Contato){
    this.service.favorite(contato).subscribe(Response => {
      contato.favorito = !contato.favorito;
    })
  }

 submit(){
   const formValues = this.formulario.value;
   const contato: Contato = new Contato(formValues.nome, formValues.email);
   this.service.save(contato).subscribe(response => {
     //let lista: Contato[] = [...this.contatos, response]
     this.listar();
     this.snackBar.open('Contato foi adicionado', 'Sucesso!', {
      duration: 2000
     })
     this.formulario.reset();
      })
    }

    listar(pagina: number = 0, tamanho: number = 10){
      this.service.findAll(pagina, tamanho).subscribe(Response=> {
        this.contatos = Response.content;
        this.totalElementos = Response.totalElements;
        this.pagina = Response.number;
      })
    }

    paginar(event: PageEvent){
      this.pagina = event.pageIndex;
      this.listar(this.pagina, this.tamanho);
    }

    uploadPhoto(event: any, contato: Contato){
      const files = event.target.files;
      if(files){
        const foto = files[0];
        const formData = new FormData();
        formData.append("foto", foto);
        this.service.upload(contato, formData).subscribe(response => this.listar());
      }
    }

    visualizarContato(contato: Contato){
      this.dialog.open( ContatoDetalheComponent, {
        width: '400px',
        height: '450px',
        data: contato
      })
    }
}
