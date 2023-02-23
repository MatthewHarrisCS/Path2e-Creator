export class Dice {
    
    d4() {
        return Math.floor(1 + (Math.random() * 4));
    }

    d6() {
        return Math.floor(1 + (Math.random() * 6));
    }

    d8() {
        return Math.floor(1 + (Math.random() * 8));
    }
    
    d10() {
        return Math.floor(1 + (Math.random() * 10));
    }
    
    d12() {
        return Math.floor(1 + (Math.random() * 12));
    }
    
    d20() {
        return Math.floor(1 + (Math.random() * 20));
    }

    dPercentage() {
        return Math.floor(1 + (Math.random() * 100));
    }
}