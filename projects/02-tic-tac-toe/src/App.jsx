import { useState, useEffect } from 'react'
import confetti from 'canvas-confetti'

import { checkWinner, checkEndGame, saveGameFromStorage, resetGameFromStorage } from './logic/board'
import { WinnerModal } from './components/WinnerModal'
import { Board } from './components/Board'
import { TurnsTable } from './components/TurnsTable'

const TURNS = { //TURNOS  
  X: '×',
  O: '○'
}

function App() {
  const [board, setBoard] = useState(() => {

    const boardFromStorage = window.localStorage.getItem('board')

    return boardFromStorage
      ? JSON.parse(boardFromStorage) 
      : Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {

    const turnFromStorage = window.localStorage.getItem('turn')

    return turnFromStorage ?? TURNS.X
  })

  const [winner, setWinner] = useState(null) //null es que no hay ganador, false es que hay un empate

  const updateBoard = (index) => {
    // No actualizamos la posición si ya está ocupada (toma en cuenta que por defecto
    //  es null, entonces al serlo la condicional será falsa por defecto)
    if(board[index] || winner) return

    // Se crea una copia del tablero para actualizarlo
    // sin mutar el estado del tablero original. Los estados solo deben
    //  ser mutados utilizando la funcion asignada al ser creado (en este caso, setBoard())
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    
    // Cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    // Revisar si hay nuevo ganador
    const newWinner = checkWinner(newBoard)
    if(newWinner) {
      confetti()
      setWinner(newWinner)
    } else if(checkEndGame(newBoard)){
      setWinner(false)
    }
  }
  
  //Guardar partida
  useEffect(() => {
    saveGameFromStorage({
      board: board,
      turn: turn
    })
  }, [board, turn])

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    resetGameFromStorage()
  }

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>

      <button onClick={resetGame}>Reiniciar juego</button>

      <section className='game'>
        <Board board={board} updateBoard={updateBoard} />
      </section>

      <TurnsTable actualTurn={turn} turns={TURNS}/>

      <WinnerModal resetGame={resetGame} winner={winner}/>
    </main>
  )
}

export default App
