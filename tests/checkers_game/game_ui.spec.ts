const { Landing } = require('../../src/pages/landing.js');
import { test, expect } from '@playwright/test';

let landingPage;

test.describe("Validate the site loads and", () => {
    test.beforeEach(async ({ page }) =>{
        // Navigates to checkers game url
        await page.goto('/game/checkers/');
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
        await expect(board.message).toBeVisible()
        await expect(board.message).toHaveText("Select an orange piece to move.")
    });

    test('has Restart link', async ({ page }) => {
        await expect(landingPage.restartLink).toBeVisible();
    });

    test('has Rules link', async ({ page }) => {
        // Expect a title "to contain" a substring.
        await expect(landingPage.rulesLink).toBeVisible();
    });
})

test.describe("Validate user can", () => {
    test.beforeEach(async ({page}) =>{
        // Navigates to checkers game url
        await page.goto('/game/checkers/');
        landingPage = new Landing(page);
    })

    test('perform 5 legal moves and restart game', async({page}) => {
        let board = landingPage.getBoard();
        await expect(board.message).toHaveText("Select an orange piece to move.")

        // 5 legal moves, comfirm using 'Make a move'
        await board.movePlayer('22','13');
        await board.movePlayer('11','22')
        await board.movePlayer('13','04')
        await board.movePlayer('22','13')
        await board.movePlayer('42','24')

        // Took a blue piece
        await expect(board.comPlayer).toHaveCount(11);
        await expect(board.player).toHaveCount(12);

        // restart after 5 moves and confirm restart
        await page.getByText("Restart...").click();
        await expect(board.comPlayer).toHaveCount(12);
        await expect(board.player).toHaveCount(12);
    })


})