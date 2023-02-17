import { AppMaterialModule } from "../shared/app-material/app-material.module";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './containers/customer/customer.component';
import { SharedModule } from "../shared/shared.module";
import { CustomerFormComponent } from './containers/customer-form/customer-form.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import {NgScrollbarModule} from "ngx-scrollbar";


@NgModule({
  declarations: [
    CustomerComponent,
    CustomerFormComponent,
    CustomerListComponent
  ],
  exports: [
    CustomerComponent
  ],
  imports: [
    AppMaterialModule,
    CommonModule,
    CustomerRoutingModule,
    SharedModule,
    NgScrollbarModule
  ]
})
export class CustomerModule { }
