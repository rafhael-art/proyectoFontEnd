import { Component, Inject } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { Cliente } from 'src/app/interfaces/cliente';
import { Flota } from 'src/app/interfaces/flota';
import { OrdenReparacion } from 'src/app/interfaces/orden-reparacion';
import { OrdenReparacionDetalle } from 'src/app/interfaces/orden-reparacion-detalle';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { FlotaService } from 'src/app/services/flota/flota.service';
import { OrdenReparacionService } from 'src/app/services/ordenReparacion/orden-reparacion.service';
import Swal from 'sweetalert2';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'app-orden-reparacion-dialog',
  templateUrl: './orden-reparacion-dialog.component.html',
  styleUrls: ['./orden-reparacion-dialog.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class OrdenReparacionDialogComponent {
  public registerForm!: FormGroup;
  public registerFormdet!: FormGroup;
  public detalle: OrdenReparacionDetalle[] = [];
  public cabecera = {} as OrdenReparacion;
  clientes: Cliente[] = [];
  constructor(
    public dialogRef: MatDialogRef<OrdenReparacionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public ordenReparacion: OrdenReparacion,
    private clienteService: ClienteService,
    private ordenReparacionService: OrdenReparacionService,
  ) { }


  ngOnInit(): void {
    debugger
    this.clienteService.getAll().subscribe(res => this.clientes = res);

    this.registerForm = new FormGroup({
      idReparacion: new FormControl(this.ordenReparacion ? this.ordenReparacion.idReparacion : 0),
      descripcion: new FormControl(this.ordenReparacion ? this.ordenReparacion.descripcion : ''),
      clienteId: new FormControl(this.ordenReparacion ? this.ordenReparacion.clienteId : ''),
      fecha: new FormControl(this.ordenReparacion ? this.ordenReparacion.fecha : ''),
      total: new FormControl(this.ordenReparacion ? this.ordenReparacion.total : ''),
      numero: new FormControl(this.ordenReparacion ? this.ordenReparacion.numero : '')
    })

    this.registerFormdet = new FormGroup({
      nombre: new FormControl(''),
      cantidad: new FormControl(''),
      precioUnitario: new FormControl(''),
      igv: new FormControl(''),
      subtotal: new FormControl(''),
      reparacionId: new FormControl(''),
    });
    if (this.ordenReparacion)
      this.ordenReparacionService.getDetail(this.ordenReparacion).subscribe(res => this.detalle = res);
  }

  cargar() {

  }

  close() {
    this.dialogRef.close(false);
  }

  add() {
    if (this.detalle.length == 0) {
      Swal.fire(
        'Ingrese Detalle',
        `La OR ${this.registerForm.get('numero')?.value} no tiene detalle`,
        'error'
      );
    }


    this.cabecera = this.registerForm.value;
    this.cabecera.detalles = this.detalle;
    let total = this.detalle.reduce((acumulador, actual) => acumulador + actual.subtotal, 0)
    this.cabecera.total = total;
    this.ordenReparacionService.add(this.cabecera).subscribe(res => {
      Swal.fire(
        'Orden de Reparación agregado',
        `${this.registerForm.get('numero')?.value} fué registrado correctamente`,
        'success'
      );
      this.dialogRef.close(true);
    })
  }

  edit() {
    debugger
    if (this.detalle.length == 0) {
      Swal.fire(
        'Ingrese Detalle',
        `La OR ${this.registerForm.get('numero')?.value} no tiene detalle`,
        'error'
      );
      return;
    }
    this.cabecera = this.registerForm.value;
    // this.cabecera.fecha = moment(this.ordenReparacion.fecha, "DD/MM/YYYY").date();
    this.cabecera.detalles = this.detalle;
    let total = this.detalle.reduce((acumulador, actual) => acumulador + actual.subtotal, 0)
    this.cabecera.total = total;
    this.ordenReparacionService.edit(this.cabecera).subscribe(res => {
      Swal.fire(
        'Orden de Reparación editado',
        `${this.registerForm.get('numero')?.value} fué modificado correctamente`,
        'success'
      );
      this.dialogRef.close(true);
    })
  }
  eliminarDet(index: number) {
    this.detalle.splice(index, 1);
    let total = this.detalle.reduce((acumulador, actual) => acumulador + actual.subtotal, 0)
    this.registerForm.patchValue({
      total: total
    })
  }
  AgregarDetalle() {
    let detalle = {} as OrdenReparacionDetalle;
    detalle = this.registerFormdet.value;
    detalle.subtotal = detalle.precioUnitario * detalle.cantidad;
    detalle.igv = 0;
    detalle.reparacionId = 0;
    this.detalle.push(this.registerFormdet.value);

    this.registerFormdet.patchValue({
      nombre: '',
      cantidad: 0,
      precioUnitario: 0,
      igv: 0,
      subtotal: 0,
      reparacionId: 0,
    });
    let total = this.detalle.reduce((acumulador, actual) => acumulador + actual.subtotal, 0)
    this.registerForm.patchValue({
      total: total
    })
  }
}
