import pptr from 'puppeteer';
import 'dotenv/config';

async function run() {
    const browser = await pptr.launch({ 'headless': 'new' });
    const [page] = await browser.pages();
    const url = 'https://www.instagram.com/accounts/edit/';
    await page.goto(url);
    await page.setCookie({
        name: 'sessionid',
        value: process.env.sessionid
    });
    await page.reload();
    const textarea = await page.waitForXPath('//*[@id="pepBio"]');
    await textarea.click({ clickCount: 3 });
    await textarea.type(new Date().toString());
    const button = await page.$('div.x1i10hfl:nth-child(1)[role="button"]');
    await button.click();
    console.log(`Bio updated to ${new Date().toString()}`);
    await browser.close();
}

run();
