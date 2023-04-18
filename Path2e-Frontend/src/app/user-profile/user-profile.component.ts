import { Component } from '@angular/core';
import { CharacterList } from 'src/models/character-list';
import { User } from 'src/models/user';
import { AuthService } from '../services/auth/auth.service';
import { BackendService } from '../services/backend/backend.service';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {

  constructor(
    private auth: AuthService,
    private backend: BackendService) {}

  ngOnInit() {
    this.getData();
  }

  public user: User = {_id: "", username: ""};
  public characters: CharacterList[] = [];
  public character: CharacterList | undefined;

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
        if(x.name == name) this.character = x; 
        console.log(this.character);
      });
    }
  }

  // deleteCharacter(): Delete the selected character from the database
  deleteCharacter() {
    if (this.character?._id == undefined) {
      return;
    }
    return this.backend.deleteCharacter(this.character?._id).subscribe(x => 
      this.getData());
  }
}
