class Shot {
    shotToStar(x, y) {
        return (Math.abs(y) <= (1 / (x + (-1 + Math.sqrt(5)) / 2) + (1 + (-1 - Math.sqrt(5)) / 2) || Math.abs(y) <= (1 / (x - (-1 + Math.sqrt(5)) / 2) - (1 - (1 + Math.sqrt(5)) / 2)))) ? 4 : 0;
    }
    rand(min, max) {
        return Math.random() * max + min;
    }
    
    shotToPoint(x, y) {
        return (x === 0 && y === 0) ? 10 : 0;
    }
    shotToRhomb(x, y) {
        return ((Math.abs(x) + Math.abs(y)) <= 1) ? 3 : 0;
    }
    shotToCircle(x, y) {
        return (Math.sqrt(x ** 2 + y ** 2) <= 1) ? 2 : 0;
    }
    shotToSquare(x, y) {
        return (Math.abs(x) <= 1 && Math.abs(y) <= 1) ? 1 : 0;
    }
    shot(x, y) {
        return this.shotToPoint(x, y) ||
        this.shotToStar(x, y) ||
        this.shotToRhomb(x, y) ||
        this.shotToCircle(x, y) ||
        this.shotToSquare(x, y);
    }
    
    shotToTarget(countShoots) {
        let points = 0;
        for (let i = 0; i < countShoots; i++) {
            let x =this.rand(-2, 2);
            let y =this.rand(-2, 2);
            points += this.shot(x, y);
        }
        return points;
    }
    
}