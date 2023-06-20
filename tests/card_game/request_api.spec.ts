import { getClosest21 } from '../../src/api/helper.js'
import { test, expect } from '@playwright/test';

test.describe('Validate when navigating the API site, it', () => {
    test('should be up', async({ page }) => {
        await page.goto("/")
        await expect(page).toHaveTitle("Deck of Cards API")
    })
})

test.describe('Validate using cards api request', () => {
    test('returns success response with data', async ({ request }) => {
        const response = await request.get("/api/deck/new/shuffle/?deck_count=1")
        expect(response.ok()).toBeTruthy();
        expect(await response.json()).toMatchObject(expect.objectContaining({
            success: true,
            deck_id: expect.any(String),
            remaining: 52,
            shuffled: true
        }))
    })

    test('user can draw cards and decide blackjack winner', async ({ request }) => {
        // Get new deck
        let response = await request.get("/api/deck/new/")
        expect(response.ok()).toBeTruthy();
        let responseData = await response.json()
        expect(responseData.shuffled).toBeFalsy()

        // Shuffle the deck
        let deckId = responseData.deck_id
        response = await request.get(`/api/deck/${deckId}/shuffle/`)
        responseData = await response.json()
        expect(responseData.shuffled).toBeTruthy()

        // Draw cards for each of two players
        let playerCards = [], numOfPlayers = 2
        for (let i = 1; i <= numOfPlayers; i++) {
            response = await request.get(`/api/deck/${deckId}/draw/?count=2`)
            responseData = await response.json()
            playerCards.push(responseData.cards)
        }
        const expectedCardCount = 52 - numOfPlayers*2
        expect(responseData.remaining).toBe(expectedCardCount);

        // Determines and prints which player has blackjack
        const player = getClosest21(playerCards);
        console.log(`Player ${player} has blackjack`);

    })


})
