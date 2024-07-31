import { revealComputerShipLocations, showGameOverModal, showMiss, showShipHit, showShipSunk } from "./game-dom"
import { numbersToLetters, lettersToNumbers, clearPage, getRandomCoordinates } from "../lib/utils"
import { init } from ".."

const shipNames = [
  'Aircraft Carrier',
  'Battleship',
  'Destroyer',
  'Submarine',
  'Patrol Boat',
]

class Ship {
  hits = 0

  constructor(squares, name){
    this.name = name
    this.length = squares.length
    this.locatedAt = squares
  }

  hit(){
    ++this.hits
  }

  isSunk(){
    return this.hits >= this.length
  }
}

class Gameboard {
  hitSquares = []

  constructor(player, shipPlacements){
    this.player = player

    this.ships = shipPlacements.map((squares, index) => (
      new Ship(squares, shipNames[index])
    ))
  }

  receiveShot(coordinates){
    if (this.hitSquares.includes(coordinates)) return false

    this.hitSquares.push(coordinates)

    const shipHit = this.ships.find(ship => (
      ship.locatedAt.includes(coordinates)
    ))

    if (shipHit){
      shipHit.hit()
      if (shipHit.isSunk()){
        this.player.decrementShipCount()
        showShipSunk(
          this.player.type, 
          shipHit.locatedAt, 
          shipHit.name
        )
      } else {
        showShipHit(this.player.type, coordinates, shipHit.name)
      }
    } else {
      showMiss(this.player.type, coordinates)
    }

    return true
  }
}

//WIP: merge this function with the one in shipplacement and move it to utils
function expandShip(coordinates, shipLength){
  const startingYCoordinate = coordinates.charAt(0)
  const startingXCoordinate = coordinates.slice(1)

  const shipOrientation = (Math.round(Math.random()) === 1) 
    ? 'horizontal'
    : 'vertical'

  let expansionSquareIds = []

  if (shipOrientation === 'horizontal'){
    function expandHorizontally(yCoordinate, xCoordinate){
      const expandLeft = Math.ceil(shipLength / 2)
      const expandRight = Math.floor(shipLength / 2)

      for (let i = 0; i < expandLeft; i++){
        if (Number(xCoordinate) - i === 0){
          expansionSquareIds = []
          expandHorizontally(yCoordinate, String(Number(xCoordinate) + (expandLeft - i)))
          return
        }
        
        const adjSqId = yCoordinate + (Number(xCoordinate) - i)
        expansionSquareIds.push(adjSqId)
      }

      for (let i = 1; i <= expandRight; i++){
        if (Number(xCoordinate) + i === 11){
          expansionSquareIds = []
          expandHorizontally(yCoordinate, String(Number(xCoordinate) - (expandRight - (i - 1))))
          return
        }

        const adjSqId = yCoordinate + (Number(xCoordinate) + i)
        expansionSquareIds.push(adjSqId)
      }
    }
    expandHorizontally(startingYCoordinate, startingXCoordinate)
  } else if (shipOrientation === 'vertical') {
    function expandVertically(yCoordinate, xCoordinate){
      const expandUp = Math.ceil(shipLength / 2)
      const expandDown = Math.floor(shipLength / 2)

      for (let i = 0; i < expandUp; i++){
        if (lettersToNumbers[yCoordinate] - i === 0){
          expansionSquareIds = []
          expandVertically(numbersToLetters[lettersToNumbers[yCoordinate] + (expandUp - i)], xCoordinate)
          return 
        }

        const descLetter = numbersToLetters[lettersToNumbers[yCoordinate] - i]
        const adjSqId = descLetter + xCoordinate
        expansionSquareIds.push(adjSqId)
      }

      for (let i = 1; i <= expandDown; i++){
        if(
          lettersToNumbers[yCoordinate] + i === 11 || 
          lettersToNumbers[yCoordinate] + i === undefined
        ){
          expansionSquareIds = []
          expandVertically(numbersToLetters[lettersToNumbers[yCoordinate] - (expandDown - (i - 1))], xCoordinate)
          return
        }

        const ascLetter = numbersToLetters[lettersToNumbers[yCoordinate] + i]
        const adjSqId = ascLetter + xCoordinate
        expansionSquareIds.push(adjSqId)
      }
    }
    expandVertically(startingYCoordinate, startingXCoordinate)
  }

  return expansionSquareIds
}



class Player {
  shipCount = 5

  constructor(type, shipPlacements){
    this.type = type
    if (this.type === 'player'){
      this.gameboard = new Gameboard(this, shipPlacements)
    } else {
      shipPlacements = this.generateRandomShipPlacements()

      this.gameboard = new Gameboard(this, shipPlacements)
    }
  }

  generateRandomShipPlacements(){
    const shipPlacements = []
  
    for (let i = 0; i < 5; i++){
      let coordinates = getRandomCoordinates()
  
      let shipLength = i === 0
        ? 5
        : i === 1 
        ? 4
        : (i === 2) || (i === 3)
        ? 3
        : 2
  
      let newShipPlacement = expandShip(coordinates, shipLength)
      while(
        newShipPlacement.some(square => (
          shipPlacements.some(sP => sP.includes(square))
        ))
      ) {
        coordinates = getRandomCoordinates()
        newShipPlacement = expandShip(coordinates, shipLength)
      }
  
      shipPlacements.push(newShipPlacement)
    }
  
    return shipPlacements
  }

  decrementShipCount(){
    --this.shipCount
  }
}

class Game {
  constructor(shipPlacements){
    this.player = new Player('player', shipPlacements)
    this.computer = new Player('computer')
  }

  playerShoots(coordinates){
    if (!this.isOver()){
      const wasValidTarget = this.computer.gameboard.receiveShot(coordinates)

      if (!this.isOver() && wasValidTarget){
        const target = this.pickComputerTarget()
        this.player.gameboard.receiveShot(target)
      }

      if (this.isOver() === 'player'){
        showGameOverModal('player')
      } else if (this.isOver() === 'computer'){
        showGameOverModal('computer')

        const nonSunkComputerShips =  this.computer.gameboard.ships.filter(ship => !ship.isSunk())
        const computerShipLocations = nonSunkComputerShips.map(ship => ship.locatedAt)
        const hitSquares = new Set(this.computer.gameboard.hitSquares)
        const nonHitShipSquares = computerShipLocations.flat().filter(square => !hitSquares.has(square))
        revealComputerShipLocations(nonHitShipSquares)
      }
    }
  }

  pickComputerTarget(){
    //MINOR ISSUE: doesn't alternate vertical and horizontal (fires in same pattern every time)
    const nonSunkPlayerShips = this.player.gameboard.ships.filter(ship => !ship.isSunk())
    const playerShipLocations = nonSunkPlayerShips.map(ship => ship.locatedAt)

    const hitPlayerShips = playerShipLocations.filter(location => (
      location.some(sqId => (
        this.player.gameboard.hitSquares.includes(sqId)
      ))
    ))
    const playerShipHits = hitPlayerShips.map(location => (
      location.filter(sqId => this.player.gameboard.hitSquares.includes(sqId))
    ))
    const multiHits = playerShipHits.filter(location => location.length >= 2)

    let target

    for (const hitSet of multiHits){
      const shipDirection = Number(
        hitSet[0].slice(1)
      ) !== Number(
        hitSet[hitSet.length -1].slice(1)
      ) ? 'horizontal' : 'vertical'

      if (shipDirection === 'horizontal') {
        if (
          ((Number(hitSet[0].slice(1)) - 1) > 0) &&
          !this.player.gameboard.hitSquares.includes(
            hitSet[0].charAt(0) + String(
              Number(hitSet[0].slice(1)) - 1
            )
          )
        ) {
          target = hitSet[0].charAt(0) + String(
            Number(hitSet[0].slice(1)) - 1
          )
          break
        } else if (
          ((Number(hitSet[hitSet.length - 1].slice(1)) + 1) < 11) &&
          !this.player.gameboard.hitSquares.includes(
            hitSet[hitSet.length - 1].charAt(0) + String(
              Number(hitSet[hitSet.length - 1].slice(1)) + 1
            )
          )
        ) {
          target = hitSet[hitSet.length - 1].charAt(0) + String(
            Number(hitSet[hitSet.length - 1].slice(1)) + 1
          )
          break
        }
      } else if (shipDirection === 'vertical'){
        if (
          ((lettersToNumbers[hitSet[0].charAt(0)] - 1) > 0) &&
          !this.player.gameboard.hitSquares.includes(
            numbersToLetters[
              lettersToNumbers[hitSet[0].charAt(0)] - 1
            ] + hitSet[0].slice(1)
          )
        ) {
          target = numbersToLetters[
            lettersToNumbers[hitSet[0].charAt(0)] - 1
          ] + hitSet[0].slice(1)
          break
        } else if (
          ((lettersToNumbers[hitSet[hitSet.length - 1].charAt(0)] + 1) < 11) &&
          !this.player.gameboard.hitSquares.includes(
            numbersToLetters[
              lettersToNumbers[hitSet[hitSet.length - 1].charAt(0)] + 1
            ] + hitSet[hitSet.length - 1].slice(1)
          )
        ) {
          target = numbersToLetters[
            lettersToNumbers[hitSet[hitSet.length - 1].charAt(0)] + 1
          ] + hitSet[hitSet.length - 1].slice(1)
          break
        }
      }
    }

    if (!target){
      for (const coordinates of playerShipHits.flat()){
        if (
          ((lettersToNumbers[coordinates.charAt(0)] - 1) > 0) &&
          !this.player.gameboard.hitSquares.includes(
            numbersToLetters[
              lettersToNumbers[coordinates.charAt(0)] - 1
            ] + coordinates.slice(1)
          )
        ) {
          target = numbersToLetters[
            lettersToNumbers[coordinates.charAt(0)] - 1
          ] + coordinates.slice(1)
          break
        } else if (
          ((lettersToNumbers[coordinates.charAt(0)] + 1) < 11) &&
          !this.player.gameboard.hitSquares.includes(
            numbersToLetters[
              lettersToNumbers[coordinates.charAt(0)] + 1
            ] + coordinates.slice(1)
          )
        ) {
          target = numbersToLetters[
            lettersToNumbers[coordinates.charAt(0)] + 1
          ] + coordinates.slice(1)
          break
        } else if (
          ((Number(coordinates.slice(1)) - 1) > 0) &&
          !this.player.gameboard.hitSquares.includes(
            coordinates.charAt(0) + String(Number(coordinates.slice(1)) - 1)
          )
        ) {
          target = coordinates.charAt(0) + String(
            Number(coordinates.slice(1)) - 1
          )
          break
        } else if (
          ((Number(coordinates.slice(1)) + 1) < 11 ) &&
          !this.player.gameboard.hitSquares.includes(
            coordinates.charAt(0) + String(Number(coordinates.slice(1)) + 1)
          )
        ) {
          target = coordinates.charAt(0) + String(
            Number(coordinates.slice(1)) + 1
          )
          break
        }
      }

      if (!target){
        target = getRandomCoordinates()

        while (this.player.gameboard.hitSquares.includes(target)){
          target = getRandomCoordinates()
        }
      }
    }

    return target
  }

  isOver(){
    return this.computer.shipCount <= 0 
      ? 'player'
      : this.player.shipCount <= 0
      ? 'computer'
      : false
  }
}

function restartGame(){
  clearPage()
  init()
}

export { 
  Ship,
  Gameboard,
  Player,
  Game,
  restartGame
}
