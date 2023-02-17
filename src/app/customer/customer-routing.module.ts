import { CustomerComponent } from "./containers/customer/customer.component";
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerFormComponent } from "./containers/customer-form/customer-form.component";
import { CustomerResolver } from "./guards/customer.resolver";

const routes: Routes = [
  { path: '', component: CustomerComponent },
  { path: 'new', component: CustomerFormComponent, resolve: { customer: CustomerResolver } },
  { path: 'edit/:id', component: CustomerFormComponent, resolve: { customer: CustomerResolver } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
