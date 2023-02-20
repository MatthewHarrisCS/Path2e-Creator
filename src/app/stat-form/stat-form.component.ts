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

  classes = CLASS_LIST;
  ancestries = ANCESTRY_LIST;
  classBoosts = "No class selected";
  classSelected = false;
  currentClass = null;
  ancestryBoosts = "No ancestry selected";
  ancestrySelected = false;
  currentAncestry = null;

  default = 10;
  chooseBoosts = false;

  str = 10;
  dex = 10;
  con = 10;
  int = 10;
  wis = 10;
  cha = 10;

  showClassBoosts(name: string) {
    if (name == "---") {
      this.classBoosts = "No class selected";
      this.classSelected = false;
      this.currentClass = null;
    } else {
      let currentClass = this.classes.find((x: GameClass) => x.name == name);
      this.classBoosts = `
        ${currentClass.name}: 
        +2 in ${currentClass.keyAbility1}`;
      console.log(currentClass.keyAbility2);
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