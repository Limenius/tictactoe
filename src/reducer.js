const GAME_UPDATE = "tictactoe/GAME_UPDATE";

const initialState = {
    board: [[".", ".", "."], [".", ".", "."], [".", ".", "."]],
    phase: "playing"
};

// Reducer
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case GAME_UPDATE:
            return { ...state, board: action.game.board, phase: action.game.phase };

        default:
            return state;
    }
}

export function updateGame(game) {
    return { type: GAME_UPDATE, game };
}
