import {
  SET_CARD,
  RESET_GRID_DATA,
  SET_BET,
  SET_CARD_SELECTION,
  SET_GRID_DATA,
  CLEAR_BET,
  SET_GAME,
  SET_TOP_FIVE,
} from "../types";

export default (state, action) => {
  // console.log(state);
  // console.log("in set reducer");
  // console.log(action.payload);

  switch (action.type) {
    case SET_GRID_DATA:
      return {
        ...state,
        grid: state.grid.map((item) => item),
      };
    case SET_BET:
      return {
        ...state,
        bet: action.payload,
      };
    case SET_CARD:
      return {
        ...state,
        grid: state.grid.map((item) =>
          item.number === action.payload.number ? action.payload : item
        ),
      };
    case SET_CARD_SELECTION:
      return {
        ...state,
        selection: state.grid.filter((item) => item.selected === true),
      };
    case RESET_GRID_DATA:
      return {
        ...state,
        grid: state.grid.map((item) =>
          item.selected === true ? (item.selected = !item.selected) : item
        ),
        selection: [],
      };
      case CLEAR_BET:
        return {
          ...state,
          bet: 0
        };
        case SET_GAME:
        return {
          ...state,
          gameResults: action.payload
        };
    default:
      return state;
  }
};
