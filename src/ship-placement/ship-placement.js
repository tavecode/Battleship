import "../styles.css"

function expandShip(squareYCoordinate, squareXCoordinate, shipToFlip){
  let shipOrientation;
  let shipNumber;
  if (shipToFlip){
    shipNumber = shipToFlip
    shipOrientation = shipPlacementState[`ship${shipNumber}`].orientation
  } else {
    shipOrientation = shipPlacementState[
      shipPlacementState.currentlyDragging.split('-').join('')
    ].orientation
    shipNumber = Number(shipPlacementState.currentlyDragging.slice(-1))
  }

  let expansionSquareIds = []

  const shipLength = shipNumber === 1 
    ? 5
    : shipNumber === 2
    ? 4
    : shipNumber === 3 || shipNumber === 4
    ? 3
    : 2

  if (
    ((shipOrientation === 'horizontal') && !shipToFlip) || 
    ((shipOrientation === 'vertical') && shipToFlip)
  ){
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
    expandHorizontally(squareYCoordinate, squareXCoordinate)
  } else {
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
    expandVertically(squareYCoordinate, squareXCoordinate)
  }

  return expansionSquareIds
}

let shipPlacementState = {
  ship1: {
    orientation: 'horizontal',
    squaresOccupied: [],
    placed: false
  },
  ship2: {
    orientation: 'horizontal',
    squaresOccupied: [],
    placed: false
  },
  ship3: {
    orientation: 'horizontal',
    squaresOccupied: [],
    placed: false
  },
  ship4: {
    orientation: 'horizontal',
    squaresOccupied: [],
    placed: false
  },
  ship5: {
    orientation: 'horizontal',
    squaresOccupied: [],
    placed: false
  },
  currentlyDragging: null
}

function resetShipPlacementState(){
  shipPlacementState = {
    ship1: {
      orientation: 'horizontal',
      squaresOccupied: [],
      placed: false
    },
    ship2: {
      orientation: 'horizontal',
      squaresOccupied: [],
      placed: false
    },
    ship3: {
      orientation: 'horizontal',
      squaresOccupied: [],
      placed: false
    },
    ship4: {
      orientation: 'horizontal',
      squaresOccupied: [],
      placed: false
    },
    ship5: {
      orientation: 'horizontal',
      squaresOccupied: [],
      placed: false
    },
    currentlyDragging: null
  }
}

const numbersToLetters = {
  1: 'a',
  2: 'b',
  3: 'c',
  4: 'd',
  5: 'e',
  6: 'f',
  7: 'g',
  8: 'h',
  9: 'i',
  10: 'j'
}
const lettersToNumbers = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
  i: 9,
  j: 10
}

function mountShipPlacementPage(saveAndContinueFunction){
  resetShipPlacementState()

  const mainArea = document.getElementById('main-area')

  const header = document.createElement('h1')
  header.textContent = 'place your ships'
  header.classList.add('text-center', 'text-2xl', 'uppercase')
  mainArea.append(header)

  const page = document.createElement('div')
  page.classList.add('w-full', 'flex', 'justify-center')

  const shipPlacement = document.createElement('div')
  shipPlacement.classList.add(
    'scale-[0.55]',
    'sm:scale-[0.8]',
    'lg:scale-100',
    '-mx-52',
    '-mb-52',
    'sm:mt-1',
    'sm:mb-0',
    '-mt-52',
    'justify-center',
    'grid-cols-[34px_450px]',
    'grid-rows-[34px_450px_450px]',
    'sm:grid-cols-[34px_450px_241px]',
    'sm:grid-rows-[34px_450px]',
    'bg-sky-950',
    'p-2',
    'w-fit',
    'rounded-sm',
    'lg:mx-auto',
    'grid',
    'gap-1'
  )

  const cornerPiece = document.createElement('div')
  cornerPiece.classList.add('bg-sky-800', 'border', 'border-sky-500')
  shipPlacement.append(cornerPiece)

  const numbers = document.createElement('div')
  numbers.classList.add('flex')
  for (let i = 1; i <= 10; i++){
    const numberCell = document.createElement('div')
    numberCell.classList.add(
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
    numberCell.textContent = i
    numbers.append(numberCell)
  }
  shipPlacement.append(numbers)

  const letters = document.createElement('div')
  letters.classList.add('col-start-1', 'flex', 'flex-col')
  for (let i = 1; i <= 10; i++){
    const letterCell = document.createElement('div')
    letterCell.classList.add(
      'bg-sky-800',
      'border',
      'border-sky-500',
      'h-full',
      'grid',
      'place-items-center',
      'leading-7',
      'text-2xl',
      'font-medium',
      'text-sky-200',
      'uppercase'
    )
    letterCell.textContent = numbersToLetters[i]
    letters.append(letterCell)
  }
  shipPlacement.append(letters)

  const board = document.createElement('div')
  board.classList.add(
    'col-start-2',
    'overflow-hidden',
    'relative',
    'grid',
    'grid-cols-10',
    'grid-rows-10'
  )
  for (let i = 0; i < 100; i++){
    const square = document.createElement('div')
    square.classList.add(
      'bg-sky-950',
      'border',
      'border-sky-500',
      'relative'
    )

    let coordinates = ''
    switch (true){
      case i < 10:
        coordinates = 'a' + (i + 1)
        break
      case i < 20:
        coordinates = 'b' + ((i - 10) + 1)
        break
      case i < 30:
        coordinates = 'c' + ((i - 20) + 1)
        break
      case i < 40:
        coordinates = 'd' + ((i - 30) + 1)
        break
      case i < 50:
        coordinates = 'e' + ((i - 40) + 1)
        break
      case i < 60:
        coordinates = 'f' + ((i - 50) + 1)
        break
      case i < 70:
        coordinates = 'g' + ((i - 60) + 1)
        break
      case i < 80:
        coordinates = 'h' + ((i - 70) + 1)
        break
      case i < 90:
        coordinates = 'i' + ((i - 80) + 1)
        break
      case i < 100:
        coordinates = 'j' + ((i - 90) + 1)
        break
    }

    square.setAttribute('id', `ship-placement-${coordinates}`)

    square.addEventListener('dragover', e => {
      e.preventDefault()
    })

    let dropSquareIds = []

    square.addEventListener('dragenter', e => {
      e.preventDefault()
      if (!shipPlacementState.currentlyDragging) return

      const squareCoordinates = square.id.split('-')[2]
      const squareYCoordinate = squareCoordinates.charAt(0)
      const squareXCoordinate = squareCoordinates.slice(1)

      dropSquareIds = expandShip(squareYCoordinate, squareXCoordinate)

      const shipOrientation = shipPlacementState[
        shipPlacementState.currentlyDragging.split('-').join('')
      ].orientation

      dropSquareIds = sortLineOfSquaresByOrientation(shipOrientation, dropSquareIds)

      dropSquareIds.forEach((sqId, index) => {
        const dropSquare = document.getElementById(`ship-placement-${sqId}`)

        let hasActiveHoverIndicator = false
        const children = Array.from(dropSquare.children)
        for (const child of children){
          if (
            child.classList.contains('hover-indicator') ||
            child.classList.contains('occupied-hover-indicator')
          ) hasActiveHoverIndicator = true
        }
        
        if (!hasActiveHoverIndicator){
          if (
            [...Array(5)].some((_, i) => (
              i + 1 === Number(shipPlacementState.currentlyDragging.split('-')[1])
                ? false
                : shipPlacementState[`ship${i + 1}`].squaresOccupied.includes(sqId)
            ))
          ) {
            dropSquare.classList.add('cannot-drop')

            if (index === 0){
              const shipSegment = createShipSegment('red', 'first', shipOrientation)
              dropSquare.append(shipSegment)
            } else if (index === dropSquareIds.length - 1){
              const shipSegment = createShipSegment('red', 'last', shipOrientation)
              dropSquare.append(shipSegment)
            } else {
              const shipSegment = createShipSegment('red', 'middle', shipOrientation)
              dropSquare.append(shipSegment)
            }
          } else {
            dropSquare.classList.add('drop-ready')
            
            if (index === 0){
              const shipSegment = createShipSegment('faded', 'first', shipOrientation)
              dropSquare.append(shipSegment)
            } else if (index === dropSquareIds.length - 1){
              const shipSegment = createShipSegment('faded', 'last', shipOrientation)
              dropSquare.append(shipSegment)
            } else {
              const shipSegment = createShipSegment('faded', 'middle', shipOrientation)
              dropSquare.append(shipSegment)
            }
          }
        }
      })
    })
    square.addEventListener('dragleave', e => {
      e.preventDefault()
      if (!shipPlacementState.currentlyDragging) return

      if (e.relatedTarget.id.includes('ship-placement-')) {
        let overlappingSquareIds = expandShip(
          e.relatedTarget.id.split('-')[2].charAt(0),
          e.relatedTarget.id.split('-')[2].slice(1)
        )

        if (overlappingSquareIds.sort().join(',') !== dropSquareIds.sort().join(',')){
          const shipOrientation = shipPlacementState[
            shipPlacementState.currentlyDragging.split('-').join('')
          ].orientation

          overlappingSquareIds = sortLineOfSquaresByOrientation(shipOrientation, overlappingSquareIds)

          let direction = ''
          if (overlappingSquareIds[overlappingSquareIds.length - 2] === dropSquareIds[dropSquareIds.length - 1]){
            direction = 'right/down'
          } else {
            direction = 'left/up'
          }

          const leftOrTopmostSquareId = overlappingSquareIds.find(oSqId => dropSquareIds.includes(oSqId))
          const rightOrBottommostSquareId = overlappingSquareIds.findLast(oSqId => dropSquareIds.includes(oSqId))

          if (leftOrTopmostSquareId && rightOrBottommostSquareId){
            const leftOrTopmostSquare = document.getElementById(`ship-placement-${leftOrTopmostSquareId}`)
            const rightOrBottommostSquare = document.getElementById(`ship-placement-${rightOrBottommostSquareId}`)

            const fadedShipSegment = createShipSegment('faded', 'middle', shipOrientation)

            const svgContainer = document.createElement('div')
            svgContainer.classList.add(
              shipOrientation === 'horizontal' ? 'h-full' : 'w-full',
              shipOrientation === 'horizontal' ? 'w-[45px]' : 'h-[45px]',
              'edge-hover-indicator',
              'hover-indicator',
              'pointer-events-none',
              'absolute',
              'flex',
              shipOrientation === 'vertical' && 'flex-col',
              'justify-end',
              'items-center',
              'z-20'
            )
            const fadedShipSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
            fadedShipSvg.setAttribute('width', '34')
            fadedShipSvg.setAttribute('height', '37')
            fadedShipSvg.setAttribute('viewBox', '0 0 30 33')
            fadedShipSvg.setAttribute('fill', 'none')
            fadedShipSvg.classList.add(
              'text-sky-700',
              shipOrientation === 'horizontal' ? 'rotate-90' : 'rotate-180',
              'pointer-events-none',
            )
            const fadedShipSvgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path')
            fadedShipSvgPath.setAttribute('fill', 'currentColor')
            fadedShipSvgPath.setAttribute('d', 'M30 1.35207C30 13.6173 24.4938 25.2345 15 33V33V33C5.50619 25.2345 0 13.6173 0 1.35207V-3.57628e-07L30 -3.57628e-07V1.35207Z')
            fadedShipSvg.append(fadedShipSvgPath)
            fadedShipSvg.classList.add('faded-svg-segment-two')
            svgContainer.append(fadedShipSvg)

            const redShipSegment = createShipSegment('red', 'middle', shipOrientation)

            const redSvgContainer = document.createElement('div')
            redSvgContainer.classList.add(
              shipOrientation === 'horizontal' ? 'h-full' : 'w-full',
              shipOrientation === 'horizontal' ? 'w-[45px]' : 'h-[45px]',
              'edge-hover-indicator',
              'occupied-hover-indicator',
              'pointer-events-none',
              'absolute',
              'flex',
              shipOrientation === 'vertical' && 'flex-col',
              'justify-end',
              'items-center',
              'z-20'
            )
            const redShipSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
            redShipSvg.setAttribute('width', '34')
            redShipSvg.setAttribute('height', '37')
            redShipSvg.setAttribute('viewBox', '0 0 30 33')
            redShipSvg.setAttribute('fill', 'none')
            redShipSvg.classList.add(
              'text-rose-700',
              shipOrientation === 'horizontal' ? 'rotate-90' : 'rotate-180',
              'pointer-events-none'
            )
            const redShipSvgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path')
            redShipSvgPath.setAttribute('fill', 'currentColor')
            redShipSvgPath.setAttribute('d', 'M30 1.35207C30 13.6173 24.4938 25.2345 15 33V33V33C5.50619 25.2345 0 13.6173 0 1.35207V-3.57628e-07L30 -3.57628e-07V1.35207Z')
            redShipSvg.append(redShipSvgPath)
            redShipSvg.classList.add('red-svg-segment-two')
            redSvgContainer.append(redShipSvg)

            const shipNumber = shipPlacementState.currentlyDragging.slice(-1)

            if (direction === 'right/down'){
              if (shipNumber !== 5){
                const rightOrBottommostSquareChildren = Array.from(rightOrBottommostSquare.children)
                for (const child of rightOrBottommostSquareChildren){
                  if (child.classList.contains('hover-indicator')){
                    rightOrBottommostSquare.removeChild(child)
                    rightOrBottommostSquare.append(fadedShipSegment)
                  } else if (child.classList.contains('occupied-hover-indicator')){
                    rightOrBottommostSquare.removeChild(child)
                    rightOrBottommostSquare.append(redShipSegment)
                  }
                }
              }

              const leftOrTopmostSquareChildren = Array.from(leftOrTopmostSquare.children)
              for (const child of leftOrTopmostSquareChildren){
                if (child.classList.contains('hover-indicator')){
                  leftOrTopmostSquare.removeChild(child)
                  leftOrTopmostSquare.append(svgContainer)
                } else if (child.classList.contains('occupied-hover-indicator')){
                  leftOrTopmostSquare.removeChild(child)
                  leftOrTopmostSquare.append(redSvgContainer)
                }
              }
            } else if (direction === 'left/up'){
              if (shipNumber !== 5){
                const leftOrTopmostSquareChildren = Array.from(leftOrTopmostSquare.children)
                for (const child of leftOrTopmostSquareChildren){
                  if (child.classList.contains('hover-indicator')){
                    leftOrTopmostSquare.removeChild(child)
                    leftOrTopmostSquare.append(fadedShipSegment)
                  } else if (child.classList.contains('occupied-hover-indicator')){
                    leftOrTopmostSquare.removeChild(child)
                    leftOrTopmostSquare.append(redShipSegment)
                  }
                }
              }

              const rightOrBottommostSquareChildren = Array.from(rightOrBottommostSquare.children)
              for (const child of rightOrBottommostSquareChildren){
                if (child.classList.contains('hover-indicator')){
                  rightOrBottommostSquare.removeChild(child)
                  svgContainer.classList.remove('justify-end')
                  svgContainer.classList.add('justify-start')
                  if (shipOrientation === 'horizontal'){
                    fadedShipSvg.classList.add('rotate-[270deg]')
                  } else {
                    fadedShipSvg.classList.add('rotate-[0deg]')
                  } 
                  fadedShipSvg.classList.remove('rotate-90')
                  rightOrBottommostSquare.append(svgContainer)
                } else if (child.classList.contains('occupied-hover-indicator')){
                  rightOrBottommostSquare.removeChild(child)
                  redSvgContainer.classList.remove('justify-end')
                  redSvgContainer.classList.add('justify-start')
                  if (shipOrientation === 'horizontal'){
                    redShipSvg.classList.add('rotate-[270deg]')
                  } else {
                    redShipSvg.classList.add('rotate-[0deg]')
                  }
                  redShipSvg.classList.remove('rotate-90')
                  rightOrBottommostSquare.append(redSvgContainer)
                }
              }
            }
          }
        }

        dropSquareIds = dropSquareIds.filter(dSqId => (
          !overlappingSquareIds.includes(dSqId)
        ))
      }
      
      dropSquareIds.forEach(sqId => {
        const dropSquare = document.getElementById(`ship-placement-${sqId}`)

        dropSquare.classList.remove('drop-ready', 'cannot-drop')

        const dropSquareChildren = Array.from(dropSquare.children)
        for (const child of dropSquareChildren){
          if (
            !child.classList.contains('placed-ship-segment') &&
            !child.classList.contains('placed-ship-flip-button')
          ) dropSquare.removeChild(child)
        }
      })

      dropSquareIds = []
    })

    square.addEventListener('drop', e => {
      e.preventDefault()
      if (!shipPlacementState.currentlyDragging) return
      if (!dropSquareIds.length) return 

      dropSquareIds.forEach(sqId => {
        const dropSquare = document.getElementById(`ship-placement-${sqId}`)

        dropSquare.classList.remove('drop-ready', 'cannot-drop')

        const children = Array.from(dropSquare.children)
        for (const child of children){
          if (
            !child.classList.contains('placed-ship-segment') &&
            !child.classList.contains('placed-ship-flip-button')
          ) dropSquare.removeChild(child)
        }
      })

      const shipName = shipPlacementState.currentlyDragging.split('-').join('')
      const shipNumber = Number(shipPlacementState.currentlyDragging.split('-')[1])

      const isOccupiedDrop = [...Array(5)].some((_, i) => (
        i + 1 === shipNumber
          ? false
          : shipPlacementState[`ship${i + 1}`].squaresOccupied
              .some(oSqId => (
                dropSquareIds.some(dSqId => (
                  dSqId === oSqId
                )
              )
            ))
      ))

      if (!isOccupiedDrop){
        if (
          shipPlacementState[shipName].placed
        ) {
          const oldSquareIds = shipPlacementState[shipName].squaresOccupied
          oldSquareIds.forEach(oldSquareId => {
            const oldSquare = document.querySelector(`#ship-placement-${oldSquareId}`)

            while (oldSquare.firstChild){
              oldSquare.removeChild(oldSquare.firstChild)
            }
          })
        }

        shipPlacementState[shipName].squaresOccupied = dropSquareIds
        shipPlacementState[shipName].placed = true

        const shipCell = document.getElementById(`ship-cell-${shipPlacementState.currentlyDragging.split('-')[1]}`)
        while (shipCell.firstChild){
          shipCell.removeChild(shipCell.lastChild)
        }

        placeShip(dropSquareIds, shipNumber)

        if (
          [...Array(5)].every((_, i) => (
            shipPlacementState[`ship${i + 1}`].placed === true
          ))
        ){
          saveButton.disabled = false
          saveButton.classList.remove(
            'bg-gray-800',
            'text-gray-600',
            'cursor-not-allowed'
          )
          saveButton.classList.add(
            'bg-green-500', 
            'hover:bg-green-400', 
            'active:bg-green-700', 
            'text-black', 
            'cursor-pointer'
          )
        }
      }

      dropSquareIds = []
      shipPlacementState.currentlyDragging = null
    })

    board.append(square)
  }
  shipPlacement.append(board)

  const dock = document.createElement('div')
  dock.classList.add(
    'bg-gray-800',
    'col-span-2',
    'sm:col-start-3',
    'sm:row-start-2',
    'sm:ml-4',
    'mt-4',
    'sm:mt-0',
    'border',
    'border-gray-500',
    'overflow-y-auto'
  )
  dock.setAttribute('id', 'dock')

  for (let i = 0; i < 5; i++){
    const shipCell = document.createElement('div')
    shipCell.classList.add(
      'border-gray-500',
      'h-[45px]',
      'w-full',
      'flex',
      'items-center'
    )
    i === 0 
      ? shipCell.classList.add('border-b')
      : shipCell.classList.add('border-y')
    if (i === 4){
      shipCell.classList.add('border-b-2')
      shipCell.classList.remove('border-b')
    }
    shipCell.setAttribute('id', `ship-cell-${i + 1}`)

    const ship = document.createElement('div')
    ship.setAttribute('draggable', true)
    ship.classList.add(
      'cursor-grab',
      'ml-[10px]',
      'relative',
      'flex',
      'items-center'
    )
    ship.setAttribute('id', `ship-${i + 1}`)
    ship.addEventListener('dragstart', e => {
      e.dataTransfer.setData("text/plain", ship.id)
      shipPlacementState.currentlyDragging = ship.id

      const thisShip = shipPlacementState.currentlyDragging
      preventDragConflicts(thisShip.split('-')[1])

      const shipEndSegments = document.querySelectorAll(`#ship-${i + 1} .docked-ship-end`)
      shipEndSegments.forEach(ses => {
        ses.classList.remove('text-gray-400')
        ses.classList.add('text-gray-300')
      })
      const shipMiddleSegments = document.querySelectorAll(`#ship-${i + 1} .docked-ship-middle`)
      shipMiddleSegments.forEach(sms => {
        sms.classList.remove('bg-gray-400')
        sms.classList.add('bg-gray-300')
      })
    })
    ship.addEventListener('dragend', () => {
      removeDragConflictPrevention()

      const shipMiddleSegments = document.querySelectorAll(`#ship-${i + 1} .docked-ship-middle`)
      shipMiddleSegments.forEach(sms => {
        sms.classList.remove('bg-gray-300')
        sms.classList.add('bg-gray-400')
      })
      const shipEndSegments = document.querySelectorAll(`#ship-${i + 1} .docked-ship-end`)
      shipEndSegments.forEach(ses => {
        ses.classList.remove('text-gray-300')
        ses.classList.add('text-gray-400')
      })
    })

    const shipLength = i === 0 
      ? 5
      : i === 1 
      ? 4
      : i === 2 || i === 3
      ? 3
      : 2

    for (let j = 0; j < shipLength; j++){
      if (j === 0){
        const shipSegment = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        shipSegment.setAttribute('width', '34')
        shipSegment.setAttribute('height', '37')
        shipSegment.setAttribute('viewBox', '0 0 30 33')
        shipSegment.setAttribute('fill', 'none')
        shipSegment.classList.add(
          'docked-ship-end',
          'transition-colors',
          'duration-75',
          'text-gray-400',
          'rotate-90'
        )
        const shipSegmentPath = document.createElementNS('http://www.w3.org/2000/svg', 'path')
        shipSegmentPath.setAttribute('fill', 'currentColor')
        shipSegmentPath.setAttribute('d', 'M30 1.35207C30 13.6173 24.4938 25.2345 15 33V33V33C5.50619 25.2345 0 13.6173 0 1.35207V-3.57628e-07L30 -3.57628e-07V1.35207Z')
        shipSegment.append(shipSegmentPath)
        shipSegment.classList.add('svg-segment-one')
        ship.append(shipSegment)
      } else if (j === shipLength - 1){
        const shipSegment = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        shipSegment.setAttribute('width', '34')
        shipSegment.setAttribute('height', '37')
        shipSegment.setAttribute('viewBox', '0 0 30 33')
        shipSegment.setAttribute('fill', 'none')
        shipSegment.classList.add(
          'docked-ship-end',
          'transition-colors',
          'duration-75',
          'text-gray-400',
          'rotate-[270deg]'
        )
        const shipSegmentPath = document.createElementNS('http://www.w3.org/2000/svg', 'path')
        shipSegmentPath.setAttribute('fill', 'currentColor')
        shipSegmentPath.setAttribute('d', 'M30 1.35207C30 13.6173 24.4938 25.2345 15 33V33V33C5.50619 25.2345 0 13.6173 0 1.35207V-3.57628e-07L30 -3.57628e-07V1.35207Z')
        shipSegment.append(shipSegmentPath)
        shipSegment.classList.add('svg-segment-two')
        ship.append(shipSegment)
      } else {
        const shipSegment = document.createElement('div')
        shipSegment.classList.add(
          'docked-ship-middle',
          'transition-colors',
          'duration-75',
          'bg-gray-400',
          'h-[34px]',
          'w-[45px]'
        )
        shipSegment.classList.add('standard-segment')
        ship.append(shipSegment)
      }
    }

    const flipButton = document.createElement('button')
    flipButton.addEventListener('click', () => flipDockedShip(i + 1))
    flipButton.classList.add(
      'transition-colors',
      'duration-75',
      'z-10',
      'absolute',
      'top-1/2',
      'left-1/2',
      '-translate-x-1/2',
      '-translate-y-1/2',
      'cursor-pointer',
      'text-xs',
      'font-semibold',
      'px-1',
      'text-black',
      'bg-amber-400',
      'hover:bg-amber-300',
      'active:bg-amber-700',
      'border',
      'border-black',
      'rounded-sm',
      'uppercase'
    )
    flipButton.textContent = 'flip'
    ship.append(flipButton)

    shipCell.append(ship)

    dock.append(shipCell)
  }

  shipPlacement.append(dock)

  page.append(shipPlacement)

  mainArea.append(page)

  const saveButton = document.createElement('button')
  saveButton.disabled = true
  saveButton.textContent = 'save & continue'
  saveButton.classList.add(
    'uppercase',
    'text-gray-600',
    'font-semibold',
    'bg-gray-800',
    'cursor-not-allowed',
    'transition-colors',
    'duration-75',
    'w-full',
    'mt-6',
    'lg:mt-0',
    'p-2',
    'lg:px-6',
    'lg:py-3',
    'lg:border-l',
    'lg:border-t',
    'lg:border-sky-400',
    'lg:absolute',
    'lg:right-0',
    'lg:bottom-0',
    'rounded-sm',
    'lg:rounded-none',
    'lg:rounded-tl-sm',
    'lg:w-auto'
  )

  saveButton.addEventListener('click', () => {
    saveAndContinueFunction(
      [...Array(5)].map((_, i) => (
        shipPlacementState[`ship${i + 1}`].squaresOccupied
      ))
    )
  })
  mainArea.append(saveButton)
}

function flipDockedShip(shipNumber){
  const shipOrientation = shipPlacementState[`ship${shipNumber}`].orientation
  shipOrientation === 'horizontal'
    ? shipPlacementState[`ship${shipNumber}`].orientation = 'vertical'
    : shipPlacementState[`ship${shipNumber}`].orientation = 'horizontal'
  
  const shipCell = document.getElementById(`ship-cell-${shipNumber}`)
  const ship = document.getElementById(`ship-${shipNumber}`)
  const flipButton = document.querySelector(`#ship-${shipNumber} button`)

  if (shipOrientation === 'horizontal'){
    flipButton.classList.remove('px-1')
    flipButton.classList.add('px-[1px]')

    shipCell.classList.remove('h-[45px]')
    shipCell.classList.add('min-h-[45px]')

    ship.classList.add('flex-col', 'my-[0.32rem]')

    const standardSegments = document.querySelectorAll(`#ship-${shipNumber} .standard-segment`)
    standardSegments.forEach(s => {
      s.classList.add('h-[45px]', 'w-[34px]')
      s.classList.remove('h-[34px]', 'w-[45px]')
    })

    const svgSegmentOne = document.querySelector(`#ship-${shipNumber} .svg-segment-one`)
    svgSegmentOne.classList.add('rotate-180')
    svgSegmentOne.classList.remove('rotate-90')

    const svgSegmentTwo = document.querySelector(`#ship-${shipNumber} .svg-segment-two`)
    svgSegmentTwo.classList.remove('rotate-[270deg]')
  } else {
    flipButton.classList.remove('px-[1px]')
    flipButton.classList.add('px-1')

    shipCell.classList.add('h-[45px]')

    ship.classList.remove('flex-col', 'my-[0.32rem]')

    const standardSegments = document.querySelectorAll(`#ship-${shipNumber} .standard-segment`)
    standardSegments.forEach(s => {
      s.classList.add('h-[34px]', 'w-[45px]')
      s.classList.remove('h-[45px]', 'w-[34px]')
    })

    const svgSegmentOne = document.querySelector(`#ship-${shipNumber} .svg-segment-one`)
    svgSegmentOne.classList.add('rotate-90')
    svgSegmentOne.classList.remove('rotate-180')

    const svgSegmentTwo = document.querySelector(`#ship-${shipNumber} .svg-segment-two`)
    svgSegmentTwo.classList.add('rotate-[270deg]')
  }
}

function flipShip(shipNumber){
  let shipOrientation = shipPlacementState[`ship${shipNumber}`].orientation

  const shipLength = shipNumber === 1 
  ? 5
  : shipNumber === 2
  ? 4
  : shipNumber === 3 || shipNumber === 4
  ? 3
  : 2

  let currentShipSquares = shipPlacementState[`ship${shipNumber}`].squaresOccupied
  currentShipSquares = sortLineOfSquaresByOrientation(shipOrientation, currentShipSquares)

  const middleSquareIndex = Math.ceil(shipLength / 2) - 1
  const middleSquareCoordinates = currentShipSquares[middleSquareIndex]

  let newSquareIds = expandShip(
    middleSquareCoordinates.charAt(0),
    middleSquareCoordinates.slice(1),
    shipNumber
  )

  let isOccupiedFlip = [...Array(5)].some((_, i) => (
    i + 1 !== shipNumber 
    ? shipPlacementState[`ship${i + 1}`].squaresOccupied.some(oSqId => (
        newSquareIds.includes(oSqId)
      )) 
    : false
  ))

  if (!isOccupiedFlip){
    if (shipOrientation === 'horizontal'){
      shipPlacementState[`ship${shipNumber}`].orientation = 'vertical'
      shipOrientation = 'vertical'
    } else {
      shipPlacementState[`ship${shipNumber}`].orientation = 'horizontal'
      shipOrientation = 'horizontal'
    }

    shipPlacementState[`ship${shipNumber}`].squaresOccupied.forEach(sqId => {
      const currentSquare = document.getElementById(`ship-placement-${sqId}`)

      while (currentSquare.firstChild){
        currentSquare.removeChild(currentSquare.firstChild)
      }
    })

    shipPlacementState[`ship${shipNumber}`].squaresOccupied = newSquareIds

    placeShip(newSquareIds, shipNumber)
  } else {
    let flipButton
    if (shipLength % 2 !== 0){
      flipButton = document.querySelector(`#ship-placement-${middleSquareCoordinates} button`)
    } else {
      flipButton = document.querySelector(`#ship-placement-${currentShipSquares[Math.ceil(shipLength / 2)]} button`)
    }

    flipButton.classList.add(
      'bg-rose-600', 
      'active:bg-rose-600', 
      'hover:bg-rose-600',
      'scale-95'
    )
    flipButton.classList.remove(
      'bg-amber-400',
      'hover:bg-amber-300',
      'active:bg-amber-700',
    )

    setTimeout(() => {
      flipButton.classList.remove(
        'bg-rose-600',
        'active:bg-rose-600', 
        'hover:bg-rose-600',
        'scale-95'
      )
      flipButton.classList.add(
        'bg-amber-400',
        'hover:bg-amber-300',
        'active:bg-amber-700',
      )
    }, 300)
  }
}

function sortLineOfSquaresByOrientation(orientation, squares){
  let sortedSquares
  if (orientation === 'horizontal'){
    sortedSquares = squares.sort((sqIdA, sqIdB) => (
      Number(sqIdA.slice(1)) - Number(sqIdB.slice(1))
    ))
  } else if (orientation === 'vertical'){
    sortedSquares = squares.sort((sqIdA, sqIdB) => (
      lettersToNumbers[sqIdA.charAt(0)] - lettersToNumbers[sqIdB.charAt(0)]
    ))
  }

  return sortedSquares
}

function preventDragConflicts(draggedShipNumber){
  const otherShipSegments = document.querySelectorAll(
    `.placed-ship-segment:not(.placed-ship-${draggedShipNumber}), .placed-ship-flip-button:not(.placed-ship-${draggedShipNumber})`
  )
  otherShipSegments.forEach(segment => segment.classList.add('pointer-events-none'))

  if (shipPlacementState[`ship${draggedShipNumber}`].placed){
    const shipMiddleSegments = document.querySelectorAll(`.placed-ship-segment.placed-ship-${draggedShipNumber}:not(.placed-ship-end)`)
    const shipEndContainers = document.querySelectorAll(`.placed-ship-segment.placed-ship-end.placed-ship-${draggedShipNumber}`)
    const shipFlipButton = document.querySelector(`.placed-ship-flip-button.placed-ship-${draggedShipNumber}`)
    
    setTimeout(() => {
      shipMiddleSegments.forEach(sms => {
        sms.classList.add('pointer-events-none')
      })
      shipEndContainers.forEach(sec => {
        sec.classList.add('pointer-events-none')
      })
      shipFlipButton.classList.add('pointer-events-none')
    }, 0);
  }
}
function removeDragConflictPrevention(){
  const shipSegments = document.querySelectorAll('.placed-ship-segment, .placed-ship-flip-button')
  shipSegments.forEach(segment => segment.classList.remove('pointer-events-none'))
}

function applyShipDraggingStyles(shipNumber){
  const shipMiddleSegments = document.querySelectorAll(`.placed-ship-segment.placed-ship-${shipNumber}:not(.placed-ship-end)`)
  shipMiddleSegments.forEach(sms => {
    sms.classList.remove('bg-gray-400')
    sms.classList.add('bg-gray-300')
  })
  const shipEndSegments = document.querySelectorAll(`.placed-ship-segment.placed-ship-end.placed-ship-${shipNumber} svg`)
  shipEndSegments.forEach(ses => {
    ses.classList.remove('text-gray-400')
    ses.classList.add('text-gray-300')
  })
}
function removeShipDraggingStyles(shipNumber){
  const shipMiddleSegments = document.querySelectorAll(`.placed-ship-segment.placed-ship-${shipNumber}:not(.placed-ship-end)`)
  shipMiddleSegments.forEach(sms => {
    sms.classList.remove('bg-gray-300')
    sms.classList.add('bg-gray-400')
  })
  const shipEndSegments = document.querySelectorAll(`.placed-ship-segment.placed-ship-end.placed-ship-${shipNumber} svg`)
  shipEndSegments.forEach(ses => {
    ses.classList.remove('text-gray-300')
    ses.classList.add('text-gray-400')
  })
}

function createDragImage(){
  const transparentImage = new Image()
  transparentImage.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
  return transparentImage
}

function createShipSegment(
  variant,
  type,
  shipOrientation,
  shipNumber
) {
  let shipSegment

  if (variant === 'standard'){
    if (type === 'first'){
      const svgContainer = document.createElement('div')
      svgContainer.classList.add(
        shipOrientation === 'horizontal' ? 'h-full' : 'w-full',
        shipOrientation === 'horizontal' ? 'w-[45px]' : 'h-[45px]',
        'placed-ship-segment',
        'placed-ship-end',
        `placed-ship-${shipNumber}`,
        'cursor-grab',
        'absolute',
        'flex',
        shipOrientation === 'vertical' && 'flex-col',
        'justify-end',
        'items-center',
      )

      svgContainer.setAttribute('draggable', true)
      svgContainer.addEventListener('dragstart', e => {
        e.dataTransfer.setData('text-plain', `ship${shipNumber}`)
        shipPlacementState.currentlyDragging = `ship-${shipNumber}`

        const customDragImage = createDragImage()
        e.dataTransfer.setDragImage(customDragImage, 0, 0);

        preventDragConflicts(shipNumber)
        applyShipDraggingStyles(shipNumber)
      })
      svgContainer.addEventListener('dragend', () => {
        removeDragConflictPrevention()
        removeShipDraggingStyles(shipNumber)
      })

      const shipSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      shipSvg.setAttribute('width', '34')
      shipSvg.setAttribute('height', '37')
      shipSvg.setAttribute('viewBox', '0 0 30 33')
      shipSvg.setAttribute('fill', 'none')
      shipSvg.classList.add(
        'text-gray-400',
        shipOrientation === 'horizontal' ? 'rotate-90' : 'rotate-180',
        'pointer-events-none',
      )
      const shipSvgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      shipSvgPath.setAttribute('fill', 'currentColor')
      shipSvgPath.setAttribute('d', 'M30 1.35207C30 13.6173 24.4938 25.2345 15 33V33V33C5.50619 25.2345 0 13.6173 0 1.35207V-3.57628e-07L30 -3.57628e-07V1.35207Z')
      shipSvg.append(shipSvgPath)
      shipSvg.classList.add('svg-ship-segment')

      svgContainer.append(shipSvg)

      shipSegment = svgContainer
    } else if (type === 'middle'){
      shipSegment = document.createElement('div')
      shipSegment.classList.add(
        'cursor-grab',
        'bg-gray-400',
        'placed-ship-segment',
        `placed-ship-${shipNumber}`,
        shipOrientation === 'horizontal' ? 'h-[34px]' : 'h-[46px]',
        shipOrientation === 'horizontal' ? 'w-[46px]' : 'w-[34px]',
        'absolute',
        'top-1/2',
        '-translate-y-1/2',
        'left-1/2',
        '-translate-x-1/2'
      )

      shipSegment.setAttribute('draggable', true)
      shipSegment.addEventListener('dragstart', e => {
        e.dataTransfer.setData('text-plain', `ship${shipNumber}`)
        shipPlacementState.currentlyDragging = `ship-${shipNumber}`

        const customDragImage = createDragImage()
        e.dataTransfer.setDragImage(customDragImage, 0, 0);

        preventDragConflicts(shipNumber)
        applyShipDraggingStyles(shipNumber)
      })
      shipSegment.addEventListener('dragend', () => {
        removeDragConflictPrevention()
        removeShipDraggingStyles(shipNumber)
      })
    } else if (type === 'last'){
      const svgContainer = document.createElement('div')
      svgContainer.classList.add(
        shipOrientation === 'horizontal' ? 'h-full' : 'w-full',
        shipOrientation === 'horizontal' ? 'w-[45px]' : 'h-[45px]',
        'placed-ship-segment',
        'placed-ship-end',
        `placed-ship-${shipNumber}`,
        'cursor-grab',
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

      svgContainer.setAttribute('draggable', true)
      svgContainer.addEventListener('dragstart', e => {
        e.dataTransfer.setData('text-plain', `ship${shipNumber}`)
        shipPlacementState.currentlyDragging = `ship-${shipNumber}`

        const customDragImage = createDragImage()
        e.dataTransfer.setDragImage(customDragImage, 0, 0);

        preventDragConflicts(shipNumber)
        applyShipDraggingStyles(shipNumber)
      })
      svgContainer.addEventListener('dragend', () => {
        removeDragConflictPrevention()
        removeShipDraggingStyles(shipNumber)
      })

      const shipSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      shipSvg.setAttribute('width', '34')
      shipSvg.setAttribute('height', '37')
      shipSvg.setAttribute('viewBox', '0 0 30 33')
      shipSvg.setAttribute('fill', 'none')
      shipSvg.classList.add(
        'text-gray-400',
        shipOrientation === 'horizontal' && 'rotate-[270deg]',
        'pointer-events-none',
      )
      const shipSvgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      shipSvgPath.setAttribute('fill', 'currentColor')
      shipSvgPath.setAttribute('d', 'M30 1.35207C30 13.6173 24.4938 25.2345 15 33V33V33C5.50619 25.2345 0 13.6173 0 1.35207V-3.57628e-07L30 -3.57628e-07V1.35207Z')
      shipSvg.append(shipSvgPath)
      shipSvg.classList.add('svg-ship-segment')

      svgContainer.append(shipSvg)

      shipSegment = svgContainer
    }
  } else if (variant === 'faded'){
    if (type === 'first'){
      const svgContainer = document.createElement('div')
      svgContainer.classList.add(
        shipOrientation === 'horizontal' ? 'h-full' : 'w-full',
        shipOrientation === 'horizontal' ? 'w-[45px]' : 'h-[45px]',
        'edge-hover-indicator',
        'hover-indicator',
        'pointer-events-none',
        'absolute',
        'flex',
        shipOrientation === 'vertical' && 'flex-col',
        'justify-end',
        'items-center',
        'z-20'
      )

      const fadedShipSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      fadedShipSvg.setAttribute('width', '34')
      fadedShipSvg.setAttribute('height', '37')
      fadedShipSvg.setAttribute('viewBox', '0 0 30 33')
      fadedShipSvg.setAttribute('fill', 'none')
      fadedShipSvg.classList.add(
        'text-sky-700',
        shipOrientation === 'horizontal' ? 'rotate-90' : 'rotate-180',
        'pointer-events-none',
      )
      const fadedShipSvgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      fadedShipSvgPath.setAttribute('fill', 'currentColor')
      fadedShipSvgPath.setAttribute('d', 'M30 1.35207C30 13.6173 24.4938 25.2345 15 33V33V33C5.50619 25.2345 0 13.6173 0 1.35207V-3.57628e-07L30 -3.57628e-07V1.35207Z')
      fadedShipSvg.append(fadedShipSvgPath)
      fadedShipSvg.classList.add('faded-svg-segment')

      svgContainer.append(fadedShipSvg)

      shipSegment = svgContainer
    } else if (type === 'middle'){
      const fadedShipSegment = document.createElement('div')
      fadedShipSegment.classList.add(
        'middle-hover-indicator',
        'hover-indicator',
        'pointer-events-none',
        'bg-sky-700',
        'faded-segment',
        shipOrientation === 'horizontal' ? 'h-[34px]' : 'h-[46px]',
        shipOrientation === 'horizontal' ? 'w-[46px]' : 'w-[34px]',
        'absolute',
        'top-1/2',
        '-translate-y-1/2',
        'left-1/2',
        '-translate-x-1/2',
        'z-20'
      )

      shipSegment = fadedShipSegment
    } else if (type === 'last'){
      const svgContainer = document.createElement('div')
      svgContainer.classList.add(
        shipOrientation === 'horizontal' ? 'h-full' : 'w-full',
        shipOrientation === 'horizontal' ? 'w-[45px]' : 'h-[45px]',
        'edge-hover-indicator',
        'hover-indicator',
        'pointer-events-none',
        'absolute',
        'top-1/2',
        '-translate-y-1/2',
        'left-1/2',
        '-translate-x-1/2',
        'flex',
        shipOrientation === 'vertical' && 'flex-col',
        'justify-start',
        'items-center',
        'z-20'
      )

      const fadedShipSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      fadedShipSvg.setAttribute('width', '34')
      fadedShipSvg.setAttribute('height', '37')
      fadedShipSvg.setAttribute('viewBox', '0 0 30 33')
      fadedShipSvg.setAttribute('fill', 'none')
      fadedShipSvg.classList.add(
        'text-sky-700',
        shipOrientation === 'horizontal' && 'rotate-[270deg]',
        'pointer-events-none',
      )
      const fadedShipSvgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      fadedShipSvgPath.setAttribute('fill', 'currentColor')
      fadedShipSvgPath.setAttribute('d', 'M30 1.35207C30 13.6173 24.4938 25.2345 15 33V33V33C5.50619 25.2345 0 13.6173 0 1.35207V-3.57628e-07L30 -3.57628e-07V1.35207Z')
      fadedShipSvg.append(fadedShipSvgPath)
      fadedShipSvg.classList.add('faded-svg-segment-two')

      svgContainer.append(fadedShipSvg)

      shipSegment = svgContainer
    }
  } else if (variant === 'red'){
    if (type === 'first'){
      const svgContainer = document.createElement('div')
      svgContainer.classList.add(
        shipOrientation === 'horizontal' ? 'h-full' : 'w-full',
        shipOrientation === 'horizontal' ? 'w-[45px]' : 'h-[45px]',
        'occupied-hover-indicator',
        'pointer-events-none',
        'absolute',
        'flex',
        shipOrientation === 'vertical' && 'flex-col',
        'justify-end',
        'items-center',
        'z-20'
      )

      const redShipSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      redShipSvg.setAttribute('width', '34')
      redShipSvg.setAttribute('height', '37')
      redShipSvg.setAttribute('viewBox', '0 0 30 33')
      redShipSvg.setAttribute('fill', 'none')
      redShipSvg.classList.add(
        'text-rose-700',
        shipOrientation === 'horizontal' ? 'rotate-90' : 'rotate-180',
        'pointer-events-none',
      )
      const redShipSvgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      redShipSvgPath.setAttribute('fill', 'currentColor')
      redShipSvgPath.setAttribute('d', 'M30 1.35207C30 13.6173 24.4938 25.2345 15 33V33V33C5.50619 25.2345 0 13.6173 0 1.35207V-3.57628e-07L30 -3.57628e-07V1.35207Z')
      redShipSvg.append(redShipSvgPath)
      redShipSvg.classList.add('red-svg-segment-one')

      svgContainer.append(redShipSvg)

      shipSegment = svgContainer
    } else if (type === 'middle'){
      const redShipSegment = document.createElement('div')
      redShipSegment.classList.add(
        'z-20',
        'occupied-hover-indicator',
        'pointer-events-none',
        'bg-rose-700',
        'red-segment',
        shipOrientation === 'horizontal' ? 'h-[34px]' : 'h-[46px]',
        shipOrientation === 'horizontal' ? 'w-[46px]' : 'w-[34px]',
        'absolute',
        'top-1/2',
        '-translate-y-1/2',
        'left-1/2',
        '-translate-x-1/2'
      )

      shipSegment = redShipSegment
    } else if (type === 'last'){
      const svgContainer = document.createElement('div')
      svgContainer.classList.add(
        shipOrientation === 'horizontal' ? 'h-full' : 'w-full',
        shipOrientation === 'horizontal' ? 'w-[45px]' : 'h-[45px]',
        'z-20',
        'occupied-hover-indicator',
        'pointer-events-none',
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

      const redShipSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      redShipSvg.setAttribute('width', '34')
      redShipSvg.setAttribute('height', '37')
      redShipSvg.setAttribute('viewBox', '0 0 30 33')
      redShipSvg.setAttribute('fill', 'none')
      redShipSvg.classList.add(
        'text-rose-700',
        shipOrientation === 'horizontal' && 'rotate-[270deg]',
        'pointer-events-none'
      )
      const redShipSvgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      redShipSvgPath.setAttribute('fill', 'currentColor')
      redShipSvgPath.setAttribute('d', 'M30 1.35207C30 13.6173 24.4938 25.2345 15 33V33V33C5.50619 25.2345 0 13.6173 0 1.35207V-3.57628e-07L30 -3.57628e-07V1.35207Z')
      redShipSvg.append(redShipSvgPath)
      redShipSvg.classList.add('red-svg-segment-two')

      svgContainer.append(redShipSvg)

      shipSegment = svgContainer
    }
  }

  return shipSegment
}

function createFlipButton(shipOrientation, shipNumber){
  shipNumber = Number(shipNumber)
  const shipLength = shipNumber === 1
    ? 5
    : shipNumber === 2 
    ? 4
    : shipNumber === 3 || shipNumber === 4
    ? 3
    : 2

  const flipButton = document.createElement('button')

  flipButton.setAttribute('draggable', true)
  flipButton.addEventListener('dragstart', e => {
    e.dataTransfer.setData('text-plain', `ship${shipNumber}`)
    shipPlacementState.currentlyDragging = `ship-${shipNumber}`

    preventDragConflicts(shipNumber)
    applyShipDraggingStyles(shipNumber)
  })
  flipButton.addEventListener('dragend', () => {
    removeDragConflictPrevention()
    removeShipDraggingStyles(shipNumber)
  })

  flipButton.addEventListener('click', () => { 
    flipShip(shipNumber)
  })

  flipButton.classList.add(
    'transition-colors',
    'duration-75',
    'placed-ship-flip-button',
    `placed-ship-${shipNumber}`,
    'z-10',
    'absolute',
    (shipLength % 2 !== 0 || shipOrientation === 'vertical') && 'left-1/2',
    (shipLength % 2 !== 0 || shipOrientation === 'vertical') && '-translate-x-1/2',
    shipLength % 2 === 0 && shipOrientation === 'horizontal' && '-left-1/2',
    shipLength % 2 === 0 && shipOrientation === 'horizontal' && 'translate-x-[2px]',
    shipLength % 2 === 0 && shipOrientation === 'horizontal' && 'sm:translate-x-[4px]',
    shipLength % 2 === 0 && shipOrientation === 'vertical' ? 'top-0' : 'top-1/2',
    '-translate-y-1/2',
    'cursor-pointer',
    'text-xs',
    'font-semibold',
    shipOrientation === 'horizontal' ? 'px-1' : 'p-[1px]',
    'text-black',
    'bg-amber-400',
    'hover:bg-amber-300',
    'active:bg-amber-700',
    'border',
    'border-black',
    'rounded-sm',
    'uppercase',
  )
  flipButton.textContent = 'flip'
  
  return flipButton
}

function placeShip(location, shipNumber){
  const shipLength = location.length
  const shipOrientation = Number(location[0].slice(1)) === Number(location[location.length - 1].slice(1))
    ? 'vertical'
    : 'horizontal'

  location = sortLineOfSquaresByOrientation(shipOrientation, location)
  const squares = location.map(squareId => (
    document.getElementById(`ship-placement-${squareId}`)
  ))

  squares.forEach((square, index) => {
    if (index === 0){
      const shipSegment = createShipSegment(
        'standard',
        'first',
        shipOrientation,
        shipNumber
      )
      square.append(shipSegment)
    } else if (index === squares.length - 1){
      const shipSegment = createShipSegment(
        'standard',
        'last',
        shipOrientation,
        shipNumber
      )
      square.append(shipSegment)
    } else {
      const shipSegment = createShipSegment(
        'standard',
        'middle',
        shipOrientation,
        shipNumber
      )
      square.append(shipSegment)
    }

    if (index === Math.floor(shipLength / 2)){
      const flipButton = createFlipButton(shipOrientation, shipNumber)
      square.append(flipButton)
    }
  })
}

export { mountShipPlacementPage }
