import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Employee } from "../../model/employee";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit{

  @Input() employee: Employee[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() delete = new EventEmitter(false);

  readonly displayedColumns = ['id', 'cpf', 'name', 'birthdate', 'gender', 'mobile', 'office', 'actions'];

  constructor() {
  };

  ngOnInit(): void{};

  onAdd(){
    this.add.emit(true);
  };

  onEdit(employee: Employee){
    this.edit.emit(employee);
  };

  onDelete(employee: Employee){
    this.delete.emit(employee);
  }

}
