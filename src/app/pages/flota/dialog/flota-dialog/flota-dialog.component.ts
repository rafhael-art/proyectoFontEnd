import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Flota } from 'src/app/interfaces/flota';
import { Marca } from 'src/app/interfaces/marca';
import { FlotaService } from 'src/app/services/flota/flota.service';
import { MarcaService } from 'src/app/services/marca/marca.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-flota-dialog',
  templateUrl: './flota-dialog.component.html',
  styleUrls: ['./flota-dialog.component.css']
})
export class FlotaDialogComponent {
  public registerForm!: FormGroup;
  marcas: Marca[] = [];
  constructor(
    public dialogRef: MatDialogRef<FlotaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public flota: Flota,
    private flotaService: FlotaService,
    private marcaService: MarcaService
  ) { }


  ngOnInit(): void {

    this.marcaService.cargarMarcas().subscribe(res => this.marcas = res);
    this.registerForm = new FormGroup({
      id: new FormControl(this.flota ? this.flota.id : 0),
      tipo_flota: new FormControl(this.flota ? this.flota.tipo_flota : ''),
      desc_flota: new FormControl(this.flota ? this.flota.desc_flota : ''),
      img_flota: new FormControl(this.flota ? this.flota.img_flota : ''),
      marcaId: new FormControl(this.flota ? this.flota.marcaId : 0),
    })
  }

  close() {
    this.dialogRef.close(false);
  }

  add() {
    this.flotaService.add(this.registerForm.value).subscribe(res => {
      Swal.fire(
        'Flota agregada',
        `${this.registerForm.get('desc_flota')?.value} fué registrado correctamente`,
        'success'
      );
      this.dialogRef.close(true);
    })
  }

  edit() {
    this.flotaService.edit(this.registerForm.value).subscribe(res => {
      Swal.fire(
        'Flota editada',
        `${this.registerForm.get('desc_flota')?.value} fué modificado correctamente`,
        'success'
      );
      this.dialogRef.close(true);
    })
  }
}
