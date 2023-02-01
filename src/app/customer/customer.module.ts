import { AppMaterialModule } from "../shared/app-material/app-material.module";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer/customer.component';
import { SharedModule } from "../shared/shared.module";


@NgModule({
  declarations: [
    CustomerComponent
  ],
  exports: [
    CustomerComponent
  ],
  imports: [
    AppMaterialModule,
    CommonModule,
    CustomerRoutingModule,
    SharedModule
  ]
})
export class CustomerModule { }
