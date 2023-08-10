// @ts-check
import { test, expect } from '@playwright/test';

const CAT_PREFIX_IMAGE_URL = 'https://cataas.com/'
const LOCALHOST_URL = 'http://localhost:5173/'

test('app shows random fact and image', async ({ page }) => {
  await page.goto(LOCALHOST_URL);
  
  const text = await page.getByRole('paragraph')
  const image = await page.getByRole('img')

  const textContent = await text.textContent()
  const imageSrc = await image.getAttribute('src')

  await expect(textContent?.length).toBeGreaterThan(0)
  await expect(imageSrc?.startsWith(CAT_PREFIX_IMAGE_URL)).toBeTruthy()
});

test('checks if the fact and the image changes when the button is clicked', async ({page}) => {
  await page.goto(LOCALHOST_URL)

  const firstFact = await page.getByRole('paragraph').textContent()
  const firstImage = await page.getByRole('img').getAttribute('src')

  await page.getByRole('button').click()
  await page.waitForTimeout(1000)

  const secondFact = await page.getByRole('paragraph').textContent()
  const secondImage = await page.getByRole('img').getAttribute('src')

  expect(secondFact, 'should be a different fact').not.toEqual(firstFact)
  expect(secondImage, 'should be a different image').not.toEqual(firstImage)
})
