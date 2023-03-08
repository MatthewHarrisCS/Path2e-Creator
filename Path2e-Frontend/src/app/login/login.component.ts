import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { SHA256 } from 'crypto-js';

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

      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
      if (password == undefined) return;

      // Hash algorithm to avoid storing plaintext passwords
      const cpassword = SHA256(password).toString();

      this.authenticated = this.auth.setUser({email: email, password: cpassword});
    }
  }

  logout() {
    this.loginForm.setValue({email: "", password: ""});
    this.auth.setUser(this.loginForm.value);
    this.authenticated = false;
  }

  //loginDisable(): disable the submit button if either the email
  //                or password has not been entered
  loginDisable() {
    return (this.loginForm.get('email')?.value == "") 
      ||(this.loginForm.get('password')?.value == "");
  }
}
