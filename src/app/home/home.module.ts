import { AppMaterialModule } from "../shared/app-material/app-material.module";
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { NgModule } from '@angular/core';
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    HomeComponent
  ],
    imports: [
        AppMaterialModule,
        CommonModule,
        HomeRoutingModule,
        SharedModule
    ]
})
export class HomeModule { }
