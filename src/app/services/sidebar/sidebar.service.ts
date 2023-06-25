import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: any[] = [
    {
      titulo: 'Main',
      submenu: [
        {
          titulo: 'Home',
          url: '/dashboard',
          icono: 'ni ni-tv-2',
          color: 'text-blue-500'
        }
      ]
    },
    {
      titulo: 'Mantenimientos',
      submenu: [
        {
          titulo: 'Orden de reparacion',
          url: 'orden-reparacion',
          icono: 'ni ni-single-copy-04',
          color: 'text-orange-500'
        },
        {
          titulo: 'Cliente',
          url: 'cliente',
          icono: 'ni ni-single-copy-04',
          color: 'text-orange-500'
        },
        {
          titulo: 'Flota',
          url: 'flota',
          icono: 'ni ni-single-copy-04',
          color: 'text-orange-500'
        },
        {
          titulo: 'Marca',
          url: 'marca',
          icono: 'ni ni-single-copy-04',
          color: 'text-orange-500'
        },
        {
          titulo: 'Empleado',
          url: 'empleado',
          icono: 'ni ni-single-copy-04',
          color: 'text-orange-500'
        }

      ]
    }
  ]
}
