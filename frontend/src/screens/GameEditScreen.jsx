import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Container, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  getGameGenres,
  listGameDetailsAdmin,
  updateGame,
} from "../actions/gameActions";
import {
  GAME_GENRE_RESET,
  GAME_UPDATE_RESET,
} from "../constatns/gameConstatns";
import axios from "axios";
import Meta from "../components/Meta";

const GameEditScreen = ({ match, history }) => {
  const gameId = match.params.id;

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [genre, setGenre] = useState(0);
  const [publisher, setPublisher] = useState("");
  const [numberInStock, setNumberInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [minRequirements, setMinRequirements] = useState("");
  const [recRequirements, setRecRequirements] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const gameDetailsAdmin = useSelector((state) => state.gameDetailsAdmin);
  const { loading, error, game } = gameDetailsAdmin;

  const gameUpdate = useSelector((state) => state.gameUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = gameUpdate;

  const { genre: gameGenre } = game;
  const gameGenres = useSelector((state) => state.gameGenres);
  const { genres } = gameGenres;
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: GAME_UPDATE_RESET });
      dispatch({ type: GAME_GENRE_RESET });
      history.push("/admin/gamelist");
    } else {
      if (!game.title || genres.length === 0) {
        dispatch(listGameDetailsAdmin(gameId));
        dispatch(getGameGenres());
      } else if (genres.length !== 0) {
        setTitle(game.title);
        setPrice(game.price);
        setGenre(gameGenre.id);
        setImage(game.image);
        setPublisher(game.publisher);
        setNumberInStock(game.numberInStock);
        setDescription(game.description);
        setMinRequirements(game.minRequirements);
        setRecRequirements(game.recRequirements);
        console.log("help");
      }
    }
  }, [
    dispatch,
    history,
    successUpdate,
    game.id,
    gameId,
    game.title,
    game.price,
    game.image,
    game.publisher,
    game.numberInStock,
    game.description,
    game.minRequirements,
    game.recRequirements,
    genres.length,
  ]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/uploads", formData, config);
      setImage(`/Uploads/${data}`);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateGame(
        {
          genreId: genre || game.genre.id,
          title,
          price,
          publisher,
          image,
          numberInStock,
          description,
          minRequirements,
          recRequirements,
        },
        gameId
      )
    );
  };

  return (
    <>
      <Meta title="Admin | Edit Game" />
      <Link to="/admin/gamelist" className="btn btn-dark my-3">
        Go Back
      </Link>
      <Container>
        <Row className="justify-content-center my-lg-3 my-md-3 my-4">
          <Col lg={8} md={6}>
            <Card className="p-2" bg="dark">
              <h1 style={{ textAlign: "center" }}>Edit Game</h1>
              {loadingUpdate && <Loader />}
              {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
              {loading ? (
                <Loader />
              ) : error ? (
                <Message variant="danger">{error}</Message>
              ) : (
                <Form onSubmit={submitHandler}>
                  <Row className="justify-content-center">
                    <Col className="text-right" lg={5}>
                      <Form.Group controlId="title" className="my-1">
                        <Form.Label>Title:</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Title..."
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group controlId="publisher" className="my-1">
                        <Form.Label>Publisher:</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Publisher..."
                          value={publisher}
                          onChange={(e) => setPublisher(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group controlId="genre" className="my-2">
                        <Form.Label>Genre:</Form.Label>
                        <Form.Select onChange={(e) => setGenre(e.target.value)}>
                          <option value={gameGenre.id}>Original genre</option>
                          {genres.map((g) => (
                            <option key={g.id} value={g.id}>
                              {g.name}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col className="text-center mx-2" lg={5}>
                      <Form.Group controlId="price" className="my-1">
                        <Form.Label>Price:</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Price..."
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group controlId="numberInStock" className="my-1">
                        <Form.Label>Stock:</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Stock..."
                          value={numberInStock}
                          onChange={(e) => setNumberInStock(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group controlId="image" className="my-1">
                        <Form.Label>Image:</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Image..."
                          value={image}
                          onChange={(e) => setImage(e.target.value)}
                        ></Form.Control>
                        <Form.Control
                          type="file"
                          label="Choose File"
                          custom="true"
                          size="sm"
                          onChange={uploadFileHandler}
                        ></Form.Control>
                        {uploading && <Loader />}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="justify-content-center">
                    <Col className="text-center" lg={10}>
                      <Form.Group controlId="description" className="my-1">
                        <Form.Label>Description:</Form.Label>
                        <Form.Control
                          style={{ height: "15rem" }}
                          as="textarea"
                          type="text"
                          placeholder="Description..."
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group controlId="minRequiremens" className="my-1">
                        <Form.Label>
                          Minimum Requirements: (Use "_" betwen component
                          requirements)
                        </Form.Label>
                        <Form.Control
                          style={{ height: "10rem" }}
                          as="textarea"
                          type="text"
                          placeholder="Minimum Requirements..."
                          value={minRequirements}
                          onChange={(e) => setMinRequirements(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group controlId="recRequiremens" className="my-1">
                        <Form.Label>
                          Recommended Requirements: (Use "_" betwen component
                          requirements)
                        </Form.Label>
                        <Form.Control
                          style={{ height: "10rem" }}
                          as="textarea"
                          type="text"
                          placeholder="Recommended Requirements..."
                          value={recRequirements}
                          onChange={(e) => setRecRequirements(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group style={{ textAlign: "center" }}>
                        <Button
                          type="submit"
                          variant="primary"
                          className="my-2"
                        >
                          Submit
                        </Button>
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default GameEditScreen;
