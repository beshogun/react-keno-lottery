import React, { useContext, useEffect } from "react";
import GridItem from "../grid_item/grid-item.component";
import GridContext from "../../context/grid/gridContext";

import "./kenogrid.styles.scss";

const KenoGrid = () => {
  const gridContext = useContext(GridContext);
  const {
    grid,
    bet,
    setBet,
    setCard,
    setCardSelection,
    selection,
    resetGridData,
    clearBet,
    gameResults,
    setGameResults,
    setTopFive,
  } = gridContext;
  let game = {};
  useEffect(() => {
    // eslint-disable-next-line
  }, [grid, bet, setBet, game, selection]);

  const onChange = (e) => {
    e.preventDefault();
    const reg = /^[0-9\b]+$/;

    if (e.target.value === "" || reg.test(e.target.value)) {
      setBet(e.target.value);
    }
  };

  const onBetClick = (value) => {
    if (bet === "0") {
      setBet(value);
    } else {
      setBet(bet + value);
    }
  };

  const compareNumbers = (drawn, selected) => {
    const matching = [];
    drawn.forEach((item) =>
      selected.forEach((item2) => {
        if (item === item2) {
          matching.push(item);
          console.log("match" + item);
        }
      })
    );
    return matching;
  };

  const getTwentyNumbers = () => {
    let twentyNumbers = [];
    for (let i = 0; i < 20; i++) {
      let num = Math.round(Math.random() * 80);
      twentyNumbers.push(num);
    }
    return twentyNumbers;
  };
  const getRandomNumbers = () => {
    for (let i = 0; i < 5; i++) {
      let num = Math.round(Math.random() * 80);
      if (num === 0) {
        num = Math.round(Math.random() * 80);
      }
      if (selection.length > 0) {
        console.log("value too big reset");
        resetGridData();
        setBet(0);
      } else {
        console.log("value good add to state");
        console.log(selection);
        setCard({ ...grid[num], selected: !grid[num].selected });
        setCardSelection();
      }
    }
  };
  const getTopFive = (yourNum) => {
    for (let i = 0; i <= yourNum.length; i++) {
      grid.map((item) =>
        item.number === yourNum[i]
          ? setCard({ ...item, usage: item.usage + 1 })
          : ""
      );
      console.log(grid);
    }
  };

  const onPlaceBet = () => {
    if (bet > 0 && selection.length >= 5) {
      const twentyNumbers = getTwentyNumbers();
      const yourNum = selection.map((item) => item.number);
      const winningNumber = compareNumbers(twentyNumbers, yourNum);

      if (winningNumber.length === 4) {
        game = {
          bet: bet,
          numbersMatched: 5,
          message:
            "Woohoo you matched all 5 numbers you win " + 2 * bet + "!!!",
          gameWinnings: 2 * bet,
          win: true,
        };
      } else if (winningNumber.length === 3) {
        game = {
          bet: bet,
          numbersMatched: 4,
          message:
            "Amazing you matched 4 numbers you win " + 1.75 * bet + "!!!",
          gameWinnings: 1.75 * bet,
          win: true,
        };
      } else if (winningNumber.length === 2) {
        game = {
          bet: bet,
          numbersMatched: 3,
          message: "Great you matched 3 numbers you win " + 1.5 * bet + "!!!",
          gameWinnings: 1.5 * bet,
          win: true,
        };
      } else {
        game = {
          bet: bet,
          numbersMatched: 0,
          message:
            "Better luck next time, you didn't match three or more numbers",
          gameWinnings: 0,
          win: false,
        };
      }
      setGameResults(game);
      getTopFive(yourNum);
      resetGridData();
      clearBet();
    } else {
      console.log("Please select 5 numbers and Place a bet greater than 0");
    }
  };

  return (
    <div className="grid_container" id="#grid-container">
      <div className="title__box">Keno</div>
      <hr className="hr" />

      <div className="grid_item__box">
        {grid.length ? (
          grid.map((kenoItem, index) => (
            <GridItem key={index} kenoCard={kenoItem} />
          ))
        ) : (
          <span className="empty-message">Your cart is empty</span>
        )}
      </div>
      <div className="grid__footer">
        <div className="bet__box">
          <button onClick={() => onBetClick(50)} className="button_bet">
            #50
          </button>
          <button onClick={() => onBetClick(100)} className="button_bet">
            #100
          </button>
          <button onClick={() => onBetClick(200)} className="button_bet">
            #200
          </button>
          <button onClick={() => onBetClick(500)} className="button_bet">
            #500
          </button>
          <button onClick={() => onBetClick(1000)} className="button_bet">
            #1000
          </button>
          <input
            onChange={onChange}
            value={bet}
            name="bet"
            className="text"
            size="10"
          ></input>
        </div>
        <div className="place_bet_button">
          <a onClick={onPlaceBet} href="#popup" className="button_place_bet">
            Place Bet
          </a>
          <div className="random_bet_button">
            <button onClick={getRandomNumbers} className="button_random_bet">
              Select Random Numbers
            </button>
          </div>
        </div>
      </div>
      <div className="popup" id="popup">
        <div className="popup__content">
          <div className="popup__content__game__text">
            <span className="popup__content__title">Keno Game Results</span>
            <span className="popup__content__details">
              {`Amount Bet: ${gameResults.bet}`}
            </span>
            <span className="popup__content__details">
              {`Game Winnings: ${gameResults.gameWinnings}`}
            </span>
            <span className="popup__content__details">
              {`Message: ${gameResults.message}`}
            </span>
          </div>
          <a href="#grid-container" className="popup__close">
            Close
          </a>
        </div>
      </div>
    </div>
  );
};

export default KenoGrid;
