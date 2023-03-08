import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private fb: FormBuilder, private auth: AuthService) {}

  public authenticated = false;

  loginForm = this.fb.group({
    email: "",
    password: ""
  });

  login() {
    if (!this.loginDisable()) {
      this.authenticated = this.auth.setUser(this.loginForm.value);
    }
  }

  //loginDisable(): disable the submit button if either the email
  //                or password has not been entered
  loginDisable() {
    return (this.loginForm.get('email')?.value == "") 
      ||(this.loginForm.get('password')?.value == "");
  }
}
