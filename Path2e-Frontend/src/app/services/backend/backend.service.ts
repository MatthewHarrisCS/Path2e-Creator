import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ancestry } from 'src/models/ancestry';
import { Background } from 'src/models/background';
import { CharacterList } from 'src/models/character-list';
import { CharacterSheet } from 'src/models/character-sheet';
import { GameClass } from 'src/models/game-class';
import { Heritage } from 'src/models/heritage';
import { Racket } from 'src/models/racket';

@Injectable({ providedIn: 'root' })
export class BackendService {

  constructor(private http: HttpClient) {}

  private urlBase: string = "http://localhost:4201/api";

  // getAncestries(): return the ancestry list from the database
  getAncestries(): Observable<Ancestry[]> {
    return this.http.get<Ancestry[]>(this.urlBase + "/ancestry");
  }

  // getBackgrounds(): return the background list from the database
  getBackgrounds(): Observable<Background[]> {
    return this.http.get<Background[]>(this.urlBase + "/background");
  }
  
  // getClasses(): return the class list from the database
  getClasses(): Observable<GameClass[]> {
    return this.http.get<GameClass[]>(this.urlBase + "/class");
  }
  
  // getRackets(): return the racket list from the database
  getHeritages(): Observable<Heritage[]> {
    return this.http.get<Heritage[]>(this.urlBase + "/heritage");
  }

  // getRackets(): return the racket list from the database
  getRackets(): Observable<Racket[]> {
    return this.http.get<Racket[]>(this.urlBase + "/racket");
  }

  // getCharacters(): return the user's saved character list from the database
  getCharacters(_id: string): Observable<CharacterList[]> {
    let params = new HttpParams().set("user", _id)
    return this.http.get<CharacterList[]>(this.urlBase + "/character", {withCredentials: true, params: params});
  }

  // saveCharacter(): save a user's character to the database
  saveCharacter(body: CharacterSheet): Observable<CharacterSheet> {
    return this.http.post<CharacterSheet>((this.urlBase + "/character"), body, {withCredentials: true});
  }

  // deleteCharacter(): delete a specified character from the database
  deleteCharacter(_id: string) {
    return this.http.delete((this.urlBase + "/character"), 
      {withCredentials: true, body: {id: _id}});
  }
}