import React from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Game = ({ game }) => {
  return (
    <Card className="mx-1 my-3 bg-light">
      <Link to={`/game/${game.id}`} style={{ textDecoration: "none" }}>
        <Card.Img src={game.image} variant="top flush" />
        <Card.Body>
          <Col>
            <Card.Title as="h5" style={{ textAlign: "center" }}>
              <strong>{game.title}</strong>
            </Card.Title>
            <Card.Text as="div" style={{ textAlign: "center" }}>
              <Rating value={game.rating} text={`${game.numReviews} reviews`} />
            </Card.Text>
          </Col>
        </Card.Body>
      </Link>
    </Card>
  );
};

export default Game;
