export function validStat(value: any) {
  return value === null || (typeof value === 'string' && 
    (value == "Strength" ||
     value == "Dexterity" ||
     value == "Constitution" ||
     value == "Intelligence" ||
     value == "Wisdom" ||
     value == "Charisma" ||
     value == "Racket"));
}