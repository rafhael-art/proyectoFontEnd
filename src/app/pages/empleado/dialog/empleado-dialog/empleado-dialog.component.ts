import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Empleado } from 'src/app/interfaces/empleado';
import { EmpleadoService } from 'src/app/services/empleado/empleado.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empleado-dialog',
  templateUrl: './empleado-dialog.component.html',
  styleUrls: ['./empleado-dialog.component.css']
})
export class EmpleadoDialogComponent implements OnInit {
  public registerForm!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<EmpleadoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public empleado: Empleado,
    private empleadoService: EmpleadoService
  ) { }


  ngOnInit(): void {
    this.registerForm = new FormGroup({
      id: new FormControl(this.empleado ? this.empleado.id : 0),
      nombre: new FormControl(this.empleado ? this.empleado.nombre : ''),
      codigoEmpleado: new FormControl(this.empleado ? this.empleado.codigoEmpleado : ''),
      password: new FormControl(this.empleado ? this.empleado.password : ''),
      token: new FormControl(this.empleado ? this.empleado.token : ''),
    })
  }

  close() {
    this.dialogRef.close(false);
  }

  add() {
    this.empleadoService.add(this.registerForm.value).subscribe(res => {
      Swal.fire(
        'Categoria agregada',
        `${this.registerForm.get('nombre')?.value} fué registrado correctamente`,
        'success'
      );
      this.dialogRef.close(true);
    })
  }

  edit() {
    this.empleadoService.edit(this.registerForm.value).subscribe(res => {
      Swal.fire(
        'Categoria agregada',
        `${this.registerForm.get('nombre')?.value} fué modificado correctamente`,
        'success'
      );
      this.dialogRef.close(true);
    })
  }


}
