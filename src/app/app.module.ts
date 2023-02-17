import { AppComponent } from './app.component';
import { AppMaterialModule } from "./shared/app-material/app-material.module";
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { EmployeeModule } from "./employee/employee.module";
import { FlexLayoutModule } from 'ngx-flexible-layout';
import { HttpClientModule } from "@angular/common/http";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import { NgScrollbarModule } from "ngx-scrollbar";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppMaterialModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    EmployeeModule,
    FlexLayoutModule,
    HttpClientModule,
    MatIconModule,
    MatToolbarModule,
    NgScrollbarModule.withConfig({
      track: "all",
      visibility: "hover",
      appearance: "compact",
      minThumbSize: 15,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
