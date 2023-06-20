const { messages } = require('../resources/constants')
import { expect } from '@playwright/test';

export class Board {

    constructor(page) {
        this.page = page;
        this.playerLocator = "img[src$='you1.gif']"
        this.grayboxLocator = "img[src$='gray.gif']"
        this.comPlayer = page.locator("img[src='me1.gif']")
        this.player = page.locator(this.playerLocator)
        this.message = page.locator("p#message");
    }

    async movePlayer(from, to){
        let locate = `${this.playerLocator}[name=space${from}]`
        await this.page.locator(locate).click({ delay: 2000 })
        locate = `${this.grayboxLocator}[name=space${to}]`
        await this.page.locator(locate).click()
        await expect(this.message).toHaveText(messages.makeMove)
    }

}