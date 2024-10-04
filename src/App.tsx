import { useState } from "react";
import Square from "./Square";
import { TURNS, WINNER_COMBOS } from "./constants.js";
import WinnerModal from "./WinnerModal.js";

const App = () => {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board");
    return boardFromStorage
      ? JSON.parse(boardFromStorage)
      : Array(9).fill(null);
  });
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn");
    return turnFromStorage ? turnFromStorage : TURNS.X;
  });
  const [winner, setWinner] = useState(false);
  const [turnCount, setTurnCount] = useState(0);

  const checkWinner = (boardToCheck: number[]) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo;
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        setWinner(true);
        return boardToCheck[a];
      }
    }
    return null;
  };

  const handleBoard = (index: number) => {
    if (board[index] || winner) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    window.localStorage.setItem("board", JSON.stringify(newBoard));

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      return newWinner;
    }

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    window.localStorage.setItem("turn", newTurn);
    setTurn(newTurn);

    const newTurnCount = turnCount + 1;
    setTurnCount(newTurnCount);
  };

  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(false);
    setTurnCount(0);

    window.localStorage.removeItem("board");
    window.localStorage.removeItem("turn");
  };

  return (
    <main className="board">
      <h1>Tricky</h1>
      <button onClick={restartGame}>Restart</button>
      <section className="game">
        {board.map((_: string, index: number) => {
          return (
            <Square key={index} index={index} updateBoard={handleBoard}>
              {board[index]}
            </Square>
          );
        })}
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      <WinnerModal
        winner={winner}
        turnCount={turnCount}
        turn={turn}
        restartGame={restartGame}
      />
    </main>
  );
};

export default App;
