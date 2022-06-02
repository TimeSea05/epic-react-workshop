import * as React from 'react'
import { useLocalStorageState } from '../utils'
import _ from 'lodash'

function Board({ onClick, squares }) {
  function renderSquare(i) {
    return (
      <button className="square" onClick={() => onClick(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

function Game() {
  const [history, setHistory] = useLocalStorageState('history', [Array(9).fill(null)])
  const [currentStep, setCurrentStep] = useLocalStorageState('currentStep', Array(9).fill(null))

  const nextValue = calculateNextValue(currentStep)
  const winner = calculateWinner(currentStep)
  const status = calculateStatus(winner, currentStep, nextValue)
  const moves = calcualteMoves()

  function selectSquare(i) {
    if (winner || currentStep[i]) return

    const squaresCopy = [...currentStep]
    squaresCopy[i] = nextValue

    const historyCopy = [...history]
    while (!_.isEqual(currentStep, historyCopy[historyCopy.length - 1])) {
      historyCopy.pop()
    }
    historyCopy.push(squaresCopy)
    setHistory(historyCopy)
    setCurrentStep(squaresCopy)
  }

  function restart() {
    setCurrentStep(Array(9).fill(null))
    setHistory([Array(9).fill(null)])
  }

  function calcualteMoves() {
    function renderHistoryStep(i) {
      let message = i === 0 ? 'Go to game start': `Go to move #${i}`
      let disabled = _.isEqual(history[i], currentStep)
  
      if (_.isEqual(history[i], currentStep)) {
        message += '(current)'
      }

      function goToStep(i) {
        setCurrentStep(history[i])
      }
      return (
        <li key={message}><button disabled={disabled} onClick={() => goToStep(i)}>
          {message}
        </button></li>
      )
    }

    const moves = []
    for (let i = 0; i < history.length; i++) {
      moves.push(renderHistoryStep(i))
    }

    return moves
  }

  
  return (
    <div className="game">
      <div className="game-board">
        <Board onClick={selectSquare} squares={currentStep} />
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
  ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App