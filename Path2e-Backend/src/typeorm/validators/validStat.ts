import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function ValidStat(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'validStat',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          return typeof value === 'string' && 
            (value == null ||
             value == "Strength" ||
             value == "Dexterity" ||
             value == "Constitution" ||
             value == "Intelligence" ||
             value == "Wisdom" ||
             value == "Charisma");
        },
      },
    });
  };
}