export const TURNS = { //TURNOS  
    X: '×',
    O: '○'
  }

export const checkWinner = (boardToCheck) => {
    const boardCombinations = [
      [boardToCheck[0], boardToCheck[1], boardToCheck[2]],
      [boardToCheck[3], boardToCheck[4], boardToCheck[5]],
      [boardToCheck[6], boardToCheck[7], boardToCheck[8]],
      [boardToCheck[0], boardToCheck[3], boardToCheck[6]],
      [boardToCheck[1], boardToCheck[4], boardToCheck[7]],
      [boardToCheck[2], boardToCheck[5], boardToCheck[8]],
      [boardToCheck[0], boardToCheck[4], boardToCheck[8]],
      [boardToCheck[2], boardToCheck[4], boardToCheck[6]]
    ]

    const winnerCombo = boardCombinations.find(([a,b,c]) =>  a && a ===b && a === c)
    return winnerCombo ? winnerCombo[0] : false
}

export const checkEndGame = (boardToCheck) =>{
    return boardToCheck.every(square => square !== null)
}