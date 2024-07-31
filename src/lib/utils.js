export const numbersToLetters = {
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
export const lettersToNumbers = {
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

export function clearPage(){
  const bottomBar = document.getElementById('bottom-bar')
  if (bottomBar){
    bottomBar.remove()
  }

  const mainArea = document.getElementById('main-area')

  mainArea.classList.remove('lg:h-[582px]')
  mainArea.classList.add('lg:h-[634px]')

  while (mainArea.firstChild){
    mainArea.removeChild(mainArea.firstChild)
  }
}

export function getRandomCoordinates(){
  const yLetter = numbersToLetters[Math.floor(Math.random() * 10) + 1]
  const xNumber = Math.floor(Math.random() * 10) + 1
  return yLetter + xNumber
}
