import { Marca } from './../../interfaces/marca';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/environments';

const base_url = environment.base_url_cliente;

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  constructor(private http: HttpClient) { }

  add(marca: Marca): Observable<Marca> {
    return this.http.post<Marca>(`${base_url}/CreateMarca`, marca);
  }

  edit(marca: Marca): Observable<Marca> {
    return this.http.put<Marca>(`${base_url}/UpdateMarca`, marca)
  }

  delete(marca: Marca): Observable<boolean> {
    return this.http.delete<boolean>(`${base_url}/DeleteMarca/${marca.id}`)
  }

}
