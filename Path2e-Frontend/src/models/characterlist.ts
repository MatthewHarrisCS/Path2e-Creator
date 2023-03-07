import { Ancestry } from "./ancestry"
import { Background } from "./background";
import { GameClass } from "./game-class";

export class CharacterList {
    constructor(
        public ancestry: Ancestry,
        public background: Background,
        public cha: number,
        public con: number,
        public dex: number,
        public gameClass: GameClass,
        public hp: number,
        public itl: number,
        public name: string,
        public str: number,
        public user: string,
        public wis: number,
    ) {}
}