var app = require("express")();
var server = require("http").Server(app);
var io = require("socket.io")(server);
var { createStore } = require("redux");
var a = require("./reducer");
var { reducer, GAME_PLAY, GAME_RESET} = require("./reducer");

server.listen(3080);

app.get("/", function(req, res) {
  res.sendfile(__dirname + "/index.html");
});

let store = createStore(reducer);

function observeStore(store, select, onChange) {
  let currentState;

  function handleChange() {
    let nextState = select(store.getState());
    if (nextState !== currentState) {
      currentState = nextState;
      onChange(currentState);
    }
  }

  let unsubscribe = store.subscribe(handleChange);
  handleChange();
  return unsubscribe;
}

io.on("connection", function(socket) {
  observeStore(
    store,
    state => state,
    state => {
      socket.emit("game:update", state)
    }
  );
  socket.on("game:play", function(data) {
    store.dispatch({ type: GAME_PLAY, x: data.x, y: data.y });
  });
  socket.on("game:reset", function(data) {
    store.dispatch({ type: GAME_RESET });
  });
});
