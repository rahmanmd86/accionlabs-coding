import { Board } from "./board"

class Landing {

    constructor(page) {
        this.page = page
        this.header = page.locator("div.page > h1")
        this.board = page.locator("div#board");
        this.message = page.locator("p#message");
        this.restartLink = page.getByRole('link', {name: "Restart..."})
        this.rulesLink = page.getByRole('link', {name: "Rules"})
    }

    getBoard() {
        return new Board(this.page)
    }
}

module.exports = {
    Landing
}