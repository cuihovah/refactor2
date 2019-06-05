# refactor2
学习重构

## 一道面试题引发的思考
>**场景:** 设想有一个戏剧演出团，演员们经常要去各种场合表演戏剧。通常客户（customs)会指定几
出剧目，而剧团则根据观众（audience)人数以及剧目类型向用户收费。改团目前演出两种
戏剧：悲剧（tragedy)和喜剧（comedy)。给客户发出账单时，剧团还会根据到场观众的数
量给出“观众量积分”（volume credit)优惠，下次客户再请剧团表演时可以使用积分获取
折扣 ———— 你可以把它看做一种提升客户忠诚度的方式。
##### 下面代码风格很乱，您对下面代码有什么优化的建议？
```javascript
const statement = (invoice, plays) => {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Statement for ${invoice.customer}`;
    const format = new Intl.NumberFormat('en-US',
                        { style: 'currency', currency: 'USD',
                            minimumFractionDigits: 2 }).format;
    for (let perf of invoice.performances) {
        const play = plays[perf.playID];
        let thisAmount = 0;

        switch (play.type) {
        case 'tragedy':
            thisAmount = 40000;
            if (perf.audience > 30) {
                thisAmount += 1000 * (perf.audience - 30);
            }
            break;
        case 'comedy':
            thisAmount = 30000;
            if (perf.audience > 20) {
                thisAmount += 1000 + 500 * (perf.audience - 20);
            }
            thisAmount += 300 * perf.audience;
            break;
        default:
            throw new Error(`unknow type: ${play.type}`);
        }

        // add volume credits
        volumeCredits += Math.max(perf.audience - 30, 0);
        // add extra credit for every ten comedy attendees
        if ('comedy' === play.type) volumeCredits += Math.floor(perf.audience / 5);
    
        // print line for this order
        result += ` ${play.name}: ${format(thisAmount / 100)} (${perf.audience} seats)\n`;
        totalAmount += thisAmount;
    }
    result += `Amount owed is ${format(totalAmount / 100)}\n`;
    result += `You earned ${volumeCredits} credits\n`;
    return result;
};

module.exports = statement;
```

invoices.json ...
```json
[
    {
        "customer": "BigCo",
        "performances": [{
            "playID": "hamlet",
            "audience": 55
        },{
            "playID": "as-like",
            "audience": 35
        },{
            "playID": "othello",
            "audience": 40
        }]
    }
]```

plays.json ...
```json
{
    "hamlet": {"name": "Hamlet", "type": "tragedy"},
    "as-like": {"name": "As You Like it", "type": "comedy"},
    "othello": {"name": "Othello", "type": "tragedy"}
}
```
