import React, { Component } from "react";

import { createStore } from "redux";
import tictactoe from "./reducer";
import { Provider } from "react-redux";
import Board from './Board'

let store = createStore(tictactoe);


class App extends Component {
    render() {
        return (
            <Provider store={store}>
              <Board/>
            </Provider>
        );
    }
}

export default App;
