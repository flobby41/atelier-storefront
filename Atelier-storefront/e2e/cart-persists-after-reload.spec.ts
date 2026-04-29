import { expect, test } from '@playwright/test'
import { addFirstProductToCart, openCart } from './helpers/cart'

test('cart persists after page reload', async ({ page }) => {
  await addFirstProductToCart(page)

  await openCart(page)
  await expect(page.getByRole('button', { name: /Checkout/i })).toBeVisible()

  await page.reload()

  await openCart(page)
  await expect(page.getByRole('button', { name: /Checkout/i })).toBeVisible()
})

