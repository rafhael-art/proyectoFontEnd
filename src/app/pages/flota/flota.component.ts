import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Flota } from 'src/app/interfaces/flota';
import { FlotaDialogComponent } from './dialog/flota-dialog/flota-dialog.component';
import { FlotaService } from 'src/app/services/flota/flota.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-flota',
  templateUrl: './flota.component.html',
  styleUrls: ['./flota.component.css']
})
export class FlotaComponent implements OnInit {
  ngOnInit(): void {
    this.cargarFlotas();
  }

  constructor(
    private dialog: MatDialog,
    private flotaService: FlotaService
  ) { }
  flotas: Flota[] = [];
  cargando = true;

  openEdit(flota: Flota) {
    this.dialog.open(FlotaDialogComponent, {
      disableClose: false,
      width: '400px',
      data: flota
    }).afterClosed().subscribe(result => {
      if (result) {
        this.cargarFlotas();
      }
    });
  }
  eliminarFlota(flota: Flota) {
    Swal.fire({
      title: '¿Borrar marca?',
      text: `Esta apunto de borrar a ${flota.desc_flota}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.flotaService.delete(flota)
          .subscribe(resp => {
            Swal.fire(
              'Flota borrado',
              `${flota.desc_flota} fué borrado correctamente`,
              'success'
            );
            this.cargarFlotas();
          }
          );
      }
    })
  }

  openAdd() {
    this.dialog.open(FlotaDialogComponent, {
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
    this.flotaService.getAll().subscribe(res => { this.flotas = res; this.cargando = false; });

  }
}
