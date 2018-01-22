var { Map, List } = require("immutable");

const GAME_RESET = "tictactoe/GAME_RESET";
const GAME_PLAY = "tictactoe/GAME_PLAY";

var initialState = Map({
  board: List([
    List([".", ".", "."]),
    List([".", ".", "."]),
    List([".", ".", "."])
  ]),
  phase: "playing"
});

// Reducer
const reducer = function(state = initialState, action = {}) {
  switch (action.type) {
    case GAME_PLAY:
      const { state: stateAfterPlayer, waitingForOpponent } = makePlayerMove(state, {
        x: action.x,
        y: action.y
      });
      if (!waitingForOpponent) {
        return stateAfterPlayer;
      }
      return makeAIMove(stateAfterPlayer);
    case GAME_RESET:
      return initialState;
    default:
      return state;
  }
};

const makePlayerMove = function(state, { x, y }) {
  if (isFinished(state).finished) {
    return { state, waitingForOpponent: false };
  }
  if (state.getIn(["board", y, x]) !== ".") {
    return { state, waitingForOpponent: false };
  }
  const stateAfterPlayer = state.setIn(["board", y, x], "X");
  const { finished, winner } = isFinished(stateAfterPlayer);
  if (finished) {
    return {
      state: stateAfterPlayer.set("phase", winner + " won"),
      waitingForOpponent: false
    };
  } else {
    return { state: stateAfterPlayer, waitingForOpponent: true };
  }
};

const makeAIMove = function(state) {
  const stateAfterAI = makeRandomMove(state);
  const status = isFinished(stateAfterAI);
  if (status.finished) {
    return stateAfterAI.set("phase", status.winner + " won");
  } else {
    return stateAfterAI;
  }
};

const makeRandomMove = state => {
  x = Math.floor(Math.random() * 3);
  y = Math.floor(Math.random() * 3);
  if (state.getIn(["board", y, x]) === ".") {
    return state.setIn(["board", y, x], "O");
  } else {
    return makeRandomMove(state);
  }
};

const winnerConditions = [
  [[0, 0], [0, 1], [0, 2]],
  [[1, 0], [1, 1], [1, 2]],
  [[2, 0], [2, 1], [2, 2]],
  [[0, 0], [1, 0], [2, 0]],
  [[0, 1], [1, 1], [2, 1]],
  [[0, 2], [1, 2], [2, 2]],
  [[0, 0], [1, 1], [2, 2]],
  [[2, 0], [1, 1], [0, 2]]
];

function isFinished(state) {
  var finished = false;
  var winner = null;
  let post = winnerConditions.forEach(condition => {
    tiles = condition.map(tile => state.getIn(["board", tile[0], tile[1]]));
    if (tiles[0] === tiles[1] && tiles[1] === tiles[2] && tiles[0] !== ".") {
      finished = true;
      winner = tiles[0];
    }
  });
  return { finished, winner };
}

module.exports = {
  GAME_RESET,
  GAME_PLAY,
  reducer
};
