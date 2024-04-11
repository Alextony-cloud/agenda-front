import { Injectable } from '@angular/core';
import { Contato } from './contato/contato';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginaContato } from './contato/paginaContato';

@Injectable({
  providedIn: 'root'
})
export class ContatoService  {

  url: string =  'http://localhost:8080/api/contatos'

constructor(private http: HttpClient){}

save(contato:Contato): Observable<Contato>{
  return this.http.post<Contato>(this.url, contato);
}

findAll(page:number, size:number): Observable<PaginaContato>{
  const params = new HttpParams().set('page', page).set('size', size)
  return this.http.get<PaginaContato>(`${this.url}?${params.toString()}`);
}

favorite(contato: Contato):Observable<any>{
  return this.http.patch(`${this.url}/${contato.id}/favorito`, null);
}

upload(contato: Contato, formData: FormData):Observable<any>{
  return this.http.put(`${this.url}/ ${contato.id}/foto`, formData, {responseType : 'blob'});
}

}
