import { test, expect } from "@playwright/test";

test("var - poprawnie", async ({ page }) => {
  await page.goto("localhost:3000/var");
  await expect(page.locator("data-test-id=strona-var")).toBeVisible();
  await page.locator("data-test-id=wybierz-walute").click();
  await page.locator("data-test-id=euro-wybierz").click();
  await page.locator("data-test-id=wybierz-daty").click();
  await page.fill('[placeholder="Start date"]', "05/09/2021");
  await page.locator('[title="2021-09-05"]').click();
  await page.fill('[placeholder="End date"]', "09/09/2021");
  await page.locator('[title="2021-09-09"]').click();
  await page.locator("data-test-id=wybierz-kwote").fill("10000");
  await page.locator("data-test-id=wybierz-poziom-ufnosci").click();
  await page.locator("data-test-id=0,01-wybierz").click();
  await page.locator("data-test-id=przycisk-var").click();
  await expect(page.locator("data-test-id=opis-wyniku-var")).toBeVisible();
  await expect(page.locator("data-test-id=wynik-var")).toBeVisible();
  await expect(
    page.locator("data-test-id=interpretacja-wyniku-var")
  ).toBeVisible();
  await page.locator("data-test-id=przycisk-var-ponownie").click();
  await expect(page.locator("data-test-id=wynik-var")).not.toBeVisible();
});

test("var - brak waluty", async ({ page }) => {
  await page.goto("localhost:3000/var");
  await expect(page.locator("data-test-id=strona-var")).toBeVisible();
  await page.locator("data-test-id=wybierz-daty").click();
  await page.fill('[placeholder="Start date"]', "05/09/2021");
  await page.locator('[title="2021-09-05"]').click();
  await page.fill('[placeholder="End date"]', "09/09/2021");
  await page.locator('[title="2021-09-09"]').click();
  await page.locator("data-test-id=wybierz-kwote").fill("10000");
  await page.locator("data-test-id=wybierz-poziom-ufnosci").click();
  await page.locator("data-test-id=0,01-wybierz").click();
  await page.locator("data-test-id=przycisk-var").isDisabled();
});
test("var - brak dat", async ({ page }) => {
  await page.goto("localhost:3000/var");
  await expect(page.locator("data-test-id=strona-var")).toBeVisible();
  await page.locator("data-test-id=wybierz-walute").click();
  await page.locator("data-test-id=euro-wybierz").click();
  await page.locator("data-test-id=wybierz-kwote").fill("10000");
  await page.locator("data-test-id=wybierz-poziom-ufnosci").click();
  await page.locator("data-test-id=0,01-wybierz").click();
  await page.locator("data-test-id=przycisk-var").isDisabled();
});

test("var - brak daty poczatkowej", async ({ page }) => {
  await page.goto("localhost:3000/var");
  await expect(page.locator("data-test-id=strona-var")).toBeVisible();
  await page.locator("data-test-id=wybierz-walute").click();
  await page.locator("data-test-id=euro-wybierz").click();
  await page.locator("data-test-id=wybierz-daty").click();
  await page.fill('[placeholder="End date"]', "09/09/2021");
  await page.locator('[title="2021-09-09"]').click();
  await page.locator("data-test-id=wybierz-kwote").fill("10000");
  await page.locator("data-test-id=wybierz-poziom-ufnosci").click();
  await page.locator("data-test-id=0,01-wybierz").click();
  await page.locator("data-test-id=przycisk-var").isDisabled();
});

test("var - brak daty koncowej", async ({ page }) => {
  await page.goto("localhost:3000/var");
  await expect(page.locator("data-test-id=strona-var")).toBeVisible();
  await page.locator("data-test-id=wybierz-walute").click();
  await page.locator("data-test-id=euro-wybierz").click();
  await page.locator("data-test-id=wybierz-daty").click();
  await page.fill('[placeholder="Start date"]', "05/09/2021");
  await page.locator('[title="2021-09-05"]').click();
  await page.locator("data-test-id=wybierz-kwote").fill("10000");
  await page.locator("data-test-id=wybierz-poziom-ufnosci").click();
  await page.locator("data-test-id=0,01-wybierz").click();
  await page.locator("data-test-id=przycisk-var").isDisabled();
});

test("var - brak poziomu ufnosci", async ({ page }) => {
  await page.goto("localhost:3000/var");
  await expect(page.locator("data-test-id=strona-var")).toBeVisible();
  await page.locator("data-test-id=wybierz-walute").click();
  await page.locator("data-test-id=euro-wybierz").click();
  await page.locator("data-test-id=wybierz-daty").click();
  await page.fill('[placeholder="Start date"]', "05/09/2021");
  await page.locator('[title="2021-09-05"]').click();
  await page.fill('[placeholder="End date"]', "09/09/2021");
  await page.locator('[title="2021-09-09"]').click();
  await page.locator("data-test-id=wybierz-kwote").fill("10000");
  await page.locator("data-test-id=przycisk-var").isDisabled();
});

test("var - brak kwoty", async ({ page }) => {
  await page.goto("localhost:3000/var");
  await expect(page.locator("data-test-id=strona-var")).toBeVisible();
  await page.locator("data-test-id=wybierz-walute").click();
  await page.locator("data-test-id=euro-wybierz").click();
  await page.locator("data-test-id=wybierz-daty").click();
  await page.fill('[placeholder="Start date"]', "05/09/2021");
  await page.locator('[title="2021-09-05"]').click();
  await page.fill('[placeholder="End date"]', "09/09/2021");
  await page.locator('[title="2021-09-09"]').click();
  await page.locator("data-test-id=wybierz-poziom-ufnosci").click();
  await page.locator("data-test-id=0,01-wybierz").click();
  await page.locator("data-test-id=przycisk-var").isDisabled();
});
test("var - nieuzupelnione wcale", async ({ page }) => {
  await page.goto("localhost:3000/var");
  await expect(page.locator("data-test-id=strona-var")).toBeVisible();
  await page.locator("data-test-id=przycisk-var").isDisabled();
});
