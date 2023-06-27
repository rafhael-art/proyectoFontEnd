import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrdenReparacionDetalle } from 'src/app/interfaces/orden-reparacion-detalle';

@Component({
  selector: 'app-orden-reparacion-det-dialog',
  templateUrl: './orden-reparacion-det-dialog.component.html',
  styleUrls: ['./orden-reparacion-det-dialog.component.css']
})
export class OrdenReparacionDetDialogComponent {
  public registerForm!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<OrdenReparacionDetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public ordenReparaciondet: OrdenReparacionDetalle,
  ) { }


  ngOnInit(): void {
    this.registerForm = new FormGroup({
      nombre: new FormControl(this.ordenReparaciondet ? this.ordenReparaciondet.nombre : 0),
      cantidad: new FormControl(this.ordenReparaciondet ? this.ordenReparaciondet.cantidad : ''),
      precioUnitario: new FormControl(this.ordenReparaciondet ? this.ordenReparaciondet.precioUnitario : 0),
      igv: new FormControl(this.ordenReparaciondet ? this.ordenReparaciondet.igv : 0),
      subtotal: new FormControl(this.ordenReparaciondet ? this.ordenReparaciondet.subtotal : 0),
      reparacionId: new FormControl(this.ordenReparaciondet ? this.ordenReparaciondet.reparacionId : 0)
    })
  }

  close() {
    this.dialogRef.close(this.registerForm.value);
  }

  add() {
    this.dialogRef.close(this.registerForm.value);
  }

  edit() {
    this.dialogRef.close(this.registerForm.value);
  }
}
