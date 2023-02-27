import { Component } from '@angular/core';
import { Ancestry } from 'src/models/ancestry';
import { GameClass } from 'src/models/game-class';
import { Identifier } from 'src/models/identifier';
import { Racket } from 'src/models/racket';
import { ANCESTRY_LIST, BACKGROUND_LIST, CLASS_LIST, RACKET_LIST } from 'src/temp-db';
import { FormBuilder, Validators } from '@angular/forms';
import { Dice } from 'src/dice';
import { STRING_TYPE } from '@angular/compiler';

@Component({
  selector: 'stat-form',
  templateUrl: './stat-form.component.html',
  styleUrls: ['./stat-form.component.css']
})
export class StatFormComponent {

  constructor(private fb: FormBuilder) { }

  ngOnInit() { this.rollStats(); }


  /* 
  
  TODO:
    Roll Stats - full implementation
    Backend to save character

  */

  ancestries = ANCESTRY_LIST;
  backgrounds = BACKGROUND_LIST;
  classes = CLASS_LIST;
  rackets = RACKET_LIST;
  ancestry = new Identifier("No ancestry selected", false, null);
  background = new Identifier("No background selected", false, null);
  class = new Identifier("No class selected", false, null);
  racket = new Identifier("", false, null);

  checkCount = 0;

  rolledStats = [0, 0, 0, 0, 0, 0];
  rolledString = [" ", " ", " ", " ", " ", " "];
  stats = [{name: "Strength", acr: "str", at: -1}, 
           {name: "Dexterity", acr: "dex", at:-1}, 
           {name: "Constitution", acr: "con", at: -1}, 
           {name: "Intelligence", acr: "int", at: -1}, 
           {name: "Wisdom", acr: "wis", at: -1}, 
           {name: "Charisma", acr: "cha", at: -1}];

  statForm = this.fb.group({
    statBlock: this.fb.group({
      hp:  [12, [Validators.required, Validators.min(12)]],
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

    chooseRoll: false,
    chooseBoosts: false,
    boostLimit: 2,
    backgroundKey: true,
    classKey: true
  });


  get statBlock(): any {
    return this.statForm.get('statBlock');
  }

  get boostBlock(): any {
    return this.statForm.get('boostBlock');
  }

  get chooseRoll(): any {
    return this.statForm.get('chooseRoll')?.value;
  }

  get chooseBoosts(): any {
    return this.statForm.get('chooseBoosts')?.value;
  }

  get boostLimit(): any {
    return this.statForm.get('boostLimit')?.value;
  }

  get classKey(): any {
    return this.statForm.get('classKey')?.value;
  }

  resetStats() {

    this.statBlock.setValue(
      {
        hp:  12,
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
    this.rolledString = [" ", " ", " ", " ", " ", " "];
    this.stats = [{name: "Strength", acr: "str", at: -1}, 
                  {name: "Dexterity", acr: "dex", at:-1}, 
                  {name: "Constitution", acr: "con", at: -1}, 
                  {name: "Intelligence", acr: "int", at: -1}, 
                  {name: "Wisdom", acr: "wis", at: -1}, 
                  {name: "Charisma", acr: "cha", at: -1}];
  }

  backgroundRadio(boost: string) {
    return this.background.current != null ? this.background.current[boost] : "N/A"
  }

  classRadio(boost: string) {
    return this.class.current != null ? this.class.current[boost] : "N/A"
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
        || (!this.chooseBoosts && this.checkCount >= this.boostLimit - 1))
    // AND the checkbox must not already be selected
        && !this.boostBlock.controls[boost].value ? true : null;
  }

  freeDisable() {

    if (this.ancestry.current != null && this.ancestry.current['boost1'] == null) {
      this.statForm['controls'].chooseBoosts.setValue(true);
      return true;
    } else {
      return null;
    }
  }

  rollSelect(stat: string, index: number) {
    // Remove the index of the unselected entry (if exists)
    this.stats.forEach(x => {if (x.at == index) x.at = -1;});

    // Register the index for the chosen stat
    this.stats.forEach(x => {if (x.name == stat) x.at = index;});

  }

  rollFilter(index: number) {
    return this.stats.filter(x => x.at == -1 || x.at == index);
  }

  rollSet() {

    //
    //
    // IN PROGRESS
    //
    //
    let arr = [0, 0, 0, 0, 0, 0];
    for (let i = 0; i < 6; i++) {
      let currentStat = this.stats.find(x => x.at == i);
      console.log(currentStat);
      if (currentStat?.acr != undefined) {
        arr[i] = this.rolledStats[this.statBlock.controls[currentStat?.acr]?.index];
      }
    }

    console.log(arr);

    this.statBlock.setValue(
      {
        hp:  12,
        str: arr[0],
        dex: arr[1],
        con: arr[2],
        int: arr[3],
        wis: arr[4],
        cha: arr[5]
      });
  }

  calculate() {
    // Doesn't calculate unless all of the properties exists
    if (this.ancestry.current != null && this.background.current != null && this.class.current != null) {
      
      this.resetStats();

      if(this.chooseRoll) {
        this.rollSet();
      }

      // Set the health to 
      this.statBlock['controls'].hp.setValue(
        this.class.current['hp'] + this.ancestry.current['hp']);

      // Get boosts from ancestry
      this.boostStat(this.ancestry.current['boost1'], true);
      this.boostStat(this.ancestry.current['boost2'], true);
      this.boostStat(this.ancestry.current['flaw'],  false);

      // Get boosts from free choice(s)
      if (this.boostBlock['controls'].strBoosted.value) this.boostStat("Strength", true);
      if (this.boostBlock['controls'].dexBoosted.value) this.boostStat("Dexterity", true);
      if (this.boostBlock['controls'].conBoosted.value) this.boostStat("Constitution", true);
      if (this.boostBlock['controls'].intBoosted.value) this.boostStat("Intelligence", true);
      if (this.boostBlock['controls'].wisBoosted.value) this.boostStat("Wisdom", true);
      if (this.boostBlock['controls'].chaBoosted.value) this.boostStat("Charisma", true);

      // Get boost from background. If a second option exists and has been selected, use it
      if (this.background.current.keyAbility2 == null || this.statForm.get("backgroundKey")?.value) {
        this.boostStat(this.background.current['keyAbility1'], true);
      } else {
        this.boostStat(this.background.current['keyAbility2'], true);
      }

      // Get boost from class. If a second option exists and has been selected, use it
      if (this.class.current.keyAbility2 == null || this.statForm.get("classKey")?.value) {
        this.boostStat(this.class.current['keyAbility1'], true);
      } else {
        if (this.class.current['keyAbility2'] == "Racket") {
          this.boostStat(this.racket.current['keyAbility'], true);
        } else {
          this.boostStat(this.class.current['keyAbility2'], true);
        }
      }
    }
  }

  boostStat(boost: string, isBoost: boolean) {

    let change = 2;

    // If marked as flaw and free choice is off, negate change
    if(!isBoost) {
      if (this.chooseBoosts) return;
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
      this.rolledString[i] = 
        "|" + diceToRoll[0] + "| " + 
        diceToRoll[1] + " " + 
        diceToRoll[2] + " " + 
        diceToRoll[3] + " = " +
        (this.rolledStats[i] < 10 ? 
          ("0" + this.rolledStats[i]) : this.rolledStats[i]);
    }
  }

  showAncestryBoosts(name: string) {

    if (name == "---") {
      this.ancestry.details = "No ancestry selected";
      this.ancestry.selected = false;
      this.ancestry.current = null;
    } else {
      let currentAncestry = this.ancestries.find((x: Ancestry) => x.name == name);
      this.ancestry.details = `${currentAncestry.hp} HP
        ${currentAncestry.size} Size
        Speed of ${currentAncestry.speed} ft\n`; 

      if (currentAncestry.boost1 == null || this.chooseBoosts) {
        this.ancestry.details = 
          this.chooseRoll ? 
            this.ancestry.details.concat(`+2 Free Stat\n`) : 
            this.ancestry.details.concat(`Two +2 Free Stats\n`);
      } else {
        if (!this.chooseRoll) this.ancestry.details = this.ancestry.details.concat(`+2 Free Stat\n`);
        this.ancestry.details = this.ancestry.details.concat(`+2 in ${currentAncestry.boost1}
          +2 in ${currentAncestry.boost2}
          –2 in ${currentAncestry.flaw}`);
      }

      this.ancestry.selected = true;
      this.ancestry.current = currentAncestry;
    }
  }

  showBackgroundBoosts(name: string) {

    if (name == "---") {
      this.background.details = "No background selected";
      this.background.selected = false;
      this.background.current = null;
    } else {
      let currentBackground = this.backgrounds.find((x: GameClass) => x.name == name);
      this.background.details = `+2 in ${currentBackground.keyAbility1}`;

      if (currentBackground.keyAbility2 != null) {
        this.background.details = this.background.details.concat(` or ${currentBackground.keyAbility2}`);
      }
      
      this.background.selected = true;
      this.background.current = currentBackground;
    }
  }
  
  showClassBoosts(name: string) {

    if (name == "---") {
      this.class.details = "No class selected";
      this.class.selected = false;
      this.class.current = null;
    } else {
      let currentClass = this.classes.find((x: GameClass) => x.name == name);
      this.class.details = `+${currentClass.hp} HP
        +2 in ${currentClass.keyAbility1}`;

      if (currentClass.keyAbility2 != null) {
        this.class.details = this.class.details.concat(` or ${currentClass.keyAbility2}`);
      }
      
      this.class.selected = true;
      this.class.current = currentClass;
    }
  }

  showRacketBoosts(name: string) {

    if (name == "---") {
      this.racket.details = "";
      this.racket.selected = false;
      this.racket.current = null;
    } else {
      let currentRacket = this.rackets.find((x: Racket) => x.name == name);
      
      if (currentRacket.keyAbility != null) {
        this.racket.details = `+2 in ${currentRacket.keyAbility}`;
      } else {
        this.racket.details = "";
      }
      
      this.racket.selected = true;
      this.racket.current = currentRacket;
    }
  }

  submitCheck() {

    if (this.boostLimit == null) return false;

    return !this.ancestry.selected || !this.background.selected || 
    !this.class.selected || (!this.classKey && !this.racket.selected) ||
    !((this.chooseBoosts && this.checkCount >= this.boostLimit) || 
     (!this.chooseBoosts && this.checkCount >= this.boostLimit - 1));
  }
}