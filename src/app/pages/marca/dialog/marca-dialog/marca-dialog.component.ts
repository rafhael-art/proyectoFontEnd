import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Marca } from 'src/app/interfaces/marca';
import { MarcaService } from 'src/app/services/marca/marca.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-marca-dialog',
  templateUrl: './marca-dialog.component.html',
  styleUrls: ['./marca-dialog.component.css']
})
export class MarcaDialogComponent implements OnInit {
  public registerForm!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<MarcaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public marca: Marca,
    private marcaService: MarcaService
  ) { }


  ngOnInit(): void {
    this.registerForm = new FormGroup({
      id: new FormControl(this.marca ? this.marca.id : 0),
      nom_marca: new FormControl(this.marca ? this.marca.nom_marca : ''),

    })
  }

  close() {
    this.dialogRef.close(false);
  }

  add() {
    this.marcaService.add(this.registerForm.value).subscribe(res => {
      Swal.fire(
        'Marca agregada',
        `${this.registerForm.get('marca')?.value} fué registrado correctamente`,
        'success'
      );
      this.dialogRef.close(true);
    })
  }

  edit() {
    this.marcaService.edit(this.registerForm.value).subscribe(res => {
      Swal.fire(
        'Marca editada',
        `${this.registerForm.get('nom_marca')?.value} fué modificado correctamente`,
        'success'
      );
      this.dialogRef.close(true);
    })
  }
}
