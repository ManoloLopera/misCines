import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  hide = true;

  constructor(private auth: AuthService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: new FormControl('', [
        Validators.required,
        Validators.maxLength(15)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        // tslint:disable-next-line: max-line-length
        // Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
      confirmPassword: new FormControl('', [
        Validators.required
      ])
    }, {validator: this.passwordConfirming});
  }

  hasError(controlName: string, errorName: string) {
    return this.registerForm.controls[controlName].hasError(errorName);
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }

  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('confirmPassword').value) {
        return {invalid: true};
    }
  }

  register() {
    if (this.registerForm.valid) {
      const username = this.registerForm.get('username').value;
      const email = this.registerForm.get('email').value;
      const password = this.registerForm.get('password').value;
      this.auth.register(email, password, username).then(
        auth => {
          this.router.navigate(['']);
      }).catch(
        err => console.log(err));
  }}

}
