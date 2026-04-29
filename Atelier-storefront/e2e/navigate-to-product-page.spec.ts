import { expect, test } from '@playwright/test'

test('user can navigate to a product page', async ({ page }) => {
  await page.goto('/')

  const productLink = page.locator('a[href^="/products/"]').first()
  await expect(productLink).toBeVisible()
  await productLink.click()

  await expect(page).toHaveURL(/\/products\//)
  await expect(page.getByRole('button', { name: /Add to Bag/i })).toBeVisible()
})

