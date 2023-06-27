import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { OrdenReparacionService } from 'src/app/services/ordenReparacion/orden-reparacion.service';
import { OrdenReparacionDialogComponent } from './dialog/orden-reparacion-dialog/orden-reparacion-dialog.component';
import Swal from 'sweetalert2';
import { OrdenReparacion } from 'src/app/interfaces/orden-reparacion';
import { Cliente } from 'src/app/interfaces/cliente';
import * as moment from 'moment';
@Component({
  selector: 'app-orden-reparacion',
  templateUrl: './orden-reparacion.component.html',
  styleUrls: ['./orden-reparacion.component.css']
})
export class OrdenReparacionComponent {
  ngOnInit(): void {

    this.cargarFlotas();
  }

  getFecha(fecha: any) {
    return moment(fecha).format("DD/MM/YYYY")
  }

  constructor(
    private dialog: MatDialog,
    private ordenReparacionService: OrdenReparacionService,
  ) { }
  flotas: OrdenReparacion[] = [];

  cargando = true;

  openEdit(flota: OrdenReparacion) {
    this.dialog.open(OrdenReparacionDialogComponent, {
      disableClose: false,
      width: '1000px',
      data: flota
    }).afterClosed().subscribe(result => {
      if (result) {
        this.cargarFlotas();
      }
    });
  }
  eliminarFlota(flota: OrdenReparacion) {
    Swal.fire({
      title: '¿Borrar marca?',
      text: `Esta apunto de borrar a ${flota.numero}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ordenReparacionService.delete(flota)
          .subscribe(resp => {
            Swal.fire(
              'Orden Reparación borrado',
              `${flota.numero} fué borrado correctamente`,
              'success'
            );
            this.cargarFlotas();
          }
          );
      }
    })
  }

  openAdd() {
    this.dialog.open(OrdenReparacionDialogComponent, {
      disableClose: false,
      width: '1000px',
    }).afterClosed().subscribe(result => {
      if (result) {
        this.cargarFlotas();
      }
    });
  }

  cargarFlotas() {
    this.cargando = true;
    this.flotas = [];
    this.ordenReparacionService.getAll().subscribe(res => this.flotas = res);
    this.cargando = false;
  }
}
