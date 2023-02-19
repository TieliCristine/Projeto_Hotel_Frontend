import { AppMaterialModule } from "../shared/app-material/app-material.module";
import { CommonModule } from '@angular/common';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './containers/employee/employee.component';
import { NgModule } from '@angular/core';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeSidenavComponent } from './components/employee-sidenav/employee-sidenav.component';
import { EmployeeFormComponent } from './containers/employee-form/employee-form.component';
import { SharedModule } from "../shared/shared.module";
import { NgScrollbarModule } from "ngx-scrollbar";

@NgModule({
  declarations: [
    EmployeeComponent,
    EmployeeListComponent,
    EmployeeSidenavComponent,
    EmployeeFormComponent
  ],
  exports: [
    EmployeeComponent
  ],
  imports: [
    AppMaterialModule,
    CommonModule,
    EmployeeRoutingModule,
    SharedModule,
    NgScrollbarModule
  ]
})
export class EmployeeModule { }
