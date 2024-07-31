import { 
  Ship,
  Gameboard,
  Player,
  Game
} from "../src/game-logic";
import { numbersToLetters } from "../src/utils";

// Ship:
const testShip = new Ship(
  [
    'a1',
    'a2',
    'a3'
  ],
  'Submarine'
)
test("ship has correct length", () => {
  expect(testShip.length).toBe(3)
})
test("ship is in the correct location", () => {
  expect(testShip.locatedAt).toEqual(['a1', 'a2', 'a3'])
})
test("hits are counted correctly", () => {
  testShip.hit()
  expect(testShip.hits).toBe(1)
})
test("hits are counted correctly", () => {
  testShip.hit()
  expect(testShip.hits).toBe(2)
})
test("two hits don't sink the ship", () => {
  expect(testShip.isSunk()).toBe(false)
})
test("three hits sink the ship", () => {
  testShip.hit()
  expect(testShip.isSunk()).toBe(true)
})

// Gameboard:
class MockPlayer {
  decrementShipCount(){}
}
const mockPlayer = new MockPlayer()
const testGameboard = new Gameboard(mockPlayer, [
  ['b2', 'b3', 'b4', 'b5', 'b6'],
  ['b7', 'c7', 'd7', 'e7'],
  ['e4', 'f4', 'g4'],
  ['d9', 'e9', 'f9'],
  ['i2', 'i3']
])
test("ship locations are correct", () => {
  expect(testGameboard.ships[1].locatedAt).toEqual(['b7', 'c7', 'd7', 'e7'])
})
test("ship names are correct (1)", () => {
  expect(testGameboard.ships[2].name).toBe('Destroyer')
})
test("ship names are correct (2)", () => {
  expect(testGameboard.ships[4].name).toBe('Patrol Boat')
})
test("gameboard can receive shots", () => {
  testGameboard.receiveShot('g4')
  testGameboard.receiveShot('e1')
  expect(testGameboard.hitSquares).toEqual(['g4', 'e1'])
})
test("gameboard ships can take hits", () => {
  expect(testGameboard.ships[2].hits).toBe(1)
})
test("gameboard ships can be sunk", () => {
  testGameboard.receiveShot('i3')
  testGameboard.receiveShot('i2')
  expect(testGameboard.ships[4].isSunk()).toBe(true)
})
test("squares can only be hit once", () => {
  testGameboard.receiveShot('i3')
  expect(testGameboard.hitSquares).toEqual(['g4', 'e1', 'i3', 'i2'])
})

// Player:
const testPlayer = new Player(
  'player',
  [
    ['b2', 'b3', 'b4', 'b5', 'b6'],
    ['b7', 'c7', 'd7', 'e7'],
    ['e4', 'f4', 'g4'],
    ['d9', 'e9', 'f9'],
    ['i2', 'i3']
  ]
)
const testComputer = new Player('computer')
test("computer ship placements are generated", () => {
  expect(testComputer.gameboard.ships.length).toBe(5)
})
test("computer ship lengths are correct", () => {
  expect(testComputer.gameboard.ships[3].locatedAt.length).toBe(3)
})
test("player gameboards are working correctly and can receive attacks", () => {
  testPlayer.gameboard.receiveShot('b1')
  expect(testPlayer.gameboard.hitSquares).toEqual(['b1'])
})
test("sinking ships reduces ship count", () => {
  testPlayer.gameboard.receiveShot('d9')
  testPlayer.gameboard.receiveShot('e9')
  testPlayer.gameboard.receiveShot('f9')
  expect(testPlayer.shipCount).toBe(4)
})

// Game:
const testGame = new Game(
  [
    ['b2', 'b3', 'b4', 'b5', 'b6'],
    ['b7', 'c7', 'd7', 'e7'],
    ['e4', 'f4', 'g4'],
    ['d9', 'e9', 'f9'],
    ['i2', 'i3']
  ]
)
test("computer automatically fires back", () => {
  testGame.playerShoots('a3')
  testGame.playerShoots('a5')
  testGame.playerShoots('h9')
  testGame.playerShoots('j2')
  expect(testGame.player.gameboard.hitSquares.length).toBe(4)
})
test("game is over once all ships have been sunk", () => {
  for (let i = 1; i <= 10; i++){
    for (let j = 1; j <= 10; j++){
      const target = numbersToLetters[i] + j
      testGame.playerShoots(target)
    }
  }
  expect(testGame.isOver()).toBeTruthy()
})
