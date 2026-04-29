import { expect, test } from '@playwright/test'

test('homepage loads and displays products', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('link', { name: 'ATELIER' })).toBeVisible()
  await expect(page.getByRole('heading', { name: /Featured Collection/i })).toBeVisible()

  const productLinks = page.locator('a[href^="/products/"]')
  await expect(productLinks.first()).toBeVisible()
})

