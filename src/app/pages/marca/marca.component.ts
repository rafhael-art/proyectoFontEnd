import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Marca } from 'src/app/interfaces/marca';
import { MarcaService } from 'src/app/services/marca/marca.service';
import Swal from 'sweetalert2';
import { MarcaDialogComponent } from './dialog/marca-dialog/marca-dialog.component';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.css']
})
export class MarcaComponent {
  public marcas: Marca[] = [];
  public cargando = true;

  constructor(private marcaService: MarcaService,
    public dialog: MatDialog) { }
  ngOnInit(): void {
    this.cargarMarcas();
  }

  cargarMarcas() {
    this.marcaService.cargarMarcas()
      .subscribe(resp => {
        this.marcas = resp
        this.cargando = false;
      });
  }


  openAdd() {
    const dialogRef = this.dialog.open(MarcaDialogComponent, {
      width: '400px',
      disableClose: false,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarMarcas();
      }
    })
  }




  openEdit(marca: Marca) {
    
    this.marcaService.getMarca(marca.id)
      .subscribe({
        next: ((data) => {
          
          const dialogRef = this.dialog.open(MarcaDialogComponent, {
            disableClose: false,
            width: '400px',
            data: marca
          }).afterClosed().subscribe(result => {
            if (result) {
              this.cargarMarcas();
            }
          });
        })
      });
  }

  eliminarMarca(marca: Marca) {
    Swal.fire({
      title: '¿Borrar marca?',
      text: `Esta apunto de borrar a ${marca.nom_marca}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.marcaService.delete(marca)
          .subscribe(resp => {
            Swal.fire(
              'Usuario borrado',
              `${marca.nom_marca} fué borrado correctamente`,
              'success'
            );
            this.cargarMarcas();
          }
          );
      }
    })
  }
  
}
