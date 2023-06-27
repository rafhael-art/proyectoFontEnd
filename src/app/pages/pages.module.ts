import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { MainComponent } from './main/main.component';
import { ClienteComponent } from './cliente/cliente.component';
import { EmpleadoComponent } from './empleado/empleado.component';
import { FlotaComponent } from './flota/flota.component';
import { MarcaComponent } from './marca/marca.component';
import { OrdenReparacionComponent } from './orden-reparacion/orden-reparacion.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
//import { MomentDateModule } from "@angular/material-moment-adapter";
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmpleadoDialogComponent } from './empleado/dialog/empleado-dialog/empleado-dialog.component';
import { MarcaDialogComponent } from './marca/dialog/marca-dialog/marca-dialog.component';
import { FlotaDialogComponent } from './flota/dialog/flota-dialog/flota-dialog.component';
import { ClienteDialogComponent } from './cliente/dialog/cliente-dialog/cliente-dialog.component';
import { OrdenReparacionDialogComponent } from './orden-reparacion/dialog/orden-reparacion-dialog/orden-reparacion-dialog.component';
import { MatDividerModule } from '@angular/material/divider';
import { OrdenReparacionDetDialogComponent } from './orden-reparacion/dialog/orden-reparacion-det-dialog/orden-reparacion-det-dialog.component';
import { MomentDateModule } from '@angular/material-moment-adapter';
import locale from "@angular/common/locales/es-PE";
import { registerLocaleData } from "@angular/common";
registerLocaleData(locale);
@NgModule({
  declarations: [
    PagesComponent,
    MainComponent,
    ClienteComponent,
    EmpleadoComponent,
    FlotaComponent,
    MainComponent,
    MarcaComponent,
    OrdenReparacionComponent,
    EmpleadoDialogComponent,
    MarcaDialogComponent,
    FlotaDialogComponent,
    ClienteDialogComponent,
    OrdenReparacionDialogComponent,
    OrdenReparacionDetDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MomentDateModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDividerModule
  ],
  exports: [
    PagesComponent,
    MainComponent
  ]

})
export class PagesModule { }
