import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { CustomerService } from "../service/customer.service";
import { Customer } from "../model/customer";

@Injectable({
  providedIn: 'root'
})
export class CustomerResolver implements Resolve<Customer> {

  constructor(private service: CustomerService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Customer> {
    if (route.params && route.params['id']){
      return this.service.loadById(route.params['id']);
    }
    return of({ id: '', cpf: '', name: '', birthdate: '', gender: '', mobile: '' });
  }
}
