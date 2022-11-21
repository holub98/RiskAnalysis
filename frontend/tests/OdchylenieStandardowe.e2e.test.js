import { test, expect } from "@playwright/test";

test("odchyelenie standardowe - poprawnie", async ({ page }) => {
  await page.goto("localhost:3000/standard-deviation");
  await expect(
    page.locator("data-test-id=strona-odchylenie-standardowe")
  ).toBeVisible();
  await page.locator("data-test-id=wybierz-walute").click();
  await page.locator("data-test-id=euro-wybierz").click();
  await page.locator("data-test-id=wybierz-daty").click();
  await page.fill('[placeholder="Start date"]', "05/09/2021");
  await page.locator('[title="2021-09-05"]').click();
  await page.fill('[placeholder="End date"]', "09/09/2021");
  await page.locator('[title="2021-09-09"]').click();
  await page.locator("data-test-id=przycisk-odchylenie-standardowe").click();
  await expect(
    page.locator("data-test-id=opis-wyniku-odchylenie-standardowe")
  ).toBeVisible();
  await expect(
    page.locator("data-test-id=wynik-odchylenie-standardowe")
  ).toBeVisible();
  await expect(
    page.locator("data-test-id=interpretacja-wyniku-odchylenie-standardowe")
  ).toBeVisible();
  await page
    .locator("data-test-id=przycisk-odchylenie-standardowe-ponownie")
    .click();
  await expect(
    page.locator("data-test-id=wynik-odchylenie-standardowe")
  ).not.toBeVisible();
});

test("odchyelenie standardowe - brak waluty", async ({ page }) => {
  await page.goto("localhost:3000/standard-deviation");
  await expect(
    page.locator("data-test-id=strona-odchylenie-standardowe")
  ).toBeVisible();
  await page.locator("data-test-id=wybierz-daty").click();
  await page.fill('[placeholder="Start date"]', "05/09/2021");
  await page.locator('[title="2021-09-05"]').click();
  await page.fill('[placeholder="End date"]', "09/09/2021");
  await page.locator('[title="2021-09-09"]').click();
  await page
    .locator("data-test-id=przycisk-odchylenie-standardowe")
    .isDisabled();
});

test("odchyelenie standardowe - brak dat", async ({ page }) => {
  await page.goto("localhost:3000/standard-deviation");
  await expect(
    page.locator("data-test-id=strona-odchylenie-standardowe")
  ).toBeVisible();
  await page.locator("data-test-id=wybierz-walute").click();
  await page.locator("data-test-id=euro-wybierz").click();
  await page
    .locator("data-test-id=przycisk-odchylenie-standardowe")
    .isDisabled();
});

test("odchyelenie standardowe - brak daty poczatkowej", async ({ page }) => {
  await page.goto("localhost:3000/standard-deviation");
  await expect(
    page.locator("data-test-id=strona-odchylenie-standardowe")
  ).toBeVisible();
  await page.locator("data-test-id=wybierz-walute").click();
  await page.locator("data-test-id=euro-wybierz").click();
  await page.locator("data-test-id=wybierz-daty").click();
  await page.fill('[placeholder="End date"]', "09/09/2021");
  await page.locator('[title="2021-09-09"]').click();
  await page
    .locator("data-test-id=przycisk-odchylenie-standardowe")
    .isDisabled();
});
test("odchyelenie standardowe - brak daty koncowej", async ({ page }) => {
  await page.goto("localhost:3000/standard-deviation");
  await expect(
    page.locator("data-test-id=strona-odchylenie-standardowe")
  ).toBeVisible();
  await page.locator("data-test-id=wybierz-walute").click();
  await page.locator("data-test-id=euro-wybierz").click();
  await page.locator("data-test-id=wybierz-daty").click();
  await page.fill('[placeholder="Start date"]', "05/09/2021");
  await page.locator('[title="2021-09-05"]').click();
  await page
    .locator("data-test-id=przycisk-odchylenie-standardowe")
    .isDisabled();
});

test("odchyelenie standardowe - brak dat i walut", async ({ page }) => {
  await page.goto("localhost:3000/standard-deviation");
  await expect(
    page.locator("data-test-id=strona-odchylenie-standardowe")
  ).toBeVisible();
  await page
    .locator("data-test-id=przycisk-odchylenie-standardowe")
    .isDisabled();
});
