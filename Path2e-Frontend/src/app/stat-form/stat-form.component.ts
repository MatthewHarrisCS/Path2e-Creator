import { Component } from '@angular/core';
import { Ancestry } from 'src/models/ancestry';
import { GameClass } from 'src/models/game-class';
import { Identifier } from 'src/models/identifier';
import { Racket } from 'src/models/racket';
import { FormBuilder, Validators } from '@angular/forms';
import { Dice } from 'src/dice';
import { BackendService } from '../services/backend/backend.service';
import { Background } from 'src/models/background';

@Component({
  selector: 'stat-form',
  templateUrl: './stat-form.component.html',
  styleUrls: ['./stat-form.component.css']
})
export class StatFormComponent {

  constructor(private fb: FormBuilder, private backend: BackendService) { }

  // Roll stats on component initialization
  ngOnInit() { 
    this.getData();
    this.rollStats(); 
  }

  ancestries: Ancestry[] = [];
  backgrounds: Background[] = [];
  classes: GameClass[] = [];
  rackets: Racket[] = [];

  ancestry = new Identifier("No ancestry selected", false, null);
  background = new Identifier("No background selected", false, null);
  class = new Identifier("No class selected", false, null);
  racket = new Identifier("", false, null);

  checkCount = 0;

  rolledStats = [0, 0, 0, 0, 0, 0];
  rolledString = [" ", " ", " ", " ", " ", " "];
  stats = [{index: 0, at: -1, name: "Strength"}, 
           {index: 1, at: -1, name: "Dexterity"}, 
           {index: 2, at: -1, name: "Constitution"}, 
           {index: 3, at: -1, name: "Intelligence"}, 
           {index: 4, at: -1, name: "Wisdom"}, 
           {index: 5, at: -1, name: "Charisma"}];

  // statForm: All of the values interactible through the UI
  statForm = this.fb.group({

    characterName: "",

    statBlock: this.fb.group({
      hp:  [12, [Validators.required, Validators.min(12)]],
      str: [10, [Validators.required, Validators.min(8), Validators.max(18)]],
      dex: [10, [Validators.required, Validators.min(8), Validators.max(18)]],
      con: [10, [Validators.required, Validators.min(8), Validators.max(18)]],
      itl: [10, [Validators.required, Validators.min(8), Validators.max(18)]],
      wis: [10, [Validators.required, Validators.min(8), Validators.max(18)]],
      cha: [10, [Validators.required, Validators.min(8), Validators.max(18)]]
    }),

    boostBlock: this.fb.group({
      strBoosted: false,
      dexBoosted: false,
      conBoosted: false,
      itlBoosted: false,
      wisBoosted: false,
      chaBoosted: false
    }),

    chooseRoll: false,
    chooseBoosts: false,
    backgroundKey: true,
    classKey: true
  });

  // Get variables for needed form values
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

  get classKey(): any {
    return this.statForm.get('classKey')?.value;
  }

  get boostLimit(): any {
    // Return the amount of free stat boosts given by the currently 
    // selected options (-1 for chooseRoll, +1 for chooseBoosts)
    if (this.chooseRoll && !this.chooseBoosts) return 0;
    if (!this.chooseRoll && this.chooseBoosts) return 2;
    return 1;
  }

  get rollSelected(): any {
    // Return true if chooseRoll is unselected OR if selected, 
    // if all roll stat dropdown menus have been set
    return !this.chooseRoll || this.stats.find(x => x.at == -1) == undefined;
  }

  //
  getData() {
    this.backend.getAncestries().subscribe(x => this.ancestries = x);
    this.backend.getBackgrounds().subscribe(x => this.backgrounds = x);
    this.backend.getClasses().subscribe(x => this.classes = x);
    this.backend.getRackets().subscribe(x => this.rackets = x);
  }

  // resetStats(): restore default values to the stat block
  resetStats() {
    // Set the stat block values back to their defaults
    this.statBlock.setValue(
      {
        hp:  12,
        str: 10,
        dex: 10,
        con: 10,
        itl: 10,
        wis: 10,
        cha: 10
      });
  }

  // resetRolls(): restore default values to the roll block
  resetRolls() {
    // Set the arrays to null values
    this.rolledStats = [0, 0, 0, 0, 0, 0];
    this.rolledString = [" ", " ", " ", " ", " ", " "];

    // Reset the At values for the stat list
    this.stats = [{index: 0, at: -1, name: "Strength"}, 
                  {index: 1, at: -1, name: "Dexterity"}, 
                  {index: 2, at: -1, name: "Constitution"}, 
                  {index: 3, at: -1, name: "Intelligence"}, 
                  {index: 4, at: -1, name: "Wisdom"}, 
                  {index: 5, at: -1, name: "Charisma"}];
  }

  nameCheck(name: string) {
    return name.match("^[\\w-'\" ]+$") != null;
  }
  
  nameCheckSource() {
    let name = this.statForm.get("characterName")?.value;
    return name != undefined ? this.nameCheck(name) : false;
  }

  // boundStat(): sets a given stat to a legal value
  boundStat(stat: any) {
    // Sets the given stat value within the 8-18 range if necessary
    if (stat.value > 18) stat.setValue(18);
    if (stat.value < 8) stat.setValue(8);
  }

  // boundStatBlock(): sets all stats to legal values
  boundStatBlock() {
    // Call boundStat for all six stats
    this.boundStat(this.statBlock['controls'].str);
    this.boundStat(this.statBlock['controls'].dex);
    this.boundStat(this.statBlock['controls'].con);
    this.boundStat(this.statBlock['controls'].itl);
    this.boundStat(this.statBlock['controls'].wis);
    this.boundStat(this.statBlock['controls'].cha);
  }

  // backgroundRadio(): return a Background's key ability if it exists
  backgroundRadio(boost: string) {
    return this.background.current != null ? this.background.current[boost] : "N/A"
  }

  // classRadio(): return a Class's key ability if it exists
  classRadio(boost: string) {
    return this.class.current != null ? this.class.current[boost] : "N/A"
  }

  // freeCount(): count the number of free stat options chosen
  freeCount(e: Event) {
    // Increment or decrement the counter depending on
    // whether the checkbox was checked or unchecked
    this.checkCount = ((e.target as HTMLInputElement).checked 
      ? this.checkCount+1 : this.checkCount-1);
  }

  // freeCheck(): return whether the given free stat option can be chosen
  freeCheck(boost: string) {
    // Check two options before allowing user to select a checkbox:
    // The boostLimit has not been exceeded AND the checkbox must not already be selected
    return (this.checkCount >= this.boostLimit) && (!this.boostBlock.controls[boost].value) ? true : null;
  }

  // freeDisable(): disable the free choice option if ancestry has it by default
  freeDisable() {
    // If the selected ancestry exists but does not have a set boost,
    // set the value of chooseBoosts and return true
    if (this.ancestry.current != null && this.ancestry.current['boost1'] == null) {
      this.statForm['controls'].chooseBoosts.setValue(true);
      return true;
    // else return null (necessary for [attr.disable])
    } else {
      return null;
    }
  }

  // rollSelect(): reset the At index for the selected stat
  rollSelect(stat: string, index: number) {
    // Remove the index of the unselected entry (if exists)
    this.stats.forEach(x => {if (x.at == index) x.at = -1;});

    // Register the index for the chosen stat
    this.stats.forEach(x => {if (x.name == stat) x.at = index;});

  }

  // rollFilter(): return a stats list filtering out selected options
  rollFilter(index: number) {
    // Return any stats options that are not already selected, as
    // well as the option selected by the specified dropdown menu
    return this.stats.filter(x => x.at == -1 || x.at == index);
  }

  // rollSet(): set the rolled stats into the stat block according to
  //            the dropdown options chosen by the user
  rollSet() {

    let arr = [0, 0, 0, 0, 0, 0];

    // Iterate through all of the indexed stats
    for (let i = 0; i < 6; i++) {
      // Get the dropdown-selected stat for the specific index
      let currentStat = this.stats.find(x => x.index == i);
      
      // If the stat exists and is not -1
      if (currentStat != undefined && currentStat.at >= 0) {
        // Get the rolled stat specified by the dropdown and add
        // it to the array at its stat's index
        arr[i] = this.rolledStats[currentStat.at];
      }
    }

    // Set the stats into the stat block
    this.statBlock.setValue(
      {
        hp:  12,
        str: arr[0],
        dex: arr[1],
        con: arr[2],
        itl: arr[3],
        wis: arr[4],
        cha: arr[5]
      });
  }

  // calculate(): calculate and set the stat block with all boosts and flaws
  //              from the user's chosen ancestry, background, and class
  calculate() {
    // Reset the stat block to default values
    this.resetStats();

    // If chooseRoll is enabled, set the default values to the rolled values
    if(this.chooseRoll) {
      this.rollSet();
    }

    // Get default health from ancestry and add the extra points from class
    this.statBlock['controls'].hp.setValue(this.ancestry.current['hp'] + this.class.current['hp']);

    // Apply boosts from ancestry if free choice has not been set
    if (!this.chooseBoosts) {
      this.boostStat(this.ancestry.current['boost1'], true);
      this.boostStat(this.ancestry.current['boost2'], true);
      this.boostStat(this.ancestry.current['flaw'],  false);
    }

    // Apply boosts from the user's chosen free stat boosts
    if (this.boostBlock['controls'].strBoosted.value) this.boostStat("Strength", true);
    if (this.boostBlock['controls'].dexBoosted.value) this.boostStat("Dexterity", true);
    if (this.boostBlock['controls'].conBoosted.value) this.boostStat("Constitution", true);
    if (this.boostBlock['controls'].itlBoosted.value) this.boostStat("Intelligence", true);
    if (this.boostBlock['controls'].wisBoosted.value) this.boostStat("Wisdom", true);
    if (this.boostBlock['controls'].chaBoosted.value) this.boostStat("Charisma", true);

    // Apply the boost from background. If a second option exists and has been selected, use it
    if (this.background.current.keyAbility2 == null || this.statForm.get("backgroundKey")?.value) {
      this.boostStat(this.background.current['keyAbility1'], true);
    } else {
      this.boostStat(this.background.current['keyAbility2'], true);
    }

    // Apply the boost from class. If a second option exists and has been selected, use it
    if (this.class.current.keyAbility2 == null || this.statForm.get("classKey")?.value) {
      this.boostStat(this.class.current['keyAbility1'], true);
    } else {
      // Get the chosen racket ability if necessary
      if (this.class.current['keyAbility2'] == "Racket") {
        this.boostStat(this.racket.current['keyAbility'], true);
      } else {
        this.boostStat(this.class.current['keyAbility2'], true);
      }
    }

    // Bound any stats whose values fell outside the 8-18 bound
    this.boundStatBlock();
  }

  // boostStat(): increase or decrease the specified stat by 2
  boostStat(boost: string, isBoost: boolean) {
    let change = 2;

    // If marked as flaw and free choice is off, negate change
    if(!isBoost) {
      if (this.chooseBoosts) return;
      change = -2;
    }

    // Using the specified stat, set the new value in the form
    // to the current value plus the change value
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
        this.statBlock['controls'].itl.setValue(
          this.statBlock['controls'].itl.value + change);
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

  // rollStats(): randomly generate rolled stats using Dice functions
  rollStats() {
    // Reset any saved roll values
    this.resetRolls();
    let roll = new Dice();
    let diceToRoll = [0, 0, 0, 0];

    // For each of the six stats
    for (let i = 0; i < 6; i++) {
      // Roll four d6 dice (1-6) and save them to an array
      for (let j = 0; j < 4; j++) {
        diceToRoll[j] = roll.d6();
      }

      // Sort the dice rolls from least to greatest
      diceToRoll.sort();

      // Sum the three highest rolls (the lowest is not used) 
      // and save the total value in the rolledStats array
      for (let j = 1; j < 4; j++) {
        this.rolledStats[i] += diceToRoll[j];
      }

      // Record all four dice rolls and the sum (w/ leading zero if needed)
      this.rolledString[i] = 
        "|" + diceToRoll[0] + "| " + 
        diceToRoll[1] + " " + 
        diceToRoll[2] + " " + 
        diceToRoll[3] + " = " +
        (this.rolledStats[i] < 10 ? 
          ("0" + this.rolledStats[i]) : this.rolledStats[i]);
    }
  }

  // setAncestry(): save the selected ancestry and show details
  setAncestry(name: string) {
    // If default option selected, set the ancestry to null
    if (name == "---") {
      this.ancestry.details = "No ancestry selected";
      this.ancestry.selected = false;
      this.ancestry.current = null;
    } else {
      // Find the selected ancestry in the list and save the details as a string
      let currentAncestry = this.ancestries.find((x: Ancestry) => x.name == name);
      this.ancestry.details = `${currentAncestry?.hp} HP
        ${currentAncestry?.size} Size
        Speed of ${currentAncestry?.speed} ft\n`; 

      // Record the correct amount of boosts depending on the ancestry selected
      if (currentAncestry?.boost1 == null || this.chooseBoosts) {
        this.ancestry.details = 
          this.chooseRoll ? 
            this.ancestry.details.concat(`+2 Free Stat\n`) : 
            this.ancestry.details.concat(`Two +2 Free Stats\n`);
      } else {
        if (!this.chooseRoll) this.ancestry.details = this.ancestry.details.concat(`+2 Free Stat\n`);
        this.ancestry.details = this.ancestry.details.concat(`+2 in ${currentAncestry.boost1}
          +2 in ${currentAncestry?.boost2}
          –2 in ${currentAncestry?.flaw}`);
      }

      // Set the selected boolean and save the ancestry database entry
      this.ancestry.selected = true;
      this.ancestry.current = currentAncestry;
    }
  }

  // setBackground(): save the selected background and show details
  setBackground(name: string) {
    // If default option selected, set the background to null
    if (name == "---") {
      this.background.details = "No background selected";
      this.background.selected = false;
      this.background.current = null;
    } else {
      // Find the selected background in the list and save the details as a string
      let currentBackground = this.backgrounds.find((x: Background) => x.name == name);
      this.background.details = `+2 in ${currentBackground?.keyAbility1}`;

      // If there is a second key ability, add it to the detail string
      if (currentBackground?.keyAbility2 != null) {
        this.background.details = this.background.details.concat(` or ${currentBackground.keyAbility2}`);
      }
      
      // Set the selected boolean and save the background list entry
      this.background.selected = true;
      this.background.current = currentBackground;
    }
  }
  
  // setClass(): save the selected class and show details
  setClass(name: string) {
    // If default option selected, set the class to null
    if (name == "---") {
      this.class.details = "No class selected";
      this.class.selected = false;
      this.class.current = null;
    } else {
      // Find the selected class in the list and save the details as a string
      let currentClass = this.classes.find((x: GameClass) => x.name == name);
      this.class.details = `+${currentClass?.hp} HP
        +2 in ${currentClass?.keyAbility1}`;

      // If there is a second key ability, add it to the detail string
      if (currentClass?.keyAbility2 != null) {
        this.class.details = this.class.details.concat(` or ${currentClass.keyAbility2}`);
      }
      
      // Set the selected boolean and save the class list entry
      this.class.selected = true;
      this.class.current = currentClass;
    }
  }

  // setRacket(): save the selected racket and show details
  setRacket(name: string) {
    // If default option selected, set the racket to null
    if (name == "---") {
      this.racket.details = "";
      this.racket.selected = false;
      this.racket.current = null;
    } else {
      // Find the selected racket in the list
      let currentRacket = this.rackets.find((x: Racket) => x.name == name);
      
      // If the racket has a boost, save the details as a string
      if (currentRacket?.keyAbility != null) {
        this.racket.details = `+2 in ${currentRacket.keyAbility}`;
      } else {
        this.racket.details = "";
      }
      
      // Set the selected boolean and save the racket database entry
      this.racket.selected = true;
      this.racket.current = currentRacket;
    }
  }

  // calcDisable(): disable the calculation button if any parameters
  //                have not been reached already
  calcDisable() {
    // Returns true if any of the parameters fail:
    //   * The ancestry, background, and class have not been selected
    //   * The Rogue's racket is chosen but no option has been selected
    //   * There are still free stat options available
    //   * Roll Stats has been selected but not all options have been set
    return (!this.nameCheckSource()) ||
    !this.ancestry.selected || !this.background.selected || 
    !this.class.selected || (!this.classKey && !this.racket.selected) ||
    !(this.checkCount >= this.boostLimit) || !this.rollSelected;
  }
}