import React from "react";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    height: 100vh;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    @media screen and (min-width: 720px) {
        width: 500px;
        height: 600px;
        margin: 5em auto;
    }
    background-color: #5f72b2;
    border: 5px solid #60366f;
`;
const Button = styled.button`
    font-size: 36px;
    background-color: #6fa3a9;
    border: none;
    color: white;
    padding: 0.5em;
    cursor: pointer;
`;

const Grid = styled.div`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    align-items: stretch;
    padding: 1em;
`;

const borderRow = ({ idx }) => {
    if (idx === 0) {
        return "border-bottom: 5px solid white;";
    }
    if (idx === 2) {
        return "border-top: 5px solid white;";
    }
};

const borderTile = ({ idx }) => {
    if (idx === 0) {
        return "border-right: 5px solid white;";
    }
    if (idx === 2) {
        return "border-left: 5px solid white;";
    }
};

const Row = styled.div`
    display: flex;
    flex-grow: 1;
    justify-content: space-around;
    align-items: stretch;
    ${borderRow};
`;

const TileContainer = styled.div`
    flex: 1 1 0;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    ${borderTile};
`;

const Cross = () => (
    <svg
        width="100%"
        height="100%"
        viewBox="0 0 50 50"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
    >
        <line
            x1="5"
            y1="5"
            x2="45"
            y2="45"
            strokeWidth="4"
            strokeLinecap="round"
            stroke="white"
        />
        <line
            x1="5"
            y1="45"
            x2="45"
            y2="5"
            strokeWidth="4"
            strokeLinecap="round"
            stroke="white"
        />
    </svg>
);

const Empty = () => (
    <svg
        width="100%"
        height="100%"
        viewBox="0 0 50 50"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
    />
);

const Circle = () => (
    <svg
        width="100%"
        height="100%"
        viewBox="0 0 50 50"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
    >
        <circle
            cx="25"
            cy="25"
            r="20"
            stroke="white"
            strokeWidth="4"
            fill="none"
        />
    </svg>
);

const Tile = ({ tile, ...props }) => {
    switch (tile) {
        case "O":
            return (
                <TileContainer {...props}>
                    <Circle />
                </TileContainer>
            );
        case "X":
            return (
                <TileContainer {...props}>
                    <Cross />
                </TileContainer>
            );
        default:
            return (
                <TileContainer {...props}>
                    <Empty />
                </TileContainer>
            );
    }
};

const Status = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    background-color: #60366f;
    padding: 0.5em;
    min-height: 80px;
`;

const StatusText = styled.div`
    color: white;
    text-align: center;
    padding: 0.5em;
    font-size: 36px;
    flex: 1;
`;

export { Container, Button, Grid, Row, Tile, Status, StatusText };
