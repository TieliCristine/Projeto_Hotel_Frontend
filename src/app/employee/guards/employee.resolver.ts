import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Employee } from "../model/employee";
import { EmployeeService } from "../service/employee.service";

@Injectable({
  providedIn: 'root'
})
export class EmployeeResolver implements Resolve<Employee> {

  constructor(private service: EmployeeService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Employee> {
    if (route.params && route.params['id']){
      return this.service.loadById(route.params['id']);
    }
    return of({ id: '', cpf: '', name: '', birthdate: '', gender: '', mobile: '', office: '' });
  }
}
