import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { updateGame } from "./reducer";
import { Socket } from "./phoenix";

const Row = styled.div`display: flex;`;

const Container = styled.div`margin: 0 auto;`;
const Button = styled.button``;

const Grid = styled.div`
    display: flex;
    flex-direction: column;
`;
const Tile = styled.div`
    height: 50px;
    width: 50px;
    cursor: pointer;
`;

const Status = styled.div``;

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.channel = null;
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
                    {board.map((row, idxCol) => (
                        <Row key={idxCol}>
                            {row.map((tile, idx) => (
                                <Tile
                                    onClick={() => this.play(idx, idxCol)}
                                    key={idx}
                                >
                                    {tile}
                                </Tile>
                            ))}
                        </Row>
                    ))}
                </Grid>
                {phase !== "playing" && (
                    <Status>
                        {phase}
                        <Button onClick={this.reset.bind(this)}>
                            Play Again
                        </Button>
                    </Status>
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
