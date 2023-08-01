import { useState } from 'react'
import './App.css'

const TURNS = { //TURNOS  
  X: 'X',
  O: 'O'
}


const Square = ({children, isSelected, updateBoard, index}) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`

  const handleClick = () => {
    updateBoard(index)
  }

  return(
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))

  const [turn, setTurn] = useState(TURNS.X)

  const [winner, setWinner] = useState(null) //null es que no hay ganador, false es que hay un empate

  const checkWinner = (boardToCheck) => {
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
    return winnerCombo ? winnerCombo[0] : null
  }


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
      setWinner(newWinner)
    }
  }

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <section className='game'>
        {
          board.map((_, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
            )
          })
        }
      </section>

      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      {
        winner !== null && (
          <section className='winner'>
            <div className='text'>
              <h2>
                {
                  winner === false
                    ? 'Empate'
                    : 'Ganó'
                }
              </h2>
              <header className='win'>
                {winner && <Square>{winner}</Square>}
              </header>

              <footer>
                <button>Empezar de nuevo</button>
              </footer>
            </div>

          </section>
        )
      }
    </main>
  )
}

export default App
