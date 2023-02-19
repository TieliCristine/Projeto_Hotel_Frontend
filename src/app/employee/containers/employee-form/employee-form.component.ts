import {Component, OnInit} from '@angular/core';
import {FormControl, NonNullableFormBuilder, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Location} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {ThemePalette} from "@angular/material/core";
import {EmployeeService} from "../../service/employee.service";
import {Employee} from "../../model/employee";

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit{

  formGroup = this.formBuilder.group({
    id: [''],
    cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(225)]],
    birthdate: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
    gender: ['', [Validators.required]],
    mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(12)]],
    office: ['', [Validators.required]]
  });

  constructor(private formBuilder: NonNullableFormBuilder,
              private service: EmployeeService,
              private snackbar: MatSnackBar,
              private location: Location,
              private route: ActivatedRoute,
  ) {
    const employee: Employee = this.route.snapshot.data['employee'];
    this.formGroup.patchValue({
      id: employee.id,
      cpf: employee.cpf,
      name: employee.name,
      birthdate: employee.birthdate,
      gender: employee.gender,
      mobile: employee.mobile,
      office: employee.office,
    })
  }

  // firstFormGroup = this.formBuilder.group({
  //   cpf: ['', Validators.required],
  //   name: ['', Validators.required],
  //   birthdate: ['', Validators.required],
  //   gender: ['', Validators.required],
  //   mobile: ['', Validators.required],
  // });
  // secondFormGroup = this.formBuilder.group({
  //   secondCtrl: ['', Validators.required],
  // });
  isEditable = true;

  colorControl = new FormControl('primary' as ThemePalette);

  ngOnInit(): void {

  }

  onSubmit(){
    this.service.save(this.formGroup.value)
      .subscribe(result => this.onSuccess(), error => this.onError());
  }

  onCancel(){
    this.location.back();
  }

  private onSuccess(){
    this.snackbar.open('Cliente salvo com sucesso!', '', { duration: 5000 });
    this.onCancel();
  }

  private onError(){
    this.snackbar.open('Erro ao salvar cliente.', '', { duration: 5000 });
  }

  getErrorMessage(fieldName: string){
    const field = this.formGroup.get(fieldName);
    if (field?.hasError('required')){
      return 'Campo obrigatório.';
    }
    if (field?.hasError('minlength')){
      const requiredLenght = field?.errors ? field.errors['minlength']['requiredLength'] : 5;
      return `O tamanho mínimo precisa ser de ${requiredLenght} caracteres`;
    }
    if (field?.hasError('maxlength')){
      const requiredLenght = field?.errors ? field.errors['maxlength']['requiredLength'] : 250;
      return `O tamanho máximo permitido é ${requiredLenght} caracteres`;
    }
    return 'Campo inválido.'
  }
}
