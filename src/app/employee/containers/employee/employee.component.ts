import { Component, OnInit } from '@angular/core';
import { catchError, Observable, of } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ErrorDialogComponent } from "../../../shared/components/error-dialog/error-dialog.component";
import {
  ConfirmationDialogComponent
} from "../../../shared/components/confirmation-dialog/confirmation-dialog.component";
import { Employee } from "../../model/employee";
import { EmployeeService } from "../../service/employee.service";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit{
  employee$: Observable<Employee[]> | null = null;

  constructor(
    private employeeService: EmployeeService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
  ) {
    this.refresh();
  };

  refresh() {
    this.employee$ = this.employeeService.list()
      .pipe(
        catchError(error => {
          this.onError('Erro ao carregar Lista de Empregados!');
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
  }

  onAdd() {
    this.router.navigate(['new'], {relativeTo: this.route});
  };

  onEdit(employee: Employee) {
    this.router.navigate(['edit', employee.id], {relativeTo: this.route});
  };

  onDelete(employee: Employee) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja excluir empregado?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result){
        this.employeeService.delete(employee.id).subscribe(
          () => {
            this.refresh();
            this.snackbar.open('Empregado excluído com sucesso!', 'x', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
            });
          }, error => this.onError('Erro ao tentar excluir empregado')
        );
      }
    });
  }
}
