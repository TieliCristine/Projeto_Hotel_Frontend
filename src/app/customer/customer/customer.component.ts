import { Component, OnInit } from '@angular/core';
import { catchError, Observable, of } from "rxjs";
import { ErrorDialogComponent } from "../../shared/components/error-dialog/error-dialog.component";
import { FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ThemePalette } from "@angular/material/core";

import { Customer } from "../model/customer";
import { CustomerService } from "../service/customer.service";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})

export class CustomerComponent implements OnInit{
  customer: Observable<Customer[]>;
  displayedColumns = ['cpf', 'name', 'birthdate', 'gender', 'mobile'];


  constructor(
    private customerService: CustomerService,
    public dialog:MatDialog
    ) {
    this.customer = this.customerService.list()
      .pipe(
        catchError(error => {
          this.onError('Erro ao carregar Lista de Clientes!');
          return of([])
        })
      );
  }

  onError(errorMsg: string){
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  ngOnInit(): void {
  }

  // customerFormGroup = this.formBuilder.group({
  //   name: ['', Validators.required],
    // cpf: ['', Validators.required],
    // email: ['', Validators.required]
  // });
  // secondFormGroup = this.formBuilder.group({
  //   secondCtrl: ['', Validators.required],
  // });
  // isEditable = true;
  //
  // constructor(private formBuilder: FormBuilder) {
  // }

  // colorControl = new FormControl('primary' as ThemePalette);
}
