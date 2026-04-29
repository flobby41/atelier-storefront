import { expect, test } from '@playwright/test'

test('admin login page renders and rejects wrong credentials', async ({ page }) => {
  await page.goto('/admin/login')

  await expect(page.getByText(/Admin Login/i)).toBeVisible()
  await page.getByLabel(/Password/i).fill('wrong-password')
  await page.getByRole('button', { name: /Sign in/i }).click()

  await expect(page.getByRole('alert')).toBeVisible()
  await expect(page).toHaveURL(/\/admin\/login/)
})

