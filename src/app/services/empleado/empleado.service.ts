import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BaseResponse } from '../../interfaces/base-response';
import { Empleado } from '../../interfaces/empleado';
import { environment } from 'src/enviroments/environments';
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(private http: HttpClient) { }

  cargarEmpleados(): Observable<Empleado[]> {
    return this.http.get<BaseResponse<Empleado[]>>(`${base_url}`).pipe(map(res => res.data));
  }

  getEmpleado(id: number): Observable<Empleado> {
    return this.http.get<BaseResponse<Empleado>>(`${base_url}/${id}`).pipe(map(res => res.data));
  }
  eliminarEmpleado(empleado: Empleado): Observable<boolean> {
    return this.http.delete<BaseResponse<boolean>>(`${base_url}/${empleado.id}`,).pipe(map(res => res.data));
  }

  add(empleado: Empleado): Observable<BaseResponse<Empleado>> {
    return this.http.post<BaseResponse<Empleado>>(`${base_url}`, empleado);
  }

  edit(empleado: Empleado): Observable<BaseResponse<boolean>> {
    return this.http.put<BaseResponse<boolean>>(`${base_url}`, empleado);
  }

  delete(empleado: Empleado): Observable<BaseResponse<boolean>> {
    return this.http.delete<BaseResponse<boolean>>(`${base_url}/${empleado.id}`);
  }
}
