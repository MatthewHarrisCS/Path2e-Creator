import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Ancestry } from 'src/models/ancestry';
import { Background } from 'src/models/background';
import { GameClass } from 'src/models/game-class';
import { Racket } from 'src/models/racket';
import { ANCESTRY_LIST, BACKGROUND_LIST, CLASS_LIST, RACKET_LIST } from 'src/temp-db';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) {}

  private url: string = "http://localhost:4200/ancestry";

  getAncestries(): Observable<Ancestry[]> {
    const ancestries = this.http.get<Ancestry[]>(this.url);
    console.log(ancestries)

    return ancestries;
   
  }

  getBackgrounds(): Observable<Background[]> {
    const backgrounds = of(BACKGROUND_LIST);
    return backgrounds;
  }
  
  getClasses(): Observable<GameClass[]> {
    const classes = of(CLASS_LIST);
    return classes;
  }
  
  getRackets(): Observable<Racket[]> {
    const rackets = of(RACKET_LIST);
    return rackets;
  }
}
