import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Empleado } from 'src/app/interfaces/empleado';
import { EmpleadoService } from 'src/app/services/empleado/empleado.service';
import Swal from 'sweetalert2';
import { EmpleadoDialogComponent } from './dialog/empleado-dialog/empleado-dialog.component';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent {
  public usuarios: Empleado[] = [];
  public cargando = true;

  constructor(private usuarioService: EmpleadoService,
    public dialog: MatDialog) { }
  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuarios = [];
    this.cargando = true;
    this.usuarioService.cargarEmpleados()
      .subscribe(resp => {
        this.usuarios = resp
        this.cargando = false;
      });
  }
  cambiarPagina(valor: number) {


  }

  getPaginationData(event: PageEvent): PageEvent {

    return event;
  }

  buscar(termino: string) {
    this.cargarUsuarios();
  }



  openAdd() {
    const dialogRef = this.dialog.open(EmpleadoDialogComponent, {
      width: '400px',
      disableClose: false,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarUsuarios();
      }
    })
  }

  openEdit(usuario: Empleado) {
    debugger;
    this.usuarioService.getEmpleado(usuario.id)
      .subscribe({
        next: ((data) => {
          debugger
          usuario.password = data.password
          const dialogRef = this.dialog.open(EmpleadoDialogComponent, {
            disableClose: false,
            width: '400px',
            data: usuario
          }).afterClosed().subscribe(result => {
            if (result) {
              this.cargarUsuarios();
            }
          });
        })
      });
  }

  eliminarUsuario(usuario: Empleado) {
    Swal.fire({
      title: '¿Borrar usuario?',
      text: `Esta apunto de borrar a ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarEmpleado(usuario)
          .subscribe(resp => {
            Swal.fire(
              'Usuario borrado',
              `${usuario.nombre} fué borrado correctamente`,
              'success'
            );
            this.cargarUsuarios();
          }
          );
      }
    })
  }
}
