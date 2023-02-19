import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {first} from "rxjs";
import {Employee} from "../model/employee";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private readonly API = 'api/employee';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Employee[]>(this.API)
      .pipe(
        first(),
        // delay(15000),
        // tap(customer => console.log(customer))
      )
  };

  loadById(id: string){
    return this.httpClient.get<Employee>(`${this.API}/${id}`);
  };

  save(record: Partial<Employee>){
    if (record.id){
      return this.update(record);
    }
    return this.create(record);
  };

  private create(record: Partial<Employee>){
    return this.httpClient.post<Employee>(this.API, record).pipe(first());
  };

  private update(record: Partial<Employee>){
    return this.httpClient.put<Employee>(`${this.API}/${record.id}`, record).pipe(first());
  }

  delete(id: string){
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first());
  }
}
