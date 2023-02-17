import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Customer } from "../model/customer";
import { delay, first, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private readonly API = 'api/customer';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Customer[]>(this.API)
      .pipe(
        first(),
        // delay(15000),
        // tap(customer => console.log(customer))
      )
  };

  loadById(id: string){
    return this.httpClient.get<Customer>(`${this.API}/${id}`);
  };

  save(record: Partial<Customer>){
    if (record.id){
      return this.update(record);
    }
    return this.create(record);
  };

  private create(record: Partial<Customer>){
    return this.httpClient.post<Customer>(this.API, record).pipe(first());
  };

  private update(record: Partial<Customer>){
    return this.httpClient.put<Customer>(`${this.API}/${record.id}`, record).pipe(first());
  }

  delete(id: string){
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first());
  }
}
