const PLAY = "tictactoe/PLAY";

const initialState = {
    board: [[".", ".", "."], [".", ".", "."], [".", ".", "."]]
};

// Reducer
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case PLAY:
            return {...state, board: action.board}

        default:
            return state;

    }
}

export function play() {
    return { type: PLAY };
}

//export function getWidget() {
//    return dispatch =>
//        get("/widget").then(widget => dispatch(setWidget(widget)));
//}
