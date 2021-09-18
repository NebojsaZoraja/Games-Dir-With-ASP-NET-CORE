import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteGame, createGame, listGamesAdmin } from "../actions/gameActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import {
  GAME_CREATE_RESET,
  GAME_GENRE_RESET,
} from "../constatns/gameConstatns";
import Paginate from "../components/Paginate";
import Meta from "../components/Meta";

const GameListScreen = ({ history, match }) => {
  const dispatch = useDispatch();
  const pageNumber = match.params.pageNumber || 1;

  const gameListAdmin = useSelector((state) => state.gameListAdmin);
  const { loading, error, games, page, pages } = gameListAdmin;

  const gameDelete = useSelector((state) => state.gameDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = gameDelete;

  const gameCreate = useSelector((state) => state.gameCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    game: createdGame,
  } = gameCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: GAME_CREATE_RESET });
    dispatch({ type: GAME_GENRE_RESET });
    if (!userInfo.isAdmin) {
      history.push("/login");
    }
    if (successCreate) {
      history.push(`/admin/game/${createdGame.id}/edit`);
    } else {
      dispatch(listGamesAdmin(Number(pageNumber)));
    }
  }, [
    dispatch,
    userInfo,
    history,
    successDelete,
    successCreate,
    createdGame,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteGame(id));
    }
  };

  const createGameHandler = () => {
    dispatch(createGame());
  };

  return (
    <>
      <Meta title="Admin | Game List" />
      <Row
        className="my-3"
        style={{ borderBottom: "solid", borderWidth: "0.5px" }}
      >
        <Col className="text-center">
          <h1>Games</h1>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row className="justify-content-center">
          <Col lg={11} md={15} xs={15}>
            <Card className="p-1" style={{ backgroundColor: "darkblue" }}>
              <Table striped borderless hover responsive className="table-md">
                <thead>
                  <tr>
                    <th>TITLE</th>
                    <th>GENRE</th>
                    <th>PRICE</th>
                    <th>STOCK</th>
                    <th>
                      <Button
                        variant="warning"
                        className="btn-sm"
                        onClick={createGameHandler}
                      >
                        <i className="fas fa-plus"></i>&nbsp; Add Game
                      </Button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {games.map((game) => (
                    <tr key={game.id}>
                      <td>{game.title}</td>
                      <td>{game.genreName}</td>
                      <td>${game.price}</td>
                      <td>{game.numberInStock}</td>
                      <td>
                        <LinkContainer
                          to={`/admin/game/${game.id}/edit`}
                          className="mx-1"
                        >
                          <Button variant="dark" className="btn-sm">
                            <i className="fas fa-edit"></i>
                          </Button>
                        </LinkContainer>
                        <Button
                          variant="danger"
                          className="btn-sm"
                          onClick={() => deleteHandler(game.id)}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Paginate pages={pages} page={page} games={true} />
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default GameListScreen;
