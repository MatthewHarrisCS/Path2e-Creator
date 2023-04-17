export class RegExp {
    
  // email(): validate the provided email using a regular expression
  public static email(str: string) {
    return str.match("^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$") != null;
  }

  // username(): validate the provided username using a regular expression
  public static username(str: string) {
    return str.match("^[\\w]+$") != null;
  }

  // characterName(): validate the provided name using a regular expression
  public static characterName(str: string) {
    return str.match("^[\\w-'\" ]+$") != null;
  }
}