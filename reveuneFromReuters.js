//Go to financial highlight at reuters
//https://www.reuters.com/finance/stocks/financial-highlights/TICKER

const tdData = document.querySelectorAll("td.data");
let thisYearRevenue = 0.0;
for (let index = 0; index < 7; index = index + 2) {
    let revenueText = tdData[index].innerText;
    let revenue = parseFloat(revenueText);
    thisYearRevenue = thisYearRevenue + revenue;
}

let lastYearRevenue = 0.0;
for (let index = 8; index < 15; index = index + 2) {
    let revenueText = tdData[index].innerText;
    let revenue = parseFloat(revenueText);
    lastYearRevenue = lastYearRevenue + revenue;
}
const revenueGrowthCompareToLastYear = 100 * (thisYearRevenue - lastYearRevenue) / lastYearRevenue;
console.log(`RevenueGrowthCompareToLastYear: `, revenueGrowthCompareToLastYear);

const latestQtrRevenue = parseFloat(tdData[0].innerText);
const lastYearSameQtrRevenue = parseFloat(tdData[8].innerText);
const revenueGrowthCompareToLastQtr = 100 * (latestQtrRevenue - lastYearSameQtrRevenue) / lastYearSameQtrRevenue;
console.log(`revenueGrowthCompareToLastQtr: `, revenueGrowthCompareToLastQtr);