import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwIfEmpty } from 'rxjs';
import { Flota } from 'src/app/interfaces/flota';
import { environment } from 'src/enviroments/environments';

const base_url = environment.base_url_cliente;

@Injectable({
  providedIn: 'root'
})
export class FlotaService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Flota[]> {
    return this.http.get<Flota[]>(`${base_url}/GetFlota`)
  }

  add(flota: Flota): Observable<Flota> {
    return this.http.post<Flota>(`${base_url}/CreateFlota`, flota);
  }

  edit(flota: Flota) {
    return this.http.put<Flota>(`${base_url}/UpdateFlota`, flota);
  }

  delete(flota: Flota): Observable<boolean> {
    return this.http.delete<boolean>(`${base_url}/DeleteMarca/${flota.id}`);
  }
}
