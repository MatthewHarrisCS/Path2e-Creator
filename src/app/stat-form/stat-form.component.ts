import { Component } from '@angular/core';
import { Ancestry } from 'ancestry-model';
import { GameClass } from 'game-class-model';
import { ANCESTRY_LIST, CLASS_LIST } from 'src/temp-db';
import { FormBuilder, Validators } from '@angular/forms';
import { Dice } from 'src/dice';

@Component({
  selector: 'stat-form',
  templateUrl: './stat-form.component.html',
  styleUrls: ['./stat-form.component.css']
})
export class StatFormComponent {

  /* 
  
  TODO:
  Choose between key abilities for classes with them
  No flaw on free choice for non-Humans
  Backgrounds (SQL, temp-db, and new tab)
    Make model for selection (boost str, selected, and current)
    Boolean to filter radio button? ngIf?
    Rogue's Racket choice
  Free stats default for Human (disable button)

  */

  classes = CLASS_LIST;
  ancestries = ANCESTRY_LIST;
  classBoosts = "No class selected";
  classSelected = false;
  currentClass = null;
  ancestryBoosts = "No ancestry selected";
  ancestrySelected = false;
  currentAncestry = null;

  checkCount = 0;

  rolledStats = [0, 0, 0, 0, 0, 0];
  rolledStr = [" ", " ", " ", " ", " ", " "];

  statForm = this.fb.group({
    statBlock: this.fb.group({
      hp:  [5,  [Validators.required, Validators.min(8), Validators.max(18)]],
      str: [10, [Validators.required, Validators.min(8), Validators.max(18)]],
      dex: [10, [Validators.required, Validators.min(8), Validators.max(18)]],
      con: [10, [Validators.required, Validators.min(8), Validators.max(18)]],
      int: [10, [Validators.required, Validators.min(8), Validators.max(18)]],
      wis: [10, [Validators.required, Validators.min(8), Validators.max(18)]],
      cha: [10, [Validators.required, Validators.min(8), Validators.max(18)]]
    }),

    boostBlock: this.fb.group({
      strBoosted: false,
      dexBoosted: false,
      conBoosted: false,
      intBoosted: false,
      wisBoosted: false,
      chaBoosted: false
    }),

    chooseBoosts: false

  });


  get statBlock(): any {
    return this.statForm.get('statBlock');
  }

  get boostBlock(): any {
    return this.statForm.get('boostBlock');
  }

  get chooseBoosts(): any {
    return this.statForm.get('chooseBoosts')?.value;
  }

  resetStats() {

    this.statBlock.setValue(
      {
        hp: 5,
        str: 10,
        dex: 10,
        con: 10,
        int: 10,
        wis: 10,
        cha: 10
      });
  }

  resetRolls() {
    this.rolledStats = [0, 0, 0, 0, 0, 0];
    this.rolledStr = [" ", " ", " ", " ", " ", " "];
  }

  freeCount(e: Event) {
    // Increment or decrement the counter depending on
    // whether the checkbox was checked or unchecked
    this.checkCount = ((e.target as HTMLInputElement).checked 
      ? this.checkCount+1 : this.checkCount-1);
  }

  freeCheck(boost: string) {
    // Check three options before allowing user to select a checkbox:
    // Either (the choose boosts option is on and hasn't exceeded 2
    return ((this.chooseBoosts && this.checkCount >= 2)
    // OR the choose boosts option is off and hasn't exceeded 1)
        || (!this.chooseBoosts && this.checkCount >= 1))
    // AND the checkbox must not already be selected
        && !this.boostBlock.controls[boost].value ? true : null;
  }

  freeDisable() {

    if (this.currentAncestry != null && this.currentAncestry['name'] == 'Human') {
      this.statForm['controls'].chooseBoosts.setValue(true);
      return true;
    } else {
      return null;
    }
  }

  calculate() {

    if (this.currentClass != null && this.currentAncestry != null) {
      
      this.resetStats();
      // TEMP: replace with ability choice
      let chooseKey = 'keyAbility1';

      this.statBlock['controls'].hp.setValue(
        this.currentClass['hp'] + this.currentAncestry['hp']);

      // Get boosts from class and ancestry
      this.boostStat(this.currentClass[chooseKey], true);
      this.boostStat(this.currentAncestry['boost1'], true);
      this.boostStat(this.currentAncestry['boost2'], true);
      this.boostStat(this.currentAncestry['flaw'], false);

      // Get boosts from free choice(s)
      if (this.boostBlock['controls'].strBoosted.value) this.boostStat("Strength", true);
      if (this.boostBlock['controls'].dexBoosted.value) this.boostStat("Dexterity", true);
      if (this.boostBlock['controls'].conBoosted.value) this.boostStat("Constitution", true);
      if (this.boostBlock['controls'].intBoosted.value) this.boostStat("Intelligence", true);
      if (this.boostBlock['controls'].wisBoosted.value) this.boostStat("Wisdom", true);
      if (this.boostBlock['controls'].chaBoosted.value) this.boostStat("Charisma", true);
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
        this.statBlock['controls'].str.setValue(
          this.statBlock['controls'].str.value + change);
        break;
      }
      case "Dexterity": {
        this.statBlock['controls'].dex.setValue(
          this.statBlock['controls'].dex.value + change);
        break;
      }
      case "Constitution": {
        this.statBlock['controls'].con.setValue(
          this.statBlock['controls'].con.value + change);
        break;
      }
      case "Intelligence": {
        this.statBlock['controls'].int.setValue(
          this.statBlock['controls'].int.value + change);
        break;
      }
      case "Wisdom": {
        this.statBlock['controls'].wis.setValue(
          this.statBlock['controls'].wis.value + change);
        break;
      }
      case "Charisma": {
        this.statBlock['controls'].cha.setValue(
          this.statBlock['controls'].cha.value + change);
      }
    }
  }

  rollStats() {
    this.resetRolls();
    let roll = new Dice();
    let diceToRoll = [0, 0, 0, 0];

    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 4; j++) {
        diceToRoll[j] = roll.d6();
      }

      diceToRoll.sort();

      for (let j = 1; j < 4; j++) {
        this.rolledStats[i] += diceToRoll[j];
      }
      this.rolledStr[i] = 
        "|" + diceToRoll[0] + "| " + 
        diceToRoll[1] + " " + 
        diceToRoll[2] + " " + 
        diceToRoll[3] + " = " +
        this.rolledStats[i];
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

  submitCheck() {

    return !this.classSelected || !this.ancestrySelected || 
          !((this.chooseBoosts && this.checkCount >= 2) || (!this.chooseBoosts && this.checkCount >= 1))
  }

  constructor(private fb: FormBuilder) { }
}