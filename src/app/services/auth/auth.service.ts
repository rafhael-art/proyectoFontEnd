import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { BaseResponse } from 'src/app/interfaces/base-response';
import { Empleado } from 'src/app/interfaces/empleado';
import { environment } from 'src/enviroments/environments';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public usuario!: Empleado;

  getToken() {
    return localStorage.getItem('token');
  }

  validarToken(): Observable<boolean> {
    return this.http.get(`${base_url}/validarToken`)
      .pipe(
        tap((resp: any) => {
          if (resp.succes) {
            this.usuario = resp.data;
            localStorage.setItem('token', resp.data.token);
          }
        }),
        map(resp => true),
        catchError(error => of(false))
      );
  }

  logOut() {
    localStorage.removeItem('token');
  }

  login(formData: Empleado): Observable<BaseResponse<string>> {
    return this.http.post<BaseResponse<string>>(`${base_url}/login`, formData)
      .pipe(
        tap((resp) => {
          if (resp.succes) {

            localStorage.setItem('token', resp.data);
          }
        }));
  }
}
