import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Cliente } from 'src/app/interfaces/cliente';
import { Flota } from 'src/app/interfaces/flota';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { FlotaService } from 'src/app/services/flota/flota.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente-dialog',
  templateUrl: './cliente-dialog.component.html',
  styleUrls: ['./cliente-dialog.component.css']
})
export class ClienteDialogComponent {
  public registerForm!: FormGroup;
  flotas: Flota[] = [];
  constructor(
    public dialogRef: MatDialogRef<ClienteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public cliente: Cliente,
    private flotaService: FlotaService,
    private clienteService: ClienteService
  ) { }


  ngOnInit(): void {

    this.flotaService.getAll().subscribe(res => this.flotas = res);
    this.registerForm = new FormGroup({
      id: new FormControl(this.cliente ? this.cliente.id : 0),
      cod_cliente: new FormControl(this.cliente ? this.cliente.cod_cliente : ''),
      nom_cliente: new FormControl(this.cliente ? this.cliente.nom_cliente : ''),
      ape_cliente: new FormControl(this.cliente ? this.cliente.ape_cliente : ''),
      direc_cliente: new FormControl(this.cliente ? this.cliente.direc_cliente : ''),
      telef_cliente: new FormControl(this.cliente ? this.cliente.telef_cliente : ''),
      correo_cliente: new FormControl(this.cliente ? this.cliente.correo_cliente : ''),
      flotaId: new FormControl(this.cliente ? this.cliente.flotaId : 0)
    })
  }

  close() {
    this.dialogRef.close(false);
  }

  add() {
    this.clienteService.add(this.registerForm.value).subscribe(res => {
      Swal.fire(
        'Cliente agregado',
        `${this.registerForm.get('nom_cliente')?.value} fué registrado correctamente`,
        'success'
      );
      this.dialogRef.close(true);
    })
  }

  edit() {
    this.clienteService.edit(this.registerForm.value).subscribe(res => {
      Swal.fire(
        'Cliente editado',
        `${this.registerForm.get('nom_cliente')?.value} fué modificado correctamente`,
        'success'
      );
      this.dialogRef.close(true);
    })
  }
}
