require('dotenv').config();
const puppeteer = require('puppeteer');
const prompt = require('prompt-sync')();

(async () => {
	try {
		let username = prompt('Digite o seu usuario do instagram... ');

		const browser = await puppeteer.launch({
			//headless: false,
		});
		const page = await browser.newPage();

		//await page.goto('https://www.instagram.com/accounts/login/');
		//await page.waitForSelector('input[name="username"]');
		//await page.type('input[name="username"]', username);
		//await page.type('input[name="password"]', password);
		//await page.click('button[type="submit"]');

		//await page.waitForNavigation();

		await page.goto(`https://www.instagram.com/${username}/`);

		const publications = await page.$eval(
			'.k9GMp > :nth-child(1) ',
			(el) => el.innerText
		);
		const followers = await page.$eval(
			'.k9GMp > :nth-child(2) ',
			(el) => el.innerText
		);
		const following = await page.$eval(
			'.k9GMp > :nth-child(3) ',
			(el) => el.innerText
		);

		console.log(
			'Link do seu perfil',
			`https://www.instagram.com/${username}/`
		);
		console.log(`${publications} ${followers} ${following}`);

		await browser.close();
	} catch {
		console.log('Perfil inválido');
        process.exit();
	}
})();
