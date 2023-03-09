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
    private backend: BackendService, 
    private auth: AuthService) {}

  ngOnInit() {
    this.getData();
  }

  private user: User = {email: "", username: ""};
  public characters: CharacterList[] = [];

  getData() {
    this.auth.getCurrentUser().subscribe(x => 
      {
        this.user = x;
        this.backend.getCharacters(this.user.email)
          .subscribe(y => this.characters = y);
      });
  }
  
  setCharacter(name: string) {
    if(name == "---") {
      console.log("No character selected");
    } else {
      this.characters.find((x: CharacterList) => x.name == name ? console.log(x) : null);
    }
  }
}
