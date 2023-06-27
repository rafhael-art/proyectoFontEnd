import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ClienteComponent } from './cliente/cliente.component';
import { EmpleadoComponent } from './empleado/empleado.component';
import { FlotaComponent } from './flota/flota.component';
import { MarcaComponent } from './marca/marca.component';
import { PagesComponent } from './pages.component';
import { OrdenReparacionComponent } from './orden-reparacion/orden-reparacion.component';
import { AuthGuard } from '../guards/auth.guard';



const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: MainComponent, data: { titulo: 'Main', subTitulo: 'Bienvenido' } },
      //{ path: 'account-settings', component: AccountSettingsComponent , data: { titulo: 'Ajustes', subTitulo: 'Usuario' } },
      { path: 'cliente', component: ClienteComponent, data: { titulo: 'Mantenimiento', subTitulo: 'Clientes' } },
      { path: 'empleado', component: EmpleadoComponent, data: { titulo: 'Mantenimiento', subTitulo: 'Empleados' } },
      { path: 'flota', component: FlotaComponent, data: { titulo: 'Mantenimiento', subTitulo: 'Flotas' } },
      { path: 'cliente', component: ClienteComponent, data: { titulo: 'Mantenimiento', subTitulo: 'Clientes' } },
      { path: 'marca', component: MarcaComponent, data: { titulo: 'Mantenimiento', subTitulo: 'Marcas' } },
      { path: 'orden-reparacion', component: OrdenReparacionComponent, data: { titulo: 'Mantenimiento', subTitulo: 'Orden de Reparación' } }

      //matenimientos




    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PagesRountingModule {

}
