import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Customer } from "../model/customer";
import { first, tap } from "rxjs";

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
        // tap(customer => console.log(customer))
      )
  }
}
