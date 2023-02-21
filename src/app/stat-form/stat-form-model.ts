export class StatForm {
    constructor(
        public hp: number,
        public str: number,
        public dex: number,
        public con: number,
        public int: number,
        public wis: number,
        public cha: number,

        public strBoosted: boolean,
        public dexBoosted: boolean,
        public conBoosted: boolean,
        public intBoosted: boolean,
        public wisBoosted: boolean,
        public chaBoosted: boolean,
    ) {}
}