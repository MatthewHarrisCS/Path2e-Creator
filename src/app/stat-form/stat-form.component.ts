import { Component } from '@angular/core';
import { Ancestry } from 'ancestry-model';
import { GameClass } from 'game-class-model';
import { ANCESTRY_LIST, CLASS_LIST } from 'src/temp-db';

@Component({
  selector: 'stat-form',
  templateUrl: './stat-form.component.html',
  styleUrls: ['./stat-form.component.css']
})
export class StatFormComponent {

  /* 
  
  TODO:
  Choose between key abilities for classes with them
    Boolean to filter radio button? ngIf?
    Rogue's Racket choice
  Choose free stats
    Free choice option (USE chooseBoosts)
    Additional choice for humans OR free choose

  */

  classes = CLASS_LIST;
  ancestries = ANCESTRY_LIST;
  classBoosts = "No class selected";
  classSelected = false;
  currentClass = null;
  ancestryBoosts = "No ancestry selected";
  ancestrySelected = false;
  currentAncestry = null;

  chooseBoosts = false;

  hp = 5;
  str = 10;
  dex = 10;
  con = 10;
  int = 10;
  wis = 10;
  cha = 10;

  resetStats() {
    this.str = 10;
    this.dex = 10;
    this.con = 10;
    this.int = 10;
    this.wis = 10;
    this.cha = 10;
  }

  calculate() {

    if (this.currentClass != null && this.currentAncestry != null) {
      
      this.resetStats();
      // TEMP: replace with ability choice
      let chooseKey = 'keyAbility1';

      this.hp = this.currentClass['hp'] + this.currentAncestry['hp'];

      this.boostStat(this.currentClass[chooseKey], true);
      this.boostStat(this.currentAncestry['boost1'], true);
      this.boostStat(this.currentAncestry['boost2'], true);
      this.boostStat(this.currentAncestry['flaw'], false);
    }
  }

  boostStat(boost: string, isBoost: boolean) {

    let change = 2;

    // If flaw, negate change
    if(!isBoost) {
      change = -2;
    }

    switch(boost) {
      case "Strength": {
        this.str += change;
        break;
      }
      case "Dexterity": {
        this.dex += change;
        break;
      }
      case "Constitution": {
        this.con += change;
        break;
      }
      case "Intelligence": {
        this.int += change;
        break;
      }
      case "Wisdom": {
        this.wis += change;
        break;
      }
      case "Charisma": {
        this.cha += change;
      }
    }
  }

  showClassBoosts(name: string) {
    if (name == "---") {
      this.classBoosts = "No class selected";
      this.classSelected = false;
      this.currentClass = null;
    } else {
      let currentClass = this.classes.find((x: GameClass) => x.name == name);
      this.classBoosts = `
        ${currentClass.name}: 
        +${currentClass.hp} HP, 
        +2 in ${currentClass.keyAbility1}`;

      if (currentClass.keyAbility2 != null) {
        this.classBoosts = this.classBoosts.concat(` or ${currentClass.keyAbility2}`);
      }
      
      this.classSelected = true;
      this.currentClass = currentClass;
    }
  }

  showAncestryBoosts(name: string) {
    if (name == "---") {
      this.ancestryBoosts = "No ancestry selected";
      this.ancestrySelected = false;
      this.currentAncestry = null;
    } else {
      let currentAncestry = this.ancestries.find((x: Ancestry) => x.name == name);
      this.ancestryBoosts = `
        ${currentAncestry.name}:
        ${currentAncestry.hp} HP, 
        ${currentAncestry.size} Size, 
        Speed of ${currentAncestry.speed} ft`; 

      if (name == "Human" || this.chooseBoosts) {
        this.ancestryBoosts = this.ancestryBoosts.concat(`, +2 in two stats of your choice`);
      } else {
        this.ancestryBoosts = this.ancestryBoosts.concat(`
          +2 in ${currentAncestry.boost1}, 
          +2 in ${currentAncestry.boost2}, 
          +2 in stat of your choice, and 
          -2 in ${currentAncestry.flaw}`);
      }

      this.ancestrySelected = true;
      this.currentAncestry = currentAncestry;
    }
  }
}