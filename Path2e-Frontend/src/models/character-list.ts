import { Ancestry } from "./ancestry"
import { Background } from "./background";
import { GameClass } from "./game-class";

export class CharacterList {
    constructor(
        public _id: string,
        public ancestry: Ancestry,
        public background: Background,
        public gameClass: GameClass,
        public level: number,
        public name: string,
        public stats: {
            cha: number,
            con: number,
            dex: number,
            hp:  number,
            itl: number,
            str: number,
            wis: number
        },
        public user: string,
        public gameClassChoice: boolean,
        public backgroundChoice: boolean
    ) {}
}