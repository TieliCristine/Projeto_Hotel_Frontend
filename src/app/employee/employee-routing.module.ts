import { EmployeeComponent } from "./containers/employee/employee.component";
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: EmployeeComponent },
  { path: 'new', component: EmployeeComponent },
  { path: 'edit/:id', component: EmployeeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
