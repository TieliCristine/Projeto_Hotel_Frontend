import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from '@angular/core';
import { Customer } from "../../model/customer";
import { CustomerService } from "../../service/customer.service";
import { FormBuilder, FormControl, FormGroup, NonNullableFormBuilder, Validators } from "@angular/forms";
import { Location } from "@angular/common";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ThemePalette } from "@angular/material/core";

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {

  formGroup = this.formBuilder.group({
    id: [''],
    cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(225)]],
    birthdate: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
    gender: ['', [Validators.required]],
    mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(12)]],
  });

  constructor(private formBuilder: NonNullableFormBuilder,
              private service: CustomerService,
              private snackbar: MatSnackBar,
              private location: Location,
              private route: ActivatedRoute,
  ) {
    const customer: Customer = this.route.snapshot.data['customer'];
    this.formGroup.patchValue({
      id: customer.id,
      cpf: customer.cpf,
      name: customer.name,
      birthdate: customer.birthdate,
      gender: customer.gender,
      mobile: customer.mobile,
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
      return `Tamanho mínimo precisa ser de ${requiredLenght} caracteres`;
    }
    if (field?.hasError('maxlength')){
      const requiredLenght = field?.errors ? field.errors['maxlength']['requiredLength'] : 250;
      return `O tamanho máximo permitido é ${requiredLenght} caracteres`;
    }
    return 'Campo inválido.'
  }
}
