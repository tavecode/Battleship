import { numbersToLetters } from "../lib/utils"
import { restartGame } from "./game-logic"

function mountGamePage(){
  const mainArea = document.getElementById('main-area')
  mainArea.classList.add('lg:h-[582px]')
  mainArea.classList.remove('lg:h-[634px]')

  const container = document.createElement('div')
  container.classList.add(
    'w-full', 
    'h-full', 
    'p-2', 
    'flex', 
    'flex-col', 
    'items-center', 
    'gap-4', 
    'lg:gap-0', 
    'lg:flex-row', 
    'lg:justify-between'
  )

  const playerSide = document.createElement('div')
  playerSide.classList.add(
    'scale-[69.8%]', 
    'md:scale-100', 
    '-my-16', 
    '-mt-[4.5rem]', 
    'md:-mt-0', 
    'md:-my-0', 
    'flex', 
    'flex-col', 
    'gap-1'
  )

  const playerBoardContainer = document.createElement('div')
  playerBoardContainer.classList.add(
    'grid', 
    'grid-cols-[32px_420px]', 
    'grid-rows-[32px_420px_1fr]', 
    'gap-1'
  )

  const cornerPiece = document.createElement('div')
  cornerPiece.classList.add(
    'bg-sky-800',
    'border',
    'border-sky-500'
  )
  playerBoardContainer.append(cornerPiece)

  const numbers = document.createElement('div')
  numbers.classList.add('flex')
  for (let i = 1; i < 11; i++){
    const number = document.createElement('div')
    number.classList.add(
      'bg-sky-800', 
      'border', 
      'border-sky-500', 
      'w-full', 
      'grid', 
      'place-items-center', 
      'leading-7', 
      'text-2xl', 
      'font-medium', 
      'text-sky-200'
    )
    number.textContent = i
    numbers.append(number)
  }
  playerBoardContainer.append(numbers)

  const letters = document.createElement('div')
  letters.classList.add('flex', 'flex-col')
  for (let i = 1; i < 11; i++){
    const letter = document.createElement('div')
    letter.classList.add(
      'uppercase',
      'bg-sky-800', 
      'border', 
      'border-sky-500', 
      'h-full', 
      'grid', 
      'place-items-center', 
      'leading-7', 
      'text-2xl', 
      'font-medium', 
      'text-sky-200'
    )
    letter.textContent = numbersToLetters[i]
    letters.append(letter)
  }
  playerBoardContainer.append(letters)

  const playerBoard = document.createElement('div')
  playerBoard.classList.add(
    'overflow-hidden', 
    'relative', 
    'grid', 
    'grid-cols-10', 
    'grid-rows-10'
  )

  const sweeper = document.createElement('div')
  sweeper.classList.add(
    'sweeper',
    'absolute', 
    'flex', 
    'flex-col', 
    'w-[418px]', 
    'mx-[1px]', 
    'my-[1px]'
  )
  const sweeperTop = document.createElement('div')
  sweeperTop.classList.add(
    'bg-gradient-to-b',
    'from-transparent',
    'to-green-500/30',
    'w-full', 
    'h-8', 
    'z-10'
  )
  sweeper.append(sweeperTop)
  const sweeperMiddle = document.createElement('div')
  sweeperMiddle.classList.add(
    'bg-gradient-to-b',
    'from-transparent',
    'to-green-500',
    'w-full', 
    'h-[1px]', 
    'z-20'
  )
  sweeper.append(sweeperMiddle)
  const sweeperBottom = document.createElement('div')
  sweeperBottom.classList.add(
    'bg-gradient-to-b',
    'from-green-500/20',
    'to-transparent',
    'w-full', 
    'h-3', 
    'z-10'
  )
  sweeper.append(sweeperBottom)
  playerBoard.append(sweeper)

  for (let i = 1; i < 11; i++){
    for (let j = 1; j < 11; j++){
      const playerBoardSquare = document.createElement('div')
      playerBoardSquare.setAttribute('id', `p-${numbersToLetters[i]}${j}`)
      playerBoardSquare.classList.add(
        'player-board-square',
        'bg-sky-950', 'border', 'border-sky-500',
        'relative'
      )

      playerBoard.append(playerBoardSquare)
    }
  }

  playerBoardContainer.append(playerBoard)

  const playerSideTitle = document.createElement('div')
  playerSideTitle.classList.add(
    'uppercase',
    'rounded-sm', 
    'border', 
    'border-sky-500', 
    'text-sky-100', 
    'bg-sky-950', 
    'text-center', 
    'font-medium', 
    'text-2xl', 
    'p-1', 
    'col-span-2'
  )
  playerSideTitle.textContent = 'player'
  playerBoardContainer.append(playerSideTitle)

  playerSide.append(playerBoardContainer)

  const playerShipStatus = document.createElement('div')
  playerShipStatus.setAttribute('id', 'player-ship-status')
  playerShipStatus.classList.add(
    'flex', 
    'gap-3', 
    'uppercase', 
    'text-sm', 
    'justify-center', 
    'mb-1',
    'min-w-max'
  )
  const playerAircraftCarrierStatus = document.createElement('span')
  playerAircraftCarrierStatus.textContent = 'carrier'//WIP: figure out how to extend this to say "aircraft cariier"
  playerAircraftCarrierStatus.setAttribute('id', 'player-aircraft-carrier-status')
  playerAircraftCarrierStatus.classList.add('transition-all', 'duration-75')
  const playerBattleshipStatus = document.createElement('span')
  playerBattleshipStatus.textContent = 'battleship'
  playerBattleshipStatus.setAttribute('id', 'player-battleship-status')
  playerBattleshipStatus.classList.add('transition-all', 'duration-75')
  const playerDestroyerStatus = document.createElement('span')
  playerDestroyerStatus.textContent = 'destroyer'
  playerDestroyerStatus.setAttribute('id', 'player-destroyer-status')
  playerDestroyerStatus.classList.add('transition-all', 'duration-75')
  const playerSubmarineStatus = document.createElement('span')
  playerSubmarineStatus.textContent = 'submarine'
  playerSubmarineStatus.setAttribute('id', 'player-submarine-status')
  playerSubmarineStatus.classList.add('transition-all', 'duration-75')
  const playerPatrolBoatStatus = document.createElement('span')
  playerPatrolBoatStatus.textContent = 'patrol boat'
  playerPatrolBoatStatus.setAttribute('id', 'player-patrol-boat-status')
  playerPatrolBoatStatus.classList.add('transition-all', 'duration-75')
  playerShipStatus.append(
    playerAircraftCarrierStatus,
    playerBattleshipStatus,
    playerDestroyerStatus,
    playerSubmarineStatus,
    playerPatrolBoatStatus
  )
  playerSide.append(playerShipStatus)

  container.append(playerSide)

  const computerSide = document.createElement('div')
  computerSide.classList.add(
    'scale-[69.8%]', 
    '-mt-24', 
    'md:-mt-0', 
    'md:scale-100', 
    '-my-16', 
    'md:-my-0', 
    'flex', 
    'flex-col', 
    'gap-1'
  )
  const computerBoardContainer = document.createElement('div')
  computerBoardContainer.classList.add(
    'grid', 
    'grid-cols-[32px_420px]', 
    'grid-rows-[32px_420px]', 
    'gap-1'
  )

  computerBoardContainer.append(cornerPiece.cloneNode())
  computerBoardContainer.append(numbers.cloneNode(true))
  computerBoardContainer.append(letters.cloneNode(true))

  const computerBoard = document.createElement('div')
  computerBoard.setAttribute('id', 'computer-board')
  computerBoard.classList.add(
    'cursor-crosshair',
    'overflow-hidden', 
    'relative', 
    'grid', 
    'grid-cols-10', 
    'grid-rows-10', 
    'gap-1', 
    'bg-sky-950', 
    'border', 
    'border-sky-500', 
    'p-1'
  )

  const radarCircleOne = document.createElement('div')
  radarCircleOne.classList.add(
    'radar-circle', 
    'pointer-events-none', 
    'rounded-full', 
    'absolute', 
    'border-green-500/40', 
    'border', 
    'h-[36rem]', 
    'w-[36rem]', 
    'top-1/2', 
    'left-1/2', 
    '-translate-y-1/2', 
    '-translate-x-1/2'
  )
  const radarCircleTwo = radarCircleOne.cloneNode()
  radarCircleTwo.classList.remove('h-[36rem]', 'w-[36rem]')
  radarCircleTwo.classList.add('h-[32rem]', 'w-[32rem]')
  const radarCircleThree = radarCircleOne.cloneNode()
  radarCircleThree.classList.remove('h-[36rem]', 'w-[36rem]')
  radarCircleThree.classList.add('h-[28rem]', 'w-[28rem]')
  const radarCircleFour = radarCircleOne.cloneNode()
  radarCircleFour.classList.remove('h-[36rem]', 'w-[36rem]')
  radarCircleFour.classList.add('h-96', 'w-96')
  const radarCircleFive = radarCircleOne.cloneNode()
  radarCircleFive.classList.remove('h-[36rem]', 'w-[36rem]')
  radarCircleFive.classList.add('h-80', 'w-80')
  const radarCircleSix = radarCircleOne.cloneNode()
  radarCircleSix.classList.remove('h-[36rem]', 'w-[36rem]')
  radarCircleSix.classList.add('h-64', 'w-64')
  const radarCircleSeven = radarCircleOne.cloneNode()
  radarCircleSeven.classList.remove('h-[36rem]', 'w-[36rem]')
  radarCircleSeven.classList.add('h-48', 'w-48')
  const radarCircleEight = radarCircleOne.cloneNode()
  radarCircleEight.classList.remove('h-[36rem]', 'w-[36rem]')
  radarCircleEight.classList.add('h-32', 'w-32')
  const radarCircleNine = radarCircleOne.cloneNode()
  radarCircleNine.classList.remove('h-[36rem]', 'w-[36rem]')
  radarCircleNine.classList.add('h-16', 'w-16')
  const radarMiddleDot = document.createElement('div')
  radarMiddleDot.classList.add(
    'rounded-full', 
    'absolute', 
    'bg-green-500/60', 
    'h-1', 
    'w-1', 
    'top-1/2', 
    'left-1/2', 
    '-translate-y-1/2', 
    '-translate-x-1/2'
  )
  const radarHorizontalLine = document.createElement('div')
  radarHorizontalLine.classList.add(
    'absolute', 
    'w-full', 
    'h-[1px]', 
    'bg-green-500/40', 
    'top-1/2', 
    '-translate-y-1/2'
  )
  const radarVerticalLine = document.createElement('div')
  radarVerticalLine.classList.add(
    'absolute', 
    'h-full', 
    'w-[1px]', 
    'bg-green-500/40', 
    'left-1/2', 
    '-translate-x-1/2'
  )
  const radarSweeperContainer = document.createElement('div')
  radarSweeperContainer.classList.add(
    'absolute', 
    'top-1/2', 
    'left-1/2', 
    '-translate-x-1/2', 
    '-translate-y-1/2', 
    'w-[40rem]', 
    'h-[40rem]', 
    'grid', 
    'place-items-center', 
    'pointer-events-none'
  )
  const radarSweeper = document.createElement('div')
  radarSweeper.classList.add(
    'w-[40rem]', 
    'h-[40rem]', 
    'animate-[spin_9s_linear_infinite]', 
    'rounded-full', 
    'pointer-events-none', 
    'radar-sweeper', 
    'z-20'
  )
  radarSweeperContainer.append(radarSweeper)
  computerBoard.append(
    radarCircleOne,
    radarCircleTwo,
    radarCircleThree,
    radarCircleFour,
    radarCircleFive,
    radarCircleSix,
    radarCircleSeven,
    radarCircleEight,
    radarCircleNine,
    radarMiddleDot,
    radarHorizontalLine,
    radarVerticalLine,
    radarSweeperContainer
  )

  for (let i = 1; i < 11; i++){
    for (let j = 1; j < 11; j++){
      const computerBoardSquare = document.createElement('div')
      computerBoardSquare.setAttribute('id', `c-${numbersToLetters[i]}${j}`)
      computerBoardSquare.classList.add(
        'computer-board-square',
        'bg-sky-950',
        'border-2',
        'border-sky-500',
        'rounded-full',
        'hover:bg-sky-800', 
        'transition-colors', 
        'duration-75', 
        'cursor-crosshair'
      )

      computerBoard.append(computerBoardSquare)
    }
  }

  computerBoardContainer.append(computerBoard)

  const computerSideTitle = playerSideTitle.cloneNode()
  computerSideTitle.textContent = 'computer'
  computerBoardContainer.append(computerSideTitle)

  computerSide.append(computerBoardContainer)

  const computerShipStatus = document.createElement('div')
  computerShipStatus.setAttribute('id', 'computer-ship-status')
  computerShipStatus.classList.add(
    'flex', 
    'gap-3', 
    'uppercase', 
    'text-sm', 
    'justify-center', 
    'mb-1',
    'min-w-max'
  )
  const computerAircraftCarrierStatus = document.createElement('span')
  computerAircraftCarrierStatus.textContent = 'carrier'//WIP: figure out how to extend this to say "aircraft cariier"
  computerAircraftCarrierStatus.setAttribute('id', 'computer-aircraft-carrier-status')
  computerAircraftCarrierStatus.classList.add('transition-all', 'duration-75')
  const computerBattleshipStatus = document.createElement('span')
  computerBattleshipStatus.textContent = 'battleship'
  computerBattleshipStatus.setAttribute('id', 'computer-battleship-status')
  computerBattleshipStatus.classList.add('transition-all', 'duration-75')
  const computerDestroyerStatus = document.createElement('span')
  computerDestroyerStatus.textContent = 'destroyer'
  computerDestroyerStatus.setAttribute('id', 'computer-destroyer-status')
  computerDestroyerStatus.classList.add('transition-all', 'duration-75')
  const computerSubmarineStatus = document.createElement('span')
  computerSubmarineStatus.textContent = 'submarine'
  computerSubmarineStatus.setAttribute('id', 'computer-submarine-status')
  computerSubmarineStatus.classList.add('transition-all', 'duration-75')
  const computerPatrolBoatStatus = document.createElement('span')
  computerPatrolBoatStatus.textContent = 'patrol boat'
  computerPatrolBoatStatus.setAttribute('id', 'computer-patrol-boat-status')
  computerPatrolBoatStatus.classList.add('transition-all', 'duration-75')
  computerShipStatus.append(
    computerAircraftCarrierStatus,
    computerBattleshipStatus,
    computerDestroyerStatus,
    computerSubmarineStatus,
    computerPatrolBoatStatus
  )
  computerSide.append(computerShipStatus)

  const mobileRestartButton = document.createElement('button')
  mobileRestartButton.setAttribute('id', 'mobile-restart-btn')
  mobileRestartButton.classList.add(
    'uppercase', 
    'lg:hidden', 
    'bg-rose-500', 
    'rounded-sm', 
    'w-full', 
    'mt-8', 
    'md:mb-4', 
    'p-2', 
    'text-black', 
    'text-xl',
    'font-semibold',
    'hover:bg-rose-400', 
    'active:bg-rose-700', 
    'transition-colors', 
    'duration-75'
  )
  mobileRestartButton.textContent = 'restart'
  mobileRestartButton.addEventListener('click', showRestartModal)
  computerSide.append(mobileRestartButton)

  container.append(computerSide)

  mainArea.append(container)

  const desktopRestartButton = document.createElement('button')
  desktopRestartButton.setAttribute('id', 'desktop-restart-btn')
  desktopRestartButton.classList.add(
    'uppercase',
    'hidden', 
    'lg:block', 
    'bg-rose-500', 
    'text-black', 
    'absolute', 
    'left-1/2', 
    '-translate-x-1/2', 
    'px-3', 
    'py-[1px]', 
    'active:text-sky-300', 
    'rounded-t-sm', 
    'text-sm', 
    'font-semibold',
    'bottom-0', 
    'border-sky-400', 
    'border', 
    'border-b-0', 
    'hover:bg-rose-400', 
    'active:bg-rose-950', 
    'transition-colors', 
    'duration-75'
  )
  desktopRestartButton.textContent = 'restart'
  desktopRestartButton.addEventListener('click', showRestartModal)
  mainArea.append(desktopRestartButton)

  const contentArea = document.getElementById('content-area')
  const statusDisplayArea = document.createElement('div')
  statusDisplayArea.setAttribute('id', 'bottom-bar')
  statusDisplayArea.classList.add(
    'rounded-sm', 
    'order-2', 
    'lg:order-3', 
    'w-full', 
    'flex', 
    'lg:w-[1000px]', 
    'bg-sky-900', 
    'lg:bg-sky-950', 
    'h-12', 
    'lg:mt-1', 
    'border-b', 
    'lg:border-2', 
    'border-sky-400', 
  )
  const statusDisplay = document.createElement('div')
  statusDisplay.classList.add(
    'relative',
    'w-full', 
    'h-full', 
    'grid', 
    'place-items-center',
  )
  statusDisplay.setAttribute('id', 'status-display')

  const statusText = document.createElement('span')
  statusText.setAttribute('id', 'status-display-text')
  statusText.classList.add(
    'min-w-max',
    'text-sky-200', 
    'lg:text-sky-300',
    'text-sm', 
    'sm:text-lg',
    'uppercase', 
    'absolute',
    'top-1/2',
    '-translate-y-1/2',
    'left-1/2',
    '-translate-x-1/2',
    'opacity-0', 
    'transition-opacity', 
    'duration-300'
  )
  statusText.textContent = 'testing testing testing'
  statusDisplay.append(statusText)

  const idleAnimation = document.createElement('div')
  idleAnimation.setAttribute('id', 'idle-animation')
  idleAnimation.classList.add(
    'flex', 
    'gap-2',
    'transition-opacity', 
    'duration-300',
  )
  const animatedBar = document.createElement('span')
  animatedBar.classList.add(
    'wave-bar',
    'w-0.5',
    'h-5',
    'bg-sky-600',
    'lg:bg-sky-700'
  )
  for (let i = 0; i < 22; i++){
    idleAnimation.append(animatedBar.cloneNode())
  }
  statusDisplay.append(idleAnimation)

  statusDisplayArea.append(statusDisplay)
  contentArea.append(statusDisplayArea)

  const gameOverModal = document.createElement('dialog')
  gameOverModal.setAttribute('id', 'game-over-modal')
  gameOverModal.classList.add(
    'z-40',
    'backdrop:bg-sky-950/80',
    'backdrop:backdrop-blur-sm',
    'bg-sky-950',
    'border-2',
    'border-sky-500',
    'text-sky-100',
    'p-8',
    'rounded-sm',
    'w-full', 
    'md:w-[400px]',
    'outline-none'
  )
  const modalHeader = document.createElement('h2')
  modalHeader.textContent = 'game over'
  modalHeader.classList.add(
    'text-center',
    'uppercase',
    'font-bold',
    'text-2xl'
  )
  gameOverModal.append(modalHeader)
  const modalMessage = document.createElement('h1')
  modalMessage.setAttribute('id', 'game-over-modal-message')
  modalMessage.classList.add(
    'text-center',
    'uppercase',
    'font-semibold',
    'text-4xl',
    'mt-2',
  )
  gameOverModal.append(modalMessage)
  const modalButtonContainer = document.createElement('div')
  modalButtonContainer.classList.add('flex', 'flex-col', 'mt-6', 'gap-3')
  const viewBoardButton = document.createElement('button')
  viewBoardButton.setAttribute('id', 'view-board-btn')
  viewBoardButton.addEventListener('click', () => gameOverModal.close())
  viewBoardButton.classList.add(
    'uppercase',
    'py-2',
    'outline-none',
    'text-sky-600',
    'border',
    'border-sky-700',
    'hover:border-transparent',
    'hover:bg-sky-300',
    'hover:text-black',
    'active:bg-sky-700',
    'active:text-white',
    'rounded-sm',
    'transition-colors',
    'duration-75'
  )
  viewBoardButton.textContent = 'view game boards'
  modalButtonContainer.append(viewBoardButton)
  const newGameButton = document.createElement('button')
  newGameButton.setAttribute('id', 'new-game-btn')
  newGameButton.addEventListener('click', () => {
    restartGame()
    gameOverModal.close()
  })
  newGameButton.classList.add(
    'uppercase',
    'py-2',
    'outline-none',
    'text-black',
    'font-semibold',
    'bg-sky-400',
    'hover:bg-sky-300',
    'active:bg-sky-700',
    'active:text-white',
    'rounded-sm',
    'transition-colors',
    'duration-75'
  )
  newGameButton.textContent = 'new game'
  modalButtonContainer.append(newGameButton)
  gameOverModal.append(modalButtonContainer)
  document.body.append(gameOverModal)

  const restartGameModal = gameOverModal.cloneNode()
  restartGameModal.setAttribute('id', 'restart-game-modal')
  const restartModalHeader = document.createElement('h1')
  restartModalHeader.classList.add(
    'text-center',
    'uppercase',
    'font-semibold',
    'text-amber-300',
    'text-3xl'
  )
  restartModalHeader.textContent = 'are you sure?'
  restartGameModal.append(restartModalHeader)
  const restartModalButtonContainer = document.createElement('div')
  restartModalButtonContainer.classList.add(
    'mt-6',
    'flex',
    'justify-between',
    'gap-4'
  )
  restartGameModal.append(restartModalButtonContainer)
  const cancelRestartButton = document.createElement('button')
  cancelRestartButton.classList.add(
    'w-1/2',
    'py-2',
    'bg-sky-200',
    'text-black',
    'font-semibold',
    'hover:bg-sky-100',
    'active:bg-sky-700',
    'active:text-white',
    'rounded-sm',
    'uppercase'
  )
  cancelRestartButton.textContent = 'cancel'
  cancelRestartButton.addEventListener('click', () => restartGameModal.close())
  restartModalButtonContainer.append(cancelRestartButton)
  const confirmRestartButton = document.createElement('button')
  confirmRestartButton.classList.add(
    'w-1/2',
    'py-2',
    'bg-rose-500',
    'text-black',
    'font-semibold',
    'hover:bg-rose-400',
    'active:bg-rose-700',
    'active:text-white',
    'rounded-sm',
    'uppercase'
  )
  confirmRestartButton.textContent = 'confirm'
  confirmRestartButton.addEventListener('click', () => {
    restartGame()
    restartGameModal.close()
  })
  restartModalButtonContainer.append(confirmRestartButton)
  document.body.append(restartGameModal)
}

function showShipHit(playerType, coordinates, shipName){
  if (playerType === 'computer'){
    const hitSquare = document.getElementById(`c-${coordinates}`)
    hitSquare.classList.remove('bg-sky-950', 'hover:bg-sky-800', 'cursor-crosshair')
    hitSquare.classList.add('bg-amber-400', 'cursor-not-allowed')
  } else if (playerType === 'player'){
    const hitSquare = document.getElementById(`p-${coordinates}`)
    hitSquare.classList.remove('bg-sky-950')
    hitSquare.classList.add('bg-amber-400')

    const shipSegment = document.querySelector(`#p-${coordinates} .ship-segment`)
    if (!shipSegment.classList.contains('ship-end-segment')){
      shipSegment.classList.add('bg-amber-600')
      shipSegment.classList.remove('bg-gray-400')
    } else {
      shipSegment.classList.add('text-amber-600')
      shipSegment.classList.remove('text-gray-400')
    }
  }

  switch (shipName){
    case 'Aircraft Carrier':
      const aircraftCarrierStatusDisplay = document.getElementById(
        `${playerType}-aircraft-carrier-status`
      )
      aircraftCarrierStatusDisplay.classList.add('text-amber-400')
      break
    case 'Battleship':
      const battleshipStatusDisplay = document.getElementById(
        `${playerType}-battleship-status`
      )
      battleshipStatusDisplay.classList.add('text-amber-400')
      break
    case 'Destroyer':
      const destroyerStatusDisplay = document.getElementById(
        `${playerType}-destroyer-status`
      )
      destroyerStatusDisplay.classList.add('text-amber-400')
      break
    case 'Submarine':
      const submarineStatusDisplay = document.getElementById(
        `${playerType}-submarine-status`
      )
      submarineStatusDisplay.classList.add('text-amber-400')
      break
    case 'Patrol Boat':
      const patrolBoatStatusDisplay = document.getElementById(
        `${playerType}-patrol-boat-status`
      )
      patrolBoatStatusDisplay.classList.add('text-amber-400')
      break
  }
}

function showMiss(playerType, coordinates){
  if (playerType === 'computer'){
    const hitSquare = document.getElementById(`c-${coordinates}`)
    hitSquare.classList.remove('bg-sky-950', 'hover:bg-sky-800', 'cursor-crosshair')
    hitSquare.classList.add('bg-sky-200', 'cursor-not-allowed')
  } else if (playerType === 'player'){
    const hitSquare = document.getElementById(`p-${coordinates}`)
    hitSquare.classList.remove('bg-sky-950')
    hitSquare.classList.add('bg-sky-200')
  }
}

function showShipSunk(playerType, shipLocation, shipName){
  if (playerType === 'computer'){
    const sunkSquares = shipLocation.map(coordinates => (
      document.getElementById(`c-${coordinates}`)
    ))
    sunkSquares.forEach(sq => {
      sq.classList.remove(
        'bg-sky-950', 
        'hover:bg-sky-800',
        'bg-amber-400', 
        'cursor-crosshair'
      )
      sq.classList.add('bg-rose-500', 'cursor-not-allowed')
    })
  } else if (playerType === 'player'){
    const sunkSquares = shipLocation.map(coordinates => (
      document.getElementById(`p-${coordinates}`)
    ))
    sunkSquares.forEach(sq => {
      sq.classList.remove(
        'bg-sky-950', 
        'bg-amber-400',  
      )
      sq.classList.add('bg-rose-500')
    })
    const shipSegments = shipLocation.map(coordinates => (
      document.querySelector(`#p-${coordinates} .ship-segment`)
    ))
    shipSegments.forEach(segment => {
      if (!segment.classList.contains('ship-end-segment')){
        segment.classList.add('bg-rose-700')
        segment.classList.remove('bg-gray-400', 'bg-amber-600')
      } else {
        segment.classList.add('text-rose-700')
        segment.classList.remove('text-gray-400', 'text-amber-600')
      }
    })
  }

  switch (shipName){
    case 'Aircraft Carrier':
      const aircraftCarrierStatusDisplay = document.getElementById(
        `${playerType}-aircraft-carrier-status`
      )
      aircraftCarrierStatusDisplay.classList.remove('text-amber-400')
      aircraftCarrierStatusDisplay.classList.add('text-rose-500', 'line-through')
      break
    case 'Battleship':
      const battleshipStatusDisplay = document.getElementById(
        `${playerType}-battleship-status`
      )
      battleshipStatusDisplay.classList.remove('text-amber-400')
      battleshipStatusDisplay.classList.add('text-rose-500', 'line-through')
      break
    case 'Destroyer':
      const destroyerStatusDisplay = document.getElementById(
        `${playerType}-destroyer-status`
      )
      destroyerStatusDisplay.classList.remove('text-amber-400')
      destroyerStatusDisplay.classList.add('text-rose-500', 'line-through')
      break
    case 'Submarine':
      const submarineStatusDisplay = document.getElementById(
        `${playerType}-submarine-status`
      )
      submarineStatusDisplay.classList.remove('text-amber-400')
      submarineStatusDisplay.classList.add('text-rose-500', 'line-through')
      break
    case 'Patrol Boat':
      const patrolBoatStatusDisplay = document.getElementById(
        `${playerType}-patrol-boat-status`
      )
      patrolBoatStatusDisplay.classList.remove('text-amber-400')
      patrolBoatStatusDisplay.classList.add('text-rose-500', 'line-through')
      break
  }

  const idleAnimation = document.getElementById('idle-animation')
  idleAnimation.classList.add('opacity-0')

  const messageArea = document.getElementById('status-display-text')
  const attackingPlayer = playerType === 'player'
    ? 'computer'
    : 'player'

  messageArea.textContent = `${attackingPlayer} sunk ${playerType}'s ${shipName}`
  messageArea.classList.remove('opacity-0')

  setTimeout(() => {
    messageArea.classList.remove('opacity-0')
    messageArea.classList.add('opacity-0')

    idleAnimation.classList.remove('opacity-0')
  }, 5000)
}

function showRestartModal(){
  const restartGameModal = document.getElementById('restart-game-modal')
  restartGameModal.showModal()
}

function showGameOverModal(winner){
  const gameOverModalMessage = document.getElementById('game-over-modal-message')
  if (winner === 'player'){
    gameOverModalMessage.classList.remove('text-rose-500')
    gameOverModalMessage.classList.add('text-green-400')
    gameOverModalMessage.textContent = 'you win'
  } else if (winner === 'computer'){
    gameOverModalMessage.classList.remove('text-green-400')
    gameOverModalMessage.classList.add('text-rose-500')
    gameOverModalMessage.textContent = 'you lose'
  }
  const gameOverModal = document.getElementById('game-over-modal')
  gameOverModal.showModal()

  const gameOverBadge = document.createElement('div')
  gameOverBadge.classList.add(
    'absolute',
    'left-1/2',
    'top-1/2',
    '-translate-x-1/2',
    '-translate-y-full',
    'bg-sky-800/80',
    'border-2',
    'border-sky-300',
    'rounded-sm',
    'text-center',
    'uppercase',
    'text-sky-200',
    'font-bold',
    'text-4xl',
    'py-4',
    'px-8',
    'z-10',
    'pointer-events-none',
  )
  gameOverBadge.textContent = 'game over'
  const mainArea = document.getElementById('main-area')
  mainArea.append(gameOverBadge)

  const computerBoard = document.getElementById('computer-board')
  computerBoard.classList.remove('cursor-crosshair')
  computerBoard.classList.add('cursor-not-allowed')

  const computerBoardSquares = document.querySelectorAll('.computer-board-square')
  computerBoardSquares.forEach(cbsq => {
    cbsq.classList.remove('cursor-crosshair', 'hover:bg-sky-800')
    cbsq.classList.add('cursor-not-allowed')
  })
}

function displayPlayerShips(shipPlacements){
  shipPlacements.forEach(sqIds => {
    let shipOrientation
    Number(sqIds[0].slice(1)) !== Number(sqIds[sqIds.length - 1].slice(1))
      ? shipOrientation = 'horizontal'
      : shipOrientation = 'vertical' 
    sqIds.forEach((sqId, index) => {
      const square = document.getElementById(`p-${sqId}`)
      if (index === 0){
        const svgContainer = document.createElement('div')
        svgContainer.classList.add(
          shipOrientation === 'horizontal' ? 'h-full' : 'w-full',
          shipOrientation === 'horizontal' ? 'w-[45px]' : 'h-[45px]',
          'absolute',
          'flex',
          shipOrientation === 'vertical' && 'flex-col',
          'justify-end',
          'items-center',
        )

        const shipSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        shipSvg.setAttribute('width', '32')
        shipSvg.setAttribute('height', '36')
        shipSvg.setAttribute('viewBox', '0 0 30 33')
        shipSvg.setAttribute('fill', 'none')
        shipSvg.classList.add(
          'text-gray-400',
          shipOrientation === 'horizontal' ? 'rotate-90' : 'rotate-180',
          'pointer-events-none',
          'ship-segment',
          'ship-end-segment'
        )
        const shipSvgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path')
        shipSvgPath.setAttribute('fill', 'currentColor')
        shipSvgPath.setAttribute('d', 'M30 1.35207C30 13.6173 24.4938 25.2345 15 33V33V33C5.50619 25.2345 0 13.6173 0 1.35207V-3.57628e-07L30 -3.57628e-07V1.35207Z')
        shipSvg.append(shipSvgPath)

        svgContainer.append(shipSvg)

        square.append(svgContainer)
      } else if (index === sqIds.length - 1){
        const svgContainer = document.createElement('div')
        svgContainer.classList.add(
          shipOrientation === 'horizontal' ? 'h-full' : 'w-full',
          shipOrientation === 'horizontal' ? 'w-[42px]' : 'h-[42px]',
          'absolute',
          'top-1/2',
          '-translate-y-1/2',
          'left-1/2',
          '-translate-x-1/2',
          'flex',
          shipOrientation === 'vertical' && 'flex-col',
          'justify-start',
          'items-center',
        )

        const shipSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        shipSvg.setAttribute('width', '32')
        shipSvg.setAttribute('height', '36')
        shipSvg.setAttribute('viewBox', '0 0 30 33')
        shipSvg.setAttribute('fill', 'none')
        shipSvg.classList.add(
          'text-gray-400',
          shipOrientation === 'horizontal' && 'rotate-[270deg]',
          'pointer-events-none',
          'ship-segment', 
          'ship-end-segment'
        )
        const shipSvgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path')
        shipSvgPath.setAttribute('fill', 'currentColor')
        shipSvgPath.setAttribute('d', 'M30 1.35207C30 13.6173 24.4938 25.2345 15 33V33V33C5.50619 25.2345 0 13.6173 0 1.35207V-3.57628e-07L30 -3.57628e-07V1.35207Z')
        shipSvg.append(shipSvgPath)

        svgContainer.append(shipSvg)

        square.append(svgContainer)
      } else {
        const shipSegment = document.createElement('div')
        shipSegment.classList.add(
          'bg-gray-400',
          'ship-segment',
          shipOrientation === 'horizontal' ? 'h-[32px]' : 'h-[42px]',
          shipOrientation === 'horizontal' ? 'w-[42px]' : 'w-[32px]',
          'absolute',
          'top-1/2',
          '-translate-y-1/2',
          'left-1/2',
          '-translate-x-1/2'
        )
        square.append(shipSegment)
      }
    })
  })
}

function revealComputerShipLocations(unhitSquares){
  unhitSquares.forEach(coordinates => {
    const square = document.getElementById(`c-${coordinates}`)
    square.classList.remove('bg-sky-950')
    square.classList.add('bg-green-500/60')
  })
}

export { 
  mountGamePage,
  displayPlayerShips,  
  showShipHit, 
  showMiss, 
  showShipSunk, 
  showGameOverModal,
  revealComputerShipLocations
}
