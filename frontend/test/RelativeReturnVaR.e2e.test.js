import { test, expect } from "@playwright/test";

test("wzgledny var - poprawnie", async ({ page }) => {
  await page.goto("localhost:3000/relative-return-var");
  await expect(page.locator("data-test-id=strona-wzgledny-var")).toBeVisible();
  await page.locator("data-test-id=wybierz-walute").click();
  await page.locator("data-test-id=euro-wybierz").click();
  await page.locator("data-test-id=wybierz-daty").click();
  await page.fill('[placeholder="Start date"]', "05/09/2021");
  await page.locator('[title="2021-09-05"]').click();
  await page.fill('[placeholder="End date"]', "09/09/2021");
  await page.locator('[title="2021-09-09"]').click();
  await page.locator("data-test-id=wybierz-poziom-ufnosci").click();
  await page.locator("data-test-id=0,01-wybierz").click();
  await page.locator("data-test-id=przycisk-wzgledny-var").click();
  await expect(
    page.locator("data-test-id=opis-wyniku-wzgledny-var")
  ).toBeVisible();
  await expect(page.locator("data-test-id=wynik-wzgledny-var")).toBeVisible();
  await expect(
    page.locator("data-test-id=interpretacja-wyniku-wzgledny-var")
  ).toBeVisible();
  await expect(page.locator("data-test-id=wykres-wzgledny-var")).toBeVisible();
  await page.locator("data-test-id=przycisk-wzgledny-var-ponownie").click();
  await expect(
    page.locator("data-test-id=wynik-wzgledny-var")
  ).not.toBeVisible();
});

test("wzgledny var - brak waluty", async ({ page }) => {
  await page.goto("localhost:3000/relative-return-var");
  await expect(page.locator("data-test-id=strona-wzgledny-var")).toBeVisible();
  await page.locator("data-test-id=wybierz-daty").click();
  await page.fill('[placeholder="Start date"]', "05/09/2021");
  await page.locator('[title="2021-09-05"]').click();
  await page.fill('[placeholder="End date"]', "09/09/2021");
  await page.locator('[title="2021-09-09"]').click();
  await page.locator("data-test-id=wybierz-poziom-ufnosci").click();
  await page.locator("data-test-id=0,01-wybierz").click();
  await page.locator("data-test-id=przycisk-wzgledny-var").isDisabled();
});
test("wzgledny var - brak dat", async ({ page }) => {
  await page.goto("localhost:3000/relative-return-var");
  await expect(page.locator("data-test-id=strona-wzgledny-var")).toBeVisible();
  await page.locator("data-test-id=wybierz-walute").click();
  await page.locator("data-test-id=euro-wybierz").click();
  await page.locator("data-test-id=wybierz-poziom-ufnosci").click();
  await page.locator("data-test-id=0,01-wybierz").click();
  await page.locator("data-test-id=przycisk-wzgledny-var").isDisabled();
});

test("wzgledny var - brak daty poczatkowej", async ({ page }) => {
  await page.goto("localhost:3000/relative-return-var");
  await expect(page.locator("data-test-id=strona-wzgledny-var")).toBeVisible();
  await page.locator("data-test-id=wybierz-walute").click();
  await page.locator("data-test-id=euro-wybierz").click();
  await page.locator("data-test-id=wybierz-daty").click();
  await page.locator('[placeholder="End date"]').click();
  await page.fill('[placeholder="End date"]', "09/09/2021");
  await page.locator('[title="2021-09-09"]').click();
  await page.locator("data-test-id=strona-wzgledny-var").click();
  await page.locator("data-test-id=wybierz-poziom-ufnosci").click();
  await page.locator("data-test-id=0,01-wybierz").click();
  await page.locator("data-test-id=przycisk-wzgledny-var").isDisabled();
});

test("wzgledny var - brak daty koncowej", async ({ page }) => {
  await page.goto("localhost:3000/relative-return-var");
  await expect(page.locator("data-test-id=strona-wzgledny-var")).toBeVisible();
  await page.locator("data-test-id=wybierz-walute").click();
  await page.locator("data-test-id=euro-wybierz").click();
  await page.locator("data-test-id=wybierz-daty").click();
  await page.fill('[placeholder="Start date"]', "05/09/2021");
  await page.locator('[title="2021-09-05"]').click();
  await page.locator("data-test-id=wybierz-poziom-ufnosci").click();
  await page.locator("data-test-id=0,01-wybierz").click();
  await page.locator("data-test-id=przycisk-wzgledny-var").isDisabled();
});

test("wzgledny var - brak poziomu ufnosci", async ({ page }) => {
  await page.goto("localhost:3000/relative-return-var");
  await expect(page.locator("data-test-id=strona-wzgledny-var")).toBeVisible();
  await page.locator("data-test-id=wybierz-walute").click();
  await page.locator("data-test-id=euro-wybierz").click();
  await page.locator("data-test-id=wybierz-daty").click();
  await page.fill('[placeholder="Start date"]', "05/09/2021");
  await page.locator('[title="2021-09-05"]').click();
  await page.fill('[placeholder="End date"]', "09/09/2021");
  await page.locator('[title="2021-09-09"]').click();
  await page.locator("data-test-id=przycisk-wzgledny-var").isDisabled();
});

test("wzgledny var - nieuzupelnione wcale", async ({ page }) => {
  await page.goto("localhost:3000/relative-return-var");
  await expect(page.locator("data-test-id=strona-wzgledny-var")).toBeVisible();
  await page.locator("data-test-id=przycisk-wzgledny-var").isDisabled();
});
