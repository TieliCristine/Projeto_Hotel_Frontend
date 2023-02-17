import { ActivatedRoute, Router } from "@angular/router";
import { catchError, Observable, of } from "rxjs";
import { Component, OnInit } from '@angular/core';
import { ConfirmationDialogComponent } from "../../../shared/components/confirmation-dialog/confirmation-dialog.component";

import { Customer } from "../../model/customer";
import { CustomerService } from "../../service/customer.service";
import { ErrorDialogComponent } from "../../../shared/components/error-dialog/error-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})

export class CustomerComponent implements OnInit {
  customer$: Observable<Customer[]> | null = null;

  constructor(
    private customerService: CustomerService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
  ) {
    this.refresh();
  };

  refresh() {
    this.customer$ = this.customerService.list()
      .pipe(
        catchError(error => {
          this.onError('Erro ao carregar Lista de Clientes!');
          return of([])
        })
      );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  };

  ngOnInit(): void {
  };

  onAdd() {
    this.router.navigate(['new'], {relativeTo: this.route});
  };

  onEdit(customer: Customer) {
    this.router.navigate(['edit', customer.id], {relativeTo: this.route});
  };

  onDelete(customer: Customer) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja excluir cliente?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result){
        this.customerService.delete(customer.id).subscribe(
          () => {
            this.refresh();
            this.snackbar.open('Cliente excluído com sucesso!', 'x', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
            });
          }, error => this.onError('Erro ao tentar excluir cliente')
        );
      }
    });
  }
}
