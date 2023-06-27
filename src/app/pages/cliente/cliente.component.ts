import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClienteService } from '../../services/cliente/cliente.service';
import { Cliente } from 'src/app/interfaces/cliente';
import { ClienteDialogComponent } from './dialog/cliente-dialog/cliente-dialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent {
  ngOnInit(): void {
    this.cargarFlotas();
  }

  constructor(
    private dialog: MatDialog,
    private clienteService: ClienteService
  ) { }
  flotas: Cliente[] = [];
  cargando = true;

  openEdit(flota: Cliente) {
    this.dialog.open(ClienteDialogComponent, {
      disableClose: false,
      width: '400px',
      data: flota
    }).afterClosed().subscribe(result => {
      if (result) {
        this.cargarFlotas();
      }
    });
  }
  eliminarFlota(flota: Cliente) {
    Swal.fire({
      title: '¿Borrar marca?',
      text: `Esta apunto de borrar a ${flota.nom_cliente}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(flota)
          .subscribe(resp => {
            Swal.fire(
              'Flota borrado',
              `${flota.nom_cliente} fué borrado correctamente`,
              'success'
            );
            this.cargarFlotas();
          }
          );
      }
    })
  }

  openAdd() {
    this.dialog.open(ClienteDialogComponent, {
      disableClose: false,
      width: '400px',
    }).afterClosed().subscribe(result => {
      if (result) {
        this.cargarFlotas();
      }
    });
  }

  cargarFlotas() {
    this.cargando = true;
    this.flotas = [];
    this.clienteService.getAll().subscribe(res => { this.flotas = res; this.cargando = false; });

  }
}
