interface props {
  children: React.ReactNode;
  updateBoard?: (clickIndex: number) => void;
  isSelected?: boolean;
  index?: number;
}

const Square = ({ children, isSelected, updateBoard, index }: props) => {
  const className = `square ${isSelected ? "is-selected" : ""}`;

  const handleClick = () => {
    if (updateBoard && index !== undefined) {
      updateBoard(index);
    }
  };

  return (
    <div className={className} onClick={handleClick}>
      {children}
    </div>
  );
};

export default Square;
