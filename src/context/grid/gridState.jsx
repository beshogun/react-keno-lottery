import React, { useReducer } from "react";
import GridContext from "./gridContext";
import GridReducer from "./gridReducer";
import GridData from "../../grid-data";

import {
  SET_GAME,
  SET_GRID_DATA,
  RESET_GRID_DATA,
  CLEAR_BET,
  SET_BET,
  SET_CARD,
  SET_CARD_SELECTION,
  SET_TOP_FIVE,
} from "../types";

const GridState = (props) => {
  const initialState = {
    grid: GridData,
    selection: [],
    totalGamesWon: 0,
    totalMoneyWon: 0,
    bet: 0,
    topFive: [],
    gameResults: {
      bet: 0,
      numbersMatched: 0,
      message: "",
      gameWinnings: 0,
      win: false,
    },
  };
  const [state, dispatch] = useReducer(GridReducer, initialState);

  const setBet = (value) => {
    console.log("in set bet");

    console.log(value);
    dispatch({
      type: SET_BET,
      payload: value,
    });
  };

  const setCard = (value) => {
    console.log("in set card");

    console.log(value);
    dispatch({
      type: SET_CARD,
      payload: value,
    });
  };
  const setGameResults = (value) => {
    console.log("in set game res");

    console.log(value);
    dispatch({
      type: SET_GAME,
      payload: value,
    });
  };

  const setGridData = (value) => {
    console.log("in grid data set");

    console.log(value);
    dispatch({
      type: SET_GRID_DATA,
      payload: value,
    });
  };
  const setTopFive = (value) => {
    console.log("in set top five");
    dispatch({
      type: SET_CARD,
      payload: value,
    });
  };

  const resetGridData = () => {
    console.log("in reset grid data set");
    dispatch({
      type: RESET_GRID_DATA,
    });
  };

  const setCardSelection = () => {
    console.log("in set card selection");
    dispatch({
      type: SET_CARD_SELECTION,
    });
  };

  const clearBet = () => {
    console.log("in clear bet");
    dispatch({
      type: CLEAR_BET,
    });
  };

  return (
    <GridContext.Provider
      value={{
        grid: state.grid,
        selection: state.selection,
        totalGamesWon: state.totalGamesWon,
        totalMoneyWon: state.totalMoneyWon,
        bet: state.bet,
        topFive: state.topFive,
        gameResults: state.gameResults,
        setGridData,
        setCard,
        setCardSelection,
        setBet,
        resetGridData,
        clearBet,
        setGameResults,
        setTopFive,
      }}
    >
      {props.children}
    </GridContext.Provider>
  );
};

export default GridState;
