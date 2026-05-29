import { test, expect } from "@playwright/test";

test.describe("Calculator page", () => {
  test("performs calculation via UI", async ({ page }) => {
    await page.goto("/calculator");
    await expect(page.getByTestId("calc-display")).toHaveText("0");

    await page.getByRole("button", { name: "7", exact: true }).click();
    await page.getByRole("button", { name: "+", exact: true }).click();
    await page.getByRole("button", { name: "3", exact: true }).click();
    await page.getByRole("button", { name: "=", exact: true }).click();

    await expect(page.getByTestId("calc-display")).toHaveText("10");
  });

  test("supports keyboard input", async ({ page }) => {
    await page.goto("/calculator");
    await page.getByTestId("calc-display").click();
    await page.keyboard.press("9");
    await page.keyboard.press("*");
    await page.keyboard.press("9");
    await page.keyboard.press("Enter");
    await expect(page.getByTestId("calc-display")).toHaveText("81");
  });
});
