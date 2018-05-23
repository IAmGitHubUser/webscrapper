const puppeteer = require('puppeteer');
var fs = require('fs');
var http = require('http');
var holdings = require('./holdings.json');
const alpha = require('alphavantage')({ key: 'XYZ' });
var yahooStockPrices = require('yahoo-stock-prices');

// yahooStockPrices.getCurrentPrice('AAPL', function(err, price) {

//     console.log(price);

// });


for (var holding in holdings) {;
    const ticker = holdings[holding].ticker;
    const marketValue = holdings[holding].marketValue;
    process.stdout.write(`Checking for ${ticker} with ${marketValue} marketValue. \n`);

    // runMorningStarStyleBox(ticker)
    // runVanguard(holdings[holding].ticker);
    runMorningStarSectorWeight(ticker);



}

async function runVanguard(ticker) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    const url = `https://investor.vanguard.com/mutual-funds/profile/${ticker}`;
    await page.goto(url);
    const priceSelector = ".arrange";
    console.log("url", url);

    let price = await page.evaluate((sel) => {
        return document.querySelectorAll(sel)[1].innerHTML;
    }, priceSelector);

    console.log(price);
    browser.close();
}


async function runMorningStarStyleBox(ticker) {
    const browser = await puppeteer.launch({ headless: true });

    //Launches headless browser
    // const browser = await puppeteer.launch();

    const page = await browser.newPage();

    const fundUrlOnMorningstar = `http://portfolios.morningstar.com/fund/summary?t= ${ticker} &region=usa&culture=en_US`;
    await page.goto(fundUrlOnMorningstar);

    const holdingStyleSelctor = ".holdinglabel";
    await process.stdout.write(`\n ${ticker} `);

    for (var i = 0; i < 9; i++) {
        let boxStyleNumber = await page.evaluate((sel, holdingStyleNumberIndex) => {
            return document.querySelectorAll(sel)[holdingStyleNumberIndex].innerHTML;
        }, holdingStyleSelctor, i);

        process.stdout.write(`${boxStyleNumber} `);
    }


    browser.close();
}


async function runMorningStarSectorWeight(ticker) {
    const browser = await puppeteer.launch({ headless: true });

    const page = await browser.newPage();

    const fundUrlOnMorningstar = `http://portfolios.morningstar.com/fund/summary?t= ${ticker} &region=usa&culture=en_US`;
    await page.goto(fundUrlOnMorningstar);

    const sectorWeightSelctor = "#sector_we_tab td[align='right']";
    await process.stdout.write(`\n ${ticker} `);

    for (var i = 0; i < 42; i++) {
        let sectorWeight = await page.evaluate((sel, index) => {
            return document.querySelectorAll(sel)[index].innerHTML;
        }, sectorWeightSelctor, i);

        if (i === 3 || i === 6 || i === 9 || i === 12 || i === 18 || i === 21 || i === 24 || i === 27 || i === 33 || i === 36 || i === 39) {
            process.stdout.write(`${sectorWeight} `);
        }


    }


    browser.close();
}