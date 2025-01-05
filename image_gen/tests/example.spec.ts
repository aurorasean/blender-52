import { test, expect } from '@playwright/test';
import fs from 'fs-extra';
const typeAi = {
  'Painterly': /^Concept Art \(Painterly\)$/,
  'Character': /^Concept Art \(Character\)$/,
  'SciFi': /^Concept Art \(Sci-Fi\)$/,
  'Fantasy': /^Concept Art \(Fantasy\)$/,
}
const data = [
  { week: 1, theme: "Robotic", type: typeAi.Character },
  { week: 14, theme: "Cyber ", type: typeAi.SciFi },
  { week: 27, theme: "Escape ", type: typeAi.Fantasy },
  { week: 40, theme: "Towers", type: typeAi.SciFi },
  { week: 2, theme: "Cozy ", type: typeAi.Fantasy },
  { week: 15, theme: "Loop ", type: typeAi.Fantasy },
  { week: 28, theme: "Warriors ", type: typeAi.Character },
  { week: 41, theme: "Nighmare", type: typeAi.Fantasy },
  { week: 3, theme: "Organic ", type: typeAi.Painterly },
  { week: 16, theme: "Moulded ", type: typeAi.Painterly },
  { week: 29, theme: "Captured ", type: typeAi.SciFi },
  { week: 42, theme: "Sharp", type: typeAi.Fantasy },
  { week: 4, theme: "Ornamental ", type: typeAi.Fantasy },
  { week: 17, theme: "Hand Crafted ", type: typeAi.Painterly },
  { week: 30, theme: "Weapons ", type: typeAi.SciFi },
  { week: 43, theme: "Music ", type: typeAi.SciFi },
  { week: 5, theme: "Sun ", type: typeAi.SciFi },
  { week: 18, theme: "Transport", type: typeAi.SciFi },
  { week: 31, theme: "Low Poly ", type: typeAi.Fantasy },
  { week: 44, theme: "Dark ", type: typeAi.Fantasy },
  { week: 6, theme: "Heroes ", type: typeAi.Character },
  { week: 19, theme: "Devils ", type: typeAi.Character },
  { week: 32, theme: "Microscopic ", type: typeAi.SciFi },
  { week: 45, theme: "Illusions ", type: typeAi.Fantasy },
  { week: 7, theme: "Clay ", type: typeAi.Fantasy },
  { week: 20, theme: "Mysterious ", type: typeAi.Fantasy },
  { week: 33, theme: "Ink ", type: typeAi.Fantasy },
  { week: 46, theme: "Labyrinth ", type: typeAi.Fantasy },
  { week: 8, theme: "1970's", type: typeAi.SciFi },
  { week: 21, theme: "Science ", type: typeAi.SciFi },
  { week: 34, theme: "Food ", type: typeAi.SciFi },
  { week: 47, theme: "Lego ", type: typeAi.Fantasy },
  { week: 9, theme: "Detective ", type: typeAi.Character },
  { week: 22, theme: "Magic ", type: typeAi.Fantasy },
  { week: 35, theme: "Hologram ", type: typeAi.SciFi },
  { week: 48, theme: "Curved ", type: typeAi.SciFi },
  { week: 10, theme: "Spell ", type: typeAi.Fantasy },
  { week: 23, theme: "Beasts ", type: typeAi.Character },
  { week: 36, theme: "Deadly Sins ", type: typeAi.SciFi },
  { week: 49, theme: "Interior ", type: typeAi.SciFi },
  { week: 11, theme: "Pokemon ", type: typeAi.Character },
  { week: 24, theme: "Fairy Tales ", type: typeAi.Character },
  { week: 37, theme: "Sport ", type: typeAi.Fantasy },
  { week: 50, theme: "Weighted ", type: typeAi.SciFi },
  { week: 12, theme: "Games ", type: typeAi.SciFi },
  { week: 25, theme: "Broken ", type: typeAi.SciFi },
  { week: 38, theme: "Spin ", type: typeAi.Fantasy },
  { week: 51, theme: "Expanse ", type: typeAi.SciFi },
  { week: 13, theme: "Mechanical ", type: typeAi.SciFi },
  { week: 26, theme: "Digital ", type: typeAi.SciFi },
  { week: 39, theme: "Hard Surface ", type: typeAi.SciFi },
  { week: 52, theme: "Heist ", type: typeAi.SciFi },
]

test('has title', async ({ page }) => {

  await page.goto('http://127.0.0.1:9090');
  await page.getByTestId('image-settings-accordion').getByLabel('Width').click();
  await page.getByTestId('image-settings-accordion').getByLabel('Width').press('ControlOrMeta+a');
  await page.getByTestId('image-settings-accordion').getByLabel('Width').fill('192');
  await page.getByTestId('image-settings-accordion').getByLabel('Width').press('Tab');
  await page.getByLabel('Close', { exact: true }).click();
  await page.getByLabel('Height').click();
  await page.getByLabel('Height').fill('192');

  for await (const item of data) {
    const sel = "button[aria-label='View Template List']";
    await page.locator(sel).click();
    await page.locator('div').filter({ hasText: item.type }).first().click();
    await page.locator('#prompt').click();
    await page.locator('#negativePrompt').fill('People\n');

    await page.locator('#prompt').fill(`${item.theme}, space, low poly, pixel, abstract`);
    await page.getByRole('button', { name: 'Invoke' }).click();
    await page.waitForTimeout(1000);
    const cancelButton = await page.getByTestId('Cancel')

    while (await cancelButton.isEnabled()) {
      await page.waitForTimeout(1000);
    }
    const image = await page.locator('#main-panel img');
    await image.click();
    const imageUrl = await image.getAttribute('src');

    if (!imageUrl) {
      throw new Error('Image URL not found');
    }

    const response = await page.request.get(`http://127.0.0.1:9090/${imageUrl}`);
    const buffer = await response.body();
    fs.writeFileSync(`${item.week}.png`, buffer);
  }
});
