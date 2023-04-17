import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { catchError, of } from 'rxjs';
import { RegExp } from 'src/functions/regexp';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private fb: FormBuilder, private auth: AuthService) {}

  public hidden = true;
  public authenticated = false;
  public failed = false;
  public regUser = false;
  public regUserCheck = true;
  public status = "";

  // loginForm: all of the textbox values on the login page
  public loginForm = this.fb.group({
    email: "",
    password: ""
  });

  // regForm: all of the textbox values on the registration page
  public regForm = this.fb.group({
    email: "",
    username: "",
    password: "",
    password2: ""
  });

  public get email(): any {
    return this.regForm.get('email')?.value;
  }
  
  public get username(): any {
    return this.regForm.get('username')?.value;
  }
  
  public get password(): any {
    return this.regForm.get('password')?.value;
  }
  
  public get password2(): any {
    return this.regForm.get('password2')?.value;
  }

  public get passLength(): any {
    // Return whether the password exists and is at least 8 characters
    const len = this.regForm.get('password')?.value?.length;
    if (len != null && len >= 8) return true; else return false;
  }

  // Attempt to login with the session cookie on component initialization
  ngOnInit() {
    this.auth.getSession()
    .pipe(catchError(err => {return of(null);}))
    .subscribe(x => 
      {
        if (x != null) {
          this.auth.setCurrentUser(x);
          this.authenticated = true;
        } else {
          this.hidden = false;
        }
      }
    );
  }

  // login(): use the provided credentials to attempt to log in
  //          to the service
  login() {
    if (!this.loginDisable()) {

      // Get the credentials from the loginForm
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      // Send the credentials to the server
      this.auth.logUser({email: email, password: password})
        // if failed, set the error message bool to true and return null
        .pipe(catchError(err => {this.failed = true; return of(null);}))
        .subscribe(x => 
          {
            // If a user is successfully returned, set them as 
            // current user and set authenticated to true
            if (x != null) {
              this.auth.setCurrentUser(x);
              this.hidden = true;
              this.regUser = false;
              this.authenticated = true;
            }
          });
    }
  }

  // register(): register a new user to the website
  register() {
    // Create a object of registration details to send to the server
    const reg = {
      email: this.email, 
      username: this.username, 
      password: this.password
    };

    // Send the details to the server
    this.auth.register(reg).subscribe((x: any) => {
      console.log(x);
      // If the user is registered correctly, attempt to log them in
      if (x == true) {
        this.auth.logUser({email: this.email, password: this.password})
        .pipe(catchError(err => {this.failed = true; return of(null);}))
        .subscribe(y => 
          {
            if (y != null) {
              this.auth.setCurrentUser(y);
              this.authenticated = true;
              this.hidden = true;
              this.status = "";
            }
          });
      // Else, set the error note for whatever failed
      } else if (x == false) {
        this.status = "Error: unable to register at this time, please try again.";
      } else {

        this.status = "Error: a user with this ";

        if (x.email && x.username) {
          this.status = this.status.concat("email and username");
        } else if (x.email && !x.username) {
          this.status = this.status.concat("email");
        } else {
          this.status = this.status.concat("username");
        }

        this.status = this.status.concat(" already exists, please try again.");
      }
    });
  }

  // logout(): log the user out of the website
  logout() {
    // Reset the forms and set the current user null
    this.loginForm.setValue({email: "", password: ""});
    this.regForm.setValue({email: "", username: "", password: "", password2: ""});
    this.auth.setCurrentUser({_id: "", username: ""});
    // Send a logout signal to the server and set authenticated to false
    this.auth.logout().subscribe();
    this.authenticated = false;
    this.hidden = false;
  }

  //loginDisable(): disable the submit button if either the email
  //                or password has not been entered
  loginDisable() {
    return (this.loginForm.get('email')?.value == "") 
      ||(this.loginForm.get('password')?.value == "");
  }

  // emailCheck(): validate the provided email using a regular expression
  emailCheck(name: string) {
    return RegExp.email(name) && name != "" && name.length >= 1;
  }
  
  // usernameCheck(): validate the provided username using a regular expression
  usernameCheck(name: string) {
    return RegExp.username(name) && name != "" && name.length >= 8;
  }

  // passwordCheck(): confirm both entered passwords match
  passwordCheck(p1: string, p2: string) {
    return (p1 == p2) && p1.length >= 8;
  }

  // regDisable(): disable the registration button if any parameters
  //               have not been reached already
  regDisable() {
    // Returns true if any of the parameters fail:
    // * The email does not match the regular expression
    // * The username does not match the regular expression
    // * The two provided passwords do not match
    // * The password is not at least 8 characters
    return !RegExp.email(this.email) 
    || !RegExp.username(this.username)
    || !this.passwordCheck(this.password, this.password2)
    || !this.passLength;
  }
}
