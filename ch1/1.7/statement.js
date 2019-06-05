const createStatementData = require('./createStatementData');

const statement = (invoice, plays) => {
    return renderPlainText(createStatementData(invoice, plays));
}

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