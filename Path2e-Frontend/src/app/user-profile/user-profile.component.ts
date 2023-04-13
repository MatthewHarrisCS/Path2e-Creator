import { Component } from '@angular/core';
import { CharacterList } from 'src/models/character-list';
import { User } from 'src/models/user';
import { AuthService } from '../services/auth/auth.service';
import { BackendService } from '../services/backend/backend.service';
import { FormBuilder, Validators } from '@angular/forms';

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

  public newEmail = this.fb.control("test", [Validators.required, Validators.email]);
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
}
