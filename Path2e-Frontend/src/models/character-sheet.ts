export class CharacterSheet {
    constructor(
        public name: string,
        public user: string,
        public ancestry: string,
        public background: string,
        public gameClass: string,
        public hp: number,
        public str: number,
        public dex: number,
        public con: number,
        public itl: number,
        public wis: number,
        public cha: number,
        public backgroundChoice: boolean,
        public gameClassChoice: boolean
    ) {}
}