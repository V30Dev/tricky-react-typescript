import Square from "./Square";

interface props {
  winner: boolean;
  turnCount: number;
  turn: string;
  restartGame: () => void;
}

const WinnerModal = ({ winner, turnCount, turn, restartGame }: props) => {
  if (!winner && turnCount < 9) return null;

  return (
    <section className="winner">
      <div className="text">
        <h2>{turnCount === 9 ? "Tie" : `Winner: ${turn}`}</h2>

        <header className="win">{winner && <Square>{turn}</Square>}</header>

        <footer>
          <button onClick={restartGame}>Restart</button>
        </footer>
      </div>
    </section>
  );
};

export default WinnerModal;
