import { expect, test } from '@playwright/test'
import { addFirstProductToCart, openCart } from './helpers/cart'

test('user can add a product to the cart', async ({ page }) => {
  await addFirstProductToCart(page)

  await openCart(page)

  // There should be at least one cart line item image after add.
  await expect(page.locator('img[alt]').first()).toBeVisible()
})

