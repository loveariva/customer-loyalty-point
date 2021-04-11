#!/usr/bin/env node

const yargs = require("yargs");

const options = yargs
 .usage("Usage: -f <order.json>")
 .option("m", { alias: "month", describe: "Month of transaction (yyyy-mm)", type: "string", demandOption: true })
 .option("o", { alias: "order", describe: "Order json file", type: "string", demandOption: true })
 .option("t", { alias: "trans", describe: "Transaction json file", type: "string", demandOption: true })
 .argv;

// Get data
var trans = require(`${options.trans}`);
var order = require(`${options.order}`);

// Calc total of amount
var totalAmountTransaction = 0
var data = trans.filter(d => {
   return ((d.user == order.user) && (d.transaction_date.substring(0, 7) == `${options.month}`))
})
data.forEach(itm => {totalAmountTransaction += itm.total_amount_transaction})

// Calc total of items
var totalItems = 0
order.products.forEach(itm => {totalItems += itm.qty})

// Calc total of point
var multiplier = (m) => {
   if (m < 1000000) return 1;
   else if (1000000 <= m && m < 10000000) return 1.05;
   else if (1000000 <= m && m < 20000000) return 1.1;
   else if (2000000 <= m && m < 30000000) return 1.2;
   else if (3000000 <= m && m < 40000000) return 1.3;
   else if (4000000 <= m) return 1.4;
}
var totalPoints = multiplier(totalAmountTransaction/10000)

// Display the results
console.info('TRANS:')
console.info(data)

console.info('ORDER:')
console.info(order)

console.info('totalAmountTransaction: ' + totalAmountTransaction)
console.info('totalPoints: ' + totalPoints)
console.info('totalItems: ' + totalItems)

