import { Component } from '@angular/core';
import { CharacterList } from 'src/models/character-list';
import { User } from 'src/models/user';
import { AuthService } from '../services/auth/auth.service';
import { BackendService } from '../services/backend/backend.service';
import { FormBuilder, Validators } from '@angular/forms';
import { RegExp } from 'src/functions/regexp';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {

  constructor(
    private fb: FormBuilder, 
    private auth: AuthService,
    private backend: BackendService) {}

  ngOnInit() {
    this.getData();
  }

  public user: User = {_id: "", username: ""};
  public characters: CharacterList[] = [];
  public character: CharacterList | undefined;

  public newEmail = this.fb.control("", [Validators.required, Validators.email]);
  public newUsername = this.fb.control("", [Validators.required]);
  public newPassword = this.fb.control("", [Validators.required]);

  // getData(): get the current user and access their character list
  getData() {
    this.user = this.auth.getCurrentUser();
    this.backend.getCharacters(this.user._id)
      .subscribe(y => this.characters = y);
  }
  
  // setCharacter(): Get the information from the selected character
  setCharacter(name: string) {
    if(name != "---") {
      this.characters.find((x: CharacterList) => {
        console.log(x); if(x.name == name) this.character = x;
      });
    }
  }

  updateEmail(newEmail: string) {
    this.auth.updateEmail(newEmail).subscribe();
  }

  updateUsername(newUsername: string) {
    this.auth.updateUsername(newUsername).subscribe(x => {
      if (x) {
        let newUser = this.auth.getCurrentUser();
        newUser.username = newUsername;
        this.auth.setCurrentUser(newUser);
      }
    });
  }

  updatePassword(newPassword: string) {
    this.auth.updatePassword(newPassword).subscribe();
  }

  emailCheck(email: string) {
    return RegExp.email(email);
  }

  usernameCheck(username: string) {
    return RegExp.username(username);
  }

  passwordCheck(p1: string, p2: string) {
    return p1 == p2 && p1.length > 8;
  }
}
