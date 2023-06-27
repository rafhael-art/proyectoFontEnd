import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/interfaces/cliente';
import { environment } from 'src/enviroments/environments';
const base_url = environment.base_url_cliente;
@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${base_url}/GetClientes`)
  }

  add(flota: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${base_url}/CreateCliente`, flota);
  }

  edit(flota: Cliente) {
    return this.http.put<Cliente>(`${base_url}/UpdateCliente`, flota);
  }

  delete(flota: Cliente): Observable<boolean> {
    return this.http.delete<boolean>(`${base_url}/DeleteCliente/${flota.id}`);
  }


}
