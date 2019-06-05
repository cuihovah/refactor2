const createPerformanceCalculator = require('./PerformanceCalculator');

const createStatementData = (invoice, plays) => {
    const statementData = {};
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances.map(enrichPerformance);
    statementData.totalAmount = totalAmount(statementData);
    statementData.totalVolumeCredits = totalVolumeCredits(statementData);
    return statementData;

    // inline function

    function enrichPerformance(aPerformance) {
        const calculator = createPerformanceCalculator(aPerformance, playFor(aPerformance));
        const result = Object.assign({}, aPerformance);
        result.play = calculator.play;
        result.amount = calculator.amount;
        result.volumeCredits = calculator.volumeCredits;
        return result;
    }

    function playFor (aPerformance) {
        return plays[aPerformance.playID];
    }

    function totalVolumeCredits (data) {
        return data.performances
            .reduce((total, p) => total + p.volumeCredits, 0);
    }

    function totalAmount (data) {
        return data.performances
            .reduce((total, p) => total + p.amount, 0);
    }
};

module.exports = createStatementData;