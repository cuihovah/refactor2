const statement = (invoice, plays) => {
    return renderPlainText(createStatementData(invoice, plays));
}

const createStatementData = (invoice, plays) => {
    const statementData = {};
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances.map(enrichPerformance);
    statementData.totalAmount = totalAmount(statementData);
    statementData.totalVolumeCredits = totalVolumeCredits(statementData);
    return statementData;

    // inline function

    function enrichPerformance(aPerformance) {
        const result = Object.assign({}, aPerformance);
        result.play = playFor(result);
        result.amount = amountFor(result);
        result.volumeCredits = volumeCreditsFor(result);
        return result;
    }

    function playFor (aPerformance) {
        return plays[aPerformance.playID];
    }

    function volumeCreditsFor (perf) {
        let result = 0;
        result += Math.max(perf.audience - 30, 0);
        if ('comedy' === perf.play.type) result += Math.floor(perf.audience / 5);
        return result;
    }

    function amountFor (aPerformance) {
        let result = 0;
        switch (aPerformance.play.type) {
        case 'tragedy':
            result = 40000;
            if (aPerformance.audience > 30) {
                result += 1000 * (aPerformance.audience - 30);
            }
            break;
        case 'comedy':
            result = 30000;
            if (aPerformance.audience > 20) {
                result += 1000 + 500 * (aPerformance.audience - 20);
            }
            result += 300 * aPerformance.audience;
            break;
        default:
            throw new Error(`unknow type: ${aPerformance.play.type}`);
        }
        return result;
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

const renderPlainText = (data) => {

   // function content ...
   let result = `Statement for ${data.customer}`;
   for (let perf of data.performances) {
       // print line for this order
       result += ` ${perf.play.name}: ${usd(perf.amount / 100)} (${perf.audience} seats)\n`;
   }
   result += `Amount owed is ${usd(data.totalAmount / 100)}\n`;
   result += `You earned ${data.totalVolumeCredits} credits\n`;
   return result;


   // inline function

   function usd (aNumber) {
       return new Intl.NumberFormat('en-US',
                   { style: 'currency', currency: 'USD',
                       minimumFractionDigits: 2 }).format(aNumber);
   }
  
};

const htmlStatement = (invoice, plays) => {
    return renderHtml(createStatementData(invoice, plays));
}

const renderHtml = (data) => {

    // function content ...
    let result = `<h1>Statement for ${data.customer}</h1>`;
    for (let perf of data.performances) {
        // print line for this order
        result += ` <div>${perf.play.name}: ${usd(perf.amount / 100)} (${perf.audience} seats)</div>`;
    }
    result += `<div>Amount owed is ${usd(data.totalAmount / 100)}</div>`;
    result += `<div>You earned ${data.totalVolumeCredits} credits</div>`;
    return result;
 
 
    // inline function
 
    function usd (aNumber) {
        return new Intl.NumberFormat('en-US',
                    { style: 'currency', currency: 'USD',
                        minimumFractionDigits: 2 }).format(aNumber);
    }
   
 };

module.exports = {statement, htmlStatement};