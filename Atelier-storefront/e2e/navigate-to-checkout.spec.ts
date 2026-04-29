import { expect, test } from '@playwright/test'
import { addFirstProductToCart, openCart } from './helpers/cart'

test('user can navigate to checkout', async ({ page }) => {
  await addFirstProductToCart(page)

  await openCart(page)

  await page.getByRole('button', { name: /Checkout/i }).click()

  // In local/mock mode, checkout is handled via /checkout page.
  await expect(page).toHaveURL(/\/checkout/)
  await expect(page.getByRole('heading', { name: /Checkout/i })).toBeVisible()
})

