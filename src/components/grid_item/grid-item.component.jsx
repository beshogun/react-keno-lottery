import React, { useContext } from "react";
import GridContext from "../../context/grid/gridContext";
import "./grid-item.styles.scss";

const GridItem = ({ kenoCard }) => {
  const gridContext = useContext(GridContext);
  const { setCard, setCardSelection, selection } = gridContext;
  const { color, number } = kenoCard;

  const kenoGridStyle = {
    backgroundColor: kenoCard.selected ? "rgba(0, 0, 0, 0.35)" : color,
    display: "grid",
    alignItems: "center",
    fontWeight: "bold",
    fontSize: "1.5rem",
    borderRadius: ".1rem",
    padding: "1px",
    border: "1px solid #021a40",
    color: "white",
  };

  const onCardClick = () => {
    if (selection.length < 5 || kenoCard.selected === true) {
      setCard({ ...kenoCard, selected: !kenoCard.selected });
      setCardSelection();
    }
  };
  return (
    <div className="grid_item_container">
      <button style={kenoGridStyle} onClick={onCardClick} className="button">
        <div className="number">{number}</div>
      </button>
    </div>
  );
};

export default GridItem;
