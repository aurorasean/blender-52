import { expect, test } from '@playwright/test';

test('index page has expected h1', async ({ page }) => {
	
	await page.goto('http://127.0.0.1:9090/');
	await page.getByPlaceholder('Positive Prompt').click();
	await page.getByPlaceholder('Positive Prompt').fill('job');
	await page.getByPlaceholder('Negative Prompt').click();
	await page.getByPlaceholder('Negative Prompt').fill('not this');
	await page.getByLabel('Width').click();
	await page.getByLabel('Width').fill('512');
	await page.getByLabel('Height').click();
	await page.getByLabel('Height').fill('512');
	await page.getByLabel('Height').press('Enter');
	await page.getByRole('button', { name: 'Invoke' }).click();
	await page.getByText('1', { exact: true }).click();
	await page.pause();
});
