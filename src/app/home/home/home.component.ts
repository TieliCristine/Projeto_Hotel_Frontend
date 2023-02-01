import { Component } from '@angular/core';
import { ErrorStateMatcher } from "@angular/material/core";
import { FormControl, FormGroupDirective, NgForm, Validators } from "@angular/forms";

 // Error when invalid control is dirty, touched, or submitted.
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  matcherEmail = new MyErrorStateMatcher();

  passwordFormControl = new FormControl('', [Validators.required]);
  matcherPassword = new MyErrorStateMatcher();
}
