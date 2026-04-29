import { expect, type Page } from '@playwright/test'

async function selectFirstSizeIfPresent(page: Page) {
  const sizeButtons = page.locator('button', { hasText: /^(XS|S|M|L|XL|XXL)$/ })
  const first = sizeButtons.first()
  const hasSizes = await first.isVisible().catch(() => false)
  if (!hasSizes) return

  // Retry to avoid "detached from DOM" flakiness.
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      await sizeButtons.first().click()
      return
    } catch (error) {
      if (attempt === 2) throw error
    }
  }
}

export async function addFirstProductToCart(page: Page) {
  // Use a deterministic mock product URL to avoid flaky homepage clicks.
  await page.goto('/products/deconstructed-wool-blazer')
  await expect(page).toHaveURL(/\/products\//)

  await selectFirstSizeIfPresent(page)

  const addToBagButton = page.getByRole('button', { name: /Add to Bag/i })
  await expect(addToBagButton).toBeVisible()
  await expect(addToBagButton).toBeEnabled()
  await addToBagButton.click()

  // Adding to cart opens the cart sheet optimistically.
  await expect(page.getByText('Shopping Bag')).toBeVisible()
}

export async function openCart(page: Page) {
  if (await page.getByText('Shopping Bag').isVisible().catch(() => false)) return
  await page.getByRole('button', { name: 'Shopping cart' }).click()
  await expect(page.getByText('Shopping Bag')).toBeVisible()
}

