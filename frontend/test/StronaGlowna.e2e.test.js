import { test, expect } from "@playwright/test";

test("strona glowna", async ({ page }) => {
  await page.goto("localhost:3000");
  await expect(page.locator("data-test-id=wykres-walut")).toBeVisible();
});

test("przechodzenie przez strony", async ({ page }) => {
  await page.goto("localhost:3000");
  await expect(page.locator("data-test-id=wykres-walut")).toBeVisible();
  await page.locator("data-test-id=odchylenie-standardowe").click();
  await expect(
    page.locator("data-test-id=strona-odchylenie-standardowe")
  ).toBeVisible();
  await page.locator("data-test-id=var").click();
  await expect(page.locator("data-test-id=strona-var")).toBeVisible();
  await page.locator("data-test-id=wzgledny-var").click();
  await expect(page.locator("data-test-id=strona-wzgledny-var")).toBeVisible();
  await page.locator("data-test-id=strona-glowna").click();
  await expect(page.locator("data-test-id=wykres-walut")).toBeVisible();
});
