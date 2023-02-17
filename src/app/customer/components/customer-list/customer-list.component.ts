import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Customer } from "../../model/customer";

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit{

  @Input() customer: Customer[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() delete = new EventEmitter(false);

  readonly displayedColumns = ['id', 'cpf', 'name', 'birthdate', 'gender', 'mobile', 'actions'];

  constructor() {
  };

  ngOnInit(): void{};

  onAdd(){
    this.add.emit(true);
  };

  onEdit(customer: Customer){
    this.edit.emit(customer);
  };

  onDelete(customer: Customer){
    this.delete.emit(customer);
  }

}
