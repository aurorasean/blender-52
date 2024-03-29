import { expect, test } from '@playwright/test';
const themes = [
	{ week: 1, theme: "Dreams" },
	{ week: 14, theme: "Futuristic " },
	{ week: 27, theme: "Sci-Fi " },
	{ week: 40, theme: "Anime" },
	{ week: 2, theme: "Geek " },
	{ week: 15, theme: "Video Games " },
	{ week: 28, theme: "Hard Surface " },
	{ week: 41, theme: "Loop" },
	{ week: 3, theme: "Neon " },
	{ week: 16, theme: "Lost " },
	{ week: 29, theme: "Vortex " },
	{ week: 42, theme: "Cubes" },
	{ week: 4, theme: "Robots " },
	{ week: 17, theme: "Launch " },
	{ week: 30, theme: "Music " },
	{ week: 43, theme: "Low Poly" },
	{ week: 5, theme: "Splash " },
	{ week: 18, theme: "Mechanical" },
	{ week: 31, theme: "Float" },
	{ week: 44, theme: "Dark" },
	{ week: 6, theme: "Garden " },
	{ week: 19, theme: "Organic " },
	{ week: 32, theme: "Radiant " },
	{ week: 45, theme: "Transport" },
	{ week: 7, theme: "Asymmetry " },
	{ week: 20, theme: "Speed " },
	{ week: 33, theme: "Weapon " },
	{ week: 46, theme: "Spin" },
	{ week: 8, theme: "Symetry" },
	{ week: 21, theme: "Tangled " },
	{ week: 34, theme: "Fragment " },
	{ week: 47, theme: "High" },
	{ week: 9, theme: "Junk" },
	{ week: 22, theme: "Isolation" },
	{ week: 35, theme: "Abstract" },
	{ week: 48, theme: "Imaginary" },
	{ week: 10, theme: "Illusion " },
	{ week: 23, theme: "Job" },
	{ week: 36, theme: "Sculpting" },
	{ week: 49, theme: "Danger" },
	{ week: 11, theme: "Wide Angle" },
	{ week: 24, theme: "Entrance " },
	{ week: 37, theme: "Wild" },
	{ week: 50, theme: "Digital" },
	{ week: 12, theme: "Cosmic " },
	{ week: 25, theme: "Empty Spaces" },
	{ week: 38, theme: "Cold " },
	{ week: 51, theme: "Power" },
	{ week: 13, theme: "Horror " },
	{ week: 26, theme: "Mirrors " },
	{ week: 39, theme: "Beasts " },
	{ week: 52, theme: "Shrink" },
]
test('index page has expected h1', async ({ page }) => {
	// await page.goto('/');
	// await expect(page.getByRole('heading', { name: 'Welcome to SvelteKit' })).toBeVisible();
	await page.goto('http://127.0.0.1:9090/');
	await page.getByPlaceholder('Positive Prompt').click();
	await page.getByLabel('Width').click();
	await page.getByLabel('Width').fill('192');
	await page.getByLabel('Height').click();
	await page.getByLabel('Height').fill('192');
	await page.getByLabel('Height').press('Enter');
	
	for await (const theme of themes) {
		await page.getByPlaceholder('Positive Prompt').fill(`${theme.theme}, <lora:KV graphic design:0.6>,abstract,masterpiece,take a photograph`);
		await page.getByPlaceholder('Negative Prompt').click();
		await page.getByPlaceholder('Negative Prompt').fill('nsfw,lowres,bad anatomy,bad hands,missing fingers,worst quality,low quality,signature,watermark,blurry,artist name,');
		await page.getByRole('button', { name: 'Invoke' }).click();
	}
	
	await page.pause();
});
