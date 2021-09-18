import React, { useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listGames } from "../actions/gameActions";
import Game from "../components/Game";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Meta from "../components/Meta";

const GameSearch = ({ match, history }) => {
  const keyword = match.params.keyword;
  const dispatch = useDispatch();

  const gameList = useSelector((state) => state.gameList);
  const { loading, error, games } = gameList;

  useEffect(() => {
    dispatch(listGames(keyword));
  }, [dispatch, keyword]);
  return (
    <div>
      <Meta title="Games-Dir | Search" />
      <Button
        className="btn btn-light my-3"
        onClick={() => history.goBack()}
        style={{
          textDecoration: "none",
        }}
      >
        Go back
      </Button>
      <h3 className="text-center">Your Search Results:</h3>
      {loading && <Loader />}
      {error ? (
        <Message variant="danger">{error.message}</Message>
      ) : (
        <>
          <Row>
            {games.map((game) => (
              <Col lg={3}>
                <Game game={game} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </div>
  );
};

export default GameSearch;
