import { mountShipPlacementPage } from "./ship-placement/ship-placement"
import { Game } from "./game/game-logic"
import { displayPlayerShips, mountGamePage } from "./game/game-dom"
import { clearPage } from "./lib/utils"

export function init(){
  function acceptShipPlacementsAndStartGame(shipPlacements){
    const game = new Game(shipPlacements)

    clearPage()
    mountGamePage()

    displayPlayerShips(shipPlacements)

    const computerBoardSquares = document.querySelectorAll('.computer-board-square')
    computerBoardSquares.forEach(computerBoardSquare => {
      computerBoardSquare.addEventListener('click', () => {
        game.playerShoots(computerBoardSquare.id.split('-')[1])
      })
    })
  }

  mountShipPlacementPage(acceptShipPlacementsAndStartGame)
}

document.addEventListener('DOMContentLoaded', () => {
  init()
})
