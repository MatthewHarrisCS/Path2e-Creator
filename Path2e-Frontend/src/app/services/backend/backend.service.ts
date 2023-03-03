import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Ancestry } from 'src/models/ancestry';
import { Background } from 'src/models/background';
import { GameClass } from 'src/models/game-class';
import { Racket } from 'src/models/racket';
import { BACKGROUND_LIST, CLASS_LIST, RACKET_LIST } from 'src/temp-db';

@Injectable({ providedIn: 'root' })
export class BackendService {

  constructor(private http: HttpClient) {}

  private urlBase: string = "http://localhost:4201";

  getAncestries(): Observable<Ancestry[]> {
    return this.http.get<Ancestry[]>(this.urlBase + "/ancestry");
  }

  getBackgrounds(): Observable<Background[]> {
    return this.http.get<Background[]>(this.urlBase + "/background");
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
