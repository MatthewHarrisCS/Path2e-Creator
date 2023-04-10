import { Ancestry } from "./ancestry";
import { Background } from "./background";
import { GameClass } from "./game-class";

export class CharacterSheet {
    constructor(
        public name: string,
        public user: string,
        public ancestry: Ancestry,
        public background: Background,
        public gameClass: GameClass,
        public stats: {
            hp: number,
            str: number,
            dex: number,
            con: number,
            itl: number,
            wis: number,
            cha: number,
        },
        public backgroundChoice: boolean,
        public gameClassChoice: boolean
    ) {}
}
