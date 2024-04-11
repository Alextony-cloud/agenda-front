import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Contato } from 'src/app/contato/contato';

@Component({
  selector: 'app-contato-detalhe',
  templateUrl: './contato-detalhe.component.html',
  styleUrls: ['./contato-detalhe.component.css']
})
export class ContatoDetalheComponent {

  constructor(public dialogRef: MatDialogRef<ContatoDetalheComponent>, @Inject(MAT_DIALOG_DATA) public contato: Contato){}

  fechar(){
    this.dialogRef.close();
  }
}
