import { Marca } from './../../interfaces/marca';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BaseResponse } from 'src/app/interfaces/base-response';
import { environment } from 'src/enviroments/environments';

const base_url = environment.base_url_cliente;

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  constructor(private http: HttpClient) { }

  cargarMarcas(): Observable<Marca[]> {

    return this.http.get<Marca[]>(`${base_url}/GetMarca`);
  }

  getMarca(id: number): Observable<Marca> {
    return this.http.get<Marca>(`${base_url}/GetMarcaById/${id}`);
  }

  add(marca: Marca): Observable<BaseResponse<Marca>> {
    return this.http.post<BaseResponse<Marca>>(`${base_url}/CreateMarca`, marca);
  }

  edit(marca: Marca): Observable<BaseResponse<boolean>> {
    return this.http.put<BaseResponse<boolean>>(`${base_url}/UpdateMarca`, marca)
  }

  delete(marca: Marca): Observable<boolean> {
    return this.http.delete<boolean>(`${base_url}/DeleteMarca/${marca.id}`)
  }

}
