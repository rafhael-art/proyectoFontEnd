import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrdenReparacion } from 'src/app/interfaces/orden-reparacion';
import { environment } from 'src/enviroments/environments';
import { AuthService } from '../auth/auth.service';
import { OrdenReparacionDetalle } from 'src/app/interfaces/orden-reparacion-detalle';
const base_url = environment.base_url_orden;
@Injectable({
  providedIn: 'root'
})
export class OrdenReparacionService {

  constructor(private http: HttpClient,
    private authService: AuthService) { }

  getAll(): Observable<OrdenReparacion[]> {
    return this.http.get<OrdenReparacion[]>(`${base_url}/GetReparaciones`)
  }

  add(flota: OrdenReparacion): Observable<OrdenReparacion> {
    debugger;
    flota.empleadoId = this.authService.usuario.id;
    return this.http.post<OrdenReparacion>(`${base_url}/CreateReparacion`, flota);
  }

  edit(flota: OrdenReparacion) {
    flota.empleadoId = this.authService.usuario.id;
    return this.http.put<OrdenReparacion>(`${base_url}/UpdateReparacion`, flota);
  }

  delete(flota: OrdenReparacion): Observable<boolean> {
    return this.http.delete<boolean>(`${base_url}/DeleteReparacion/${flota.idReparacion}`);
  }

  getDetail(flota: OrdenReparacion): Observable<OrdenReparacionDetalle[]> {
    return this.http.get<OrdenReparacionDetalle[]>(`${base_url}/GetDetallesByReparacionId/${flota.idReparacion}`)
  }
}
