import { test, expect } from "@playwright/test";

test.describe("Cars marketplace", () => {
  test("lists vehicles and opens modal", async ({ page }) => {
    const listResponse = page.waitForResponse(
      (res) => res.url().includes("/api/cars") && res.status() === 200,
    );
    await page.goto("/cars");
    await listResponse;
    await expect(page.getByRole("heading", { name: /Premium Used Cars/i })).toBeVisible();

    const firstCard = page.locator("article").first();
    await expect(firstCard).toBeVisible({ timeout: 15_000 });
    await firstCard.click();

    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Schedule Test Drive" }),
    ).toBeVisible();
  });

  test("filters inventory", async ({ page }) => {
    await page.goto("/cars");
    await page.waitForResponse(
      (res) => res.url().includes("/api/cars") && res.status() === 200,
    );

    const filtered = page.waitForResponse(
      (res) =>
        res.url().includes("/api/cars") &&
        res.url().includes("make=Tesla") &&
        res.status() === 200,
    );
    await page.getByLabel("Filter by make").selectOption("Tesla");
    await filtered;

    await expect(page.getByText(/Model S/i)).toBeVisible({ timeout: 10_000 });
  });
});
