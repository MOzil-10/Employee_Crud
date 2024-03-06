import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      // Here you can implement your login logic
      console.log("Login successful");
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  getErrors(controlName: string): string[] {
    const control = this.loginForm.get(controlName);
    const errors: string[] = [];
    if (control && control.errors) {
      for (const errorName in control.errors) {
        if (control.errors.hasOwnProperty(errorName)) {
          switch (errorName) {
            case 'required':
              errors.push('Field is required');
              break;
            case 'email':
              errors.push('Invalid email');
              break;
            case 'minlength':
              errors.push('Password must be at least 6 characters long');
              break;
            default:
              break;
          }
        }
      }
    }
    return errors;
  }

}
