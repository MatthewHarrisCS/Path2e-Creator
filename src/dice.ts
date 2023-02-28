export class Dice {
    
    // Roll a d4 dice (1-4)
    d4() {
        return Math.floor(1 + (Math.random() * 4));
    }

    // Roll a d6 dice (1-6)
    d6() {
        return Math.floor(1 + (Math.random() * 6));
    }

    // Roll a d8 dice (1-8)
    d8() {
        return Math.floor(1 + (Math.random() * 8));
    }
    
    // Roll a d10 dice (1-10)
    d10() {
        return Math.floor(1 + (Math.random() * 10));
    }
    
    // Roll a d12 dice (1-12)
    d12() {
        return Math.floor(1 + (Math.random() * 12));
    }
    
    // Roll a d20 dice (1-20)
    d20() {
        return Math.floor(1 + (Math.random() * 20));
    }

    // Roll a d% dice (1-100)
    dPercentage() {
        return Math.floor(1 + (Math.random() * 100));
    }
}