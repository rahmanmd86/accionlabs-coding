export class Board {

    constructor(page) {
        this.page = page;
        this.playerLocator = "img[src$='you1.gif']"
        this.grayboxLocator = "img[src$='gray.gif']"
        this.comPlayer = page.locator("img[src='me1.gif']")
        this.player = page.locator(this.playerLocator)
    }

    async playerAt(position) {
        let locatePlayer = `${this.playerLocator}[name=space${position}]`
        await this.page.locator(locatePlayer).click({ delay: 2000 })
        return this
    }

    async moveTo(position) {
        let locateGrayBox =  `${this.grayboxLocator}[name=space${position}]`
        await this.page.locator(locateGrayBox).click()
    }

    async movePlayer(from, to){
        let locatePlayer = `${this.playerLocator}[name=space${from}]`
        await this.page.locator(locatePlayer).click({ delay: 2000 })
        let locateGrayBox =  `${this.grayboxLocator}[name=space${to}]`
        await this.page.locator(locateGrayBox).click()
    }


}