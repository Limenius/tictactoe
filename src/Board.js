import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { play } from "./reducer";

const Row = styled.div`display: flex;`;
const Grid = styled.div`
    display: flex;
    flex-direction: column;
`;
const Tile = styled.div`
    height: 50px;
    width: 50px;
`;

class Board extends React.Component {
    componentDidMount() {

    }
    render() {
        const { board, play } = this.props;
        return (
            <Grid>
                {board.map((row, idxCol) => (
                    <Row key={idxCol}>
                        {row.map((tile, idx) => (
                            <Tile onClick={() => play(idx, idxCol)} key={idx}>
                                {tile}
                            </Tile>
                        ))}
                    </Row>
                ))}
            </Grid>
        );
    }
}

const mapStateToProps = state => ({ board: state.board });
const mapDispatchToProps = dispatch => ({
    play: (x, y) => dispatch(play(x, y))
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
