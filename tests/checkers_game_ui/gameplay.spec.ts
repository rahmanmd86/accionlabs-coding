const { Landing } = require('../../src/pages/landing.js');
import { test, expect } from '@playwright/test';

let landingPage;

test.describe("Validate the site loads and", () => {
    test.beforeEach(async ({page}) =>{
        // Navigates to checkers game url
        await page.goto('https://www.gamesforthebrain.com/game/checkers/');
        landingPage = new Landing(page);
    })

    test('has title', async ({ page }) => {
        await expect(landingPage.page).toHaveTitle(/Checkers/);
    });

    test('has header', async ({ page }) => {
        await expect(landingPage.header).toHaveText(/Checkers/);
    });

    test('has checker board', async ({ page }) => {
        await expect(landingPage.board).toBeVisible();
        let board = landingPage.getBoard();
        await expect(board.comPlayer).toHaveCount(12);
        await expect(board.player).toHaveCount(12);
        await expect(landingPage.message).toBeVisible()
        await expect(landingPage.message).toHaveText("Select an orange piece to move.")
    });

    test('has Restart link', async ({ page }) => {
        await expect(landingPage.restartLink).toBeVisible();
    });

    test('has Rules link', async ({ page }) => {
        // Expect a title "to contain" a substring.
        await expect(landingPage.rulesLink).toBeVisible();
    });
})

test.describe.only("Validate user can", () => {
    test.beforeEach(async ({page}) =>{
        // Navigates to checkers game url
        await page.goto('https://www.gamesforthebrain.com/game/checkers/');
        landingPage = new Landing(page);
        await expect(landingPage.message).toHaveText("Select an orange piece to move.")
    })

    test.only('perform 5 legal moves and restart game', async({page}) => {
        let board = landingPage.getBoard();
        await board.movePlayer(22,13);
        // await page.locator("img[src='you1.gif'][name='space22']").click()
        // await page.locator("img[src='gray.gif'][name='space13']").click()
        await expect(landingPage.message).toHaveText("Make a move.")
        await board.movePlayer()
        await page.locator("img[src='you1.gif'][name='space11']").click({delay: 2000})
        await page.locator("img[src$='gray.gif'][name='space22']").click()
        await expect(page.locator("p#message")).toHaveText("Make a move.")
        await page.locator("img[src='you1.gif'][name='space13']").click({delay: 2000})
        await page.locator("img[src='gray.gif'][name='space04']").click()
        await expect(page.locator("p#message")).toHaveText("Make a move.")
        await page.locator("img[src='you1.gif'][name='space22']").click({delay: 2000})
        await page.locator("img[src$='gray.gif'][name='space13']").click()
        await expect(page.locator("p#message")).toHaveText("Make a move.")
        await page.locator("img[src='you1.gif'][name='space42']").click({delay: 2000})
        await page.locator("img[src$='gray.gif'][name='space24']").click()
        await expect(page.locator("p#message")).toHaveText("Make a move.")

        await expect(page.locator("img[src='me1.gif']")).toHaveCount(11);
        await expect(page.locator("img[src='you1.gif']")).toHaveCount(12);

        await page.getByText("Restart...").click();
        await expect(page.locator("img[src='me1.gif']")).toHaveCount(12);
        await expect(page.locator("img[src='you1.gif']")).toHaveCount(12);
    })


})