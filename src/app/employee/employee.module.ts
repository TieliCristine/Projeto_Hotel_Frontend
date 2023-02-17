import { AppMaterialModule } from "../shared/app-material/app-material.module";
import { CommonModule } from '@angular/common';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee/employee.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    EmployeeComponent
  ],
  imports: [
    AppMaterialModule,
    CommonModule,
    EmployeeRoutingModule,
  ]
})
export class EmployeeModule { }
