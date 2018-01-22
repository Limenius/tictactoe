import React from "react";
import { connect } from "react-redux";
import { updateGame } from "./reducer";
import { Socket } from "./phoenix";

import {
  Container,
  Button,
  Grid,
  Row,
  Tile,
  Status,
  StatusText
} from "./Components";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.channel = null;
    this.socket = null;
    this.play = this.play.bind(this);
    this.reset = this.reset.bind(this);
    this.play = this.play.bind(this);
  }
  componentDidMount() {
    const { updateGame } = this.props;
    let socket = new Socket("ws://localhost:4000/socket", {});
    socket.connect();

    let channel = socket.channel("game", {});
    channel
      .join()
      .receive("ok", payload => updateGame(payload))
      .receive("error", resp => console.log("Unable to join", resp));
    channel.on("game_update", payload => updateGame(payload));
    this.channel = channel;
  }

  play(x, y) {
    this.channel.push("game:play", { x, y });
  }

  reset() {
    this.channel.push("game:reset");
  }

  render() {
    const { board, phase } = this.props;
    return (
      <Container>
        <Grid>
          {board.map((row, idxRow) => (
            <Row idx={idxRow} key={idxRow}>
              {row.map((tile, idx) => (
                <Tile
                  onClick={() => this.play(idx, idxRow)}
                  key={idx}
                  idx={idx}
                  tile={tile}
                />
              ))}
            </Row>
          ))}
        </Grid>

        {phase !== "playing" ? (
          <Status>
            <StatusText>{phase}</StatusText>
            <Button onClick={this.reset}>Play Again</Button>
          </Status>
        ) : (
          <Status />
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => ({ board: state.board, phase: state.phase });

const mapDispatchToProps = dispatch => ({
  updateGame: game => dispatch(updateGame(game))
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
