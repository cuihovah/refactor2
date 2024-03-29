class PerformanceCalculator {
    constructor(aPerformance, aPlay) {
        this.performance = aPerformance;
        this.play = aPlay;
    }
    get amount() {
        let result = 0;
        switch (this.play.type) {
        case 'tragedy':
            result = 40000;
            if (this.performance.audience > 30) {
                result += 1000 * (this.performance.audience - 30);
            }
            break;
        case 'comedy':
            result = 30000;
            if (this.performance.audience > 20) {
                result += 1000 + 500 * (this.performance.audience - 20);
            }
            result += 300 * this.performance.audience;
            break;
        default:
            throw new Error(`unknow type: ${this.play.type}`);
        }
        return result;
    }
    get volumeCredits() {
        let result = 0;
        result += Math.max(this.performance.audience - 30, 0);
        if ('comedy' === this.play.type) result += Math.floor(this.performance.audience / 5);
        return result;
    }
}

module.exports = PerformanceCalculator;