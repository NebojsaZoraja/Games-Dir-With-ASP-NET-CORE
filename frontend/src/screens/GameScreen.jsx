import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { listGameDetails, createGameReview } from "../actions/gameActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { GAME_CREATE_REVIEW_RESET } from "../constatns/gameConstatns";
import Meta from "../components/Meta";

const GameScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [minReq, setMinReq] = useState([]);
  const [recReq, setRecReq] = useState([]);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const gameReviewCreate = useSelector((state) => state.gameReviewCreate);
  const { success: successGameReview, error: errorGameReview } =
    gameReviewCreate;

  const gameDetails = useSelector((state) => state.gameDetails);
  const { loading, error, game } = gameDetails;
  useEffect(() => {
    if (successGameReview) {
      alert("Review Submitted!");
      setRating(0);
      setComment("");
      dispatch({ type: GAME_CREATE_REVIEW_RESET });
    }
    if (!loading && !error) {
      setMinReq(game.minRequirements.toString().split("_"));
      setRecReq(game.recRequirements.toString().split("_"));
    }
    dispatch(listGameDetails(match.params.id));
  }, [dispatch, match, successGameReview, loading, error]);

  const buyNowHandler = () => {
    if (userInfo) {
      history.push(`/overview/${match.params.id}`);
    } else {
      history.push(`/login?redirect=overview/${game.id}`);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createGameReview(match.params.id, { rating, comment }));
  };

  return (
    <>
      <Button
        className="btn btn-light my-3"
        onClick={() => history.goBack()}
        style={{
          textDecoration: "none",
        }}
      >
        Go back
      </Button>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Meta title={game.title} />
          <Row className="justify-content-center my-2">
            <Col md={8} lg={7} xs={12}>
              <Image
                src={game.image}
                alt={game.title}
                style={{ height: "100%", width: "100%" }}
                fluid
              />
            </Col>
            <Col md={4} sm={4} lg={3} xs={12} className="mt-2 mt-lg-4 mt-md-0">
              <Card bg="light">
                <ListGroup style={{ width: "100%" }}>
                  <ListGroup.Item
                    style={{ borderBottom: "solid", borderWidth: "0.5px" }}
                  >
                    <Row style={{ textAlign: "center" }}>
                      <Col as="h5">Price:</Col>
                      <Col as="h5">
                        <strong>${game.price}</strong>
                      </Col>
                    </Row>
                    <Row
                      as="h5"
                      className="mt-3 "
                      style={{ textAlign: "center" }}
                    >
                      <strong>Status:</strong>
                    </Row>
                    <Row as="h4" style={{ textAlign: "center" }}>
                      <strong>
                        {game.numberInStock > 0 ? "In Stock" : "Out Of Stock"}
                      </strong>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Button
                        onClick={buyNowHandler}
                        style={{
                          backgroundColor: "dodgerblue",
                          borderColor: "dodgerblue",
                        }}
                        type="button"
                        disabled={game.numberInStock === 0}
                      >
                        {game.numberInStock > 0 ? "Buy now" : "Out Of Stock"}
                      </Button>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row
            className="justify-content-center my-lg-3 py-lg-3 my-3 py-3"
            style={{ borderTop: "solid", borderWidth: "0.5px" }}
          >
            <h2 className="text-center">Description</h2>
            <Col lg={10}>
              <Card bg="light">
                <ListGroup variant="flush">
                  <ListGroup.Item
                    style={{
                      textAlign: "center",
                      borderBottom: "solid",
                      borderWidth: "0.5px",
                    }}
                  >
                    <h3>{game.title}</h3>
                    <h5>Publisher: {game.publisher}</h5>
                    <Rating
                      value={game.rating}
                      text={`${game.numReviews} reviews`}
                    />
                  </ListGroup.Item>
                  <ListGroup.Item
                    style={{ borderBottom: "solid", borderWidth: "0.5px" }}
                  >
                    <p className="px-lg-5" style={{ whiteSpace: "pre-line" }}>
                      {game.description}
                    </p>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row className="justify-content-center">
                      <Col
                        lg={5}
                        style={{ borderRight: "solid", borderWidth: "0.5px" }}
                      >
                        <ul>
                          <strong>MINIMUM:</strong>
                          {minReq.map((requirement) => (
                            <li key={requirement}>{requirement}</li>
                          ))}
                        </ul>
                      </Col>
                      <Col lg={5}>
                        <ul>
                          <strong>RECOMMENDED:</strong>
                          {recReq.map((requirement) => (
                            <li key={requirement}>{requirement}</li>
                          ))}
                        </ul>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row
            className="justify-content-center my-lg-3 py-lg-3 my-3 py-3"
            style={{ borderTop: "solid", borderWidth: "0.5px" }}
          >
            <Col lg={6}>
              <h2 className="text-center">Reviews</h2>
              {game.reviews.length === 0 && (
                <Message variant="warning">No Reviews</Message>
              )}
              <Card>
                <ListGroup variant="flush">
                  {game.reviews.map((review) => (
                    <ListGroup.Item
                      key={review.id}
                      style={{ borderBottom: "solid", borderWidth: "0.5px" }}
                    >
                      <h5>{review.name}</h5>
                      <Rating value={review.rating} />
                      <p>{review.dateCreated.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
                  <ListGroup.Item>
                    <h2>Write a Review</h2>
                    {errorGameReview && (
                      <Message variant="danger">{errorGameReview}</Message>
                    )}
                    {userInfo ? (
                      <Form onSubmit={submitHandler}>
                        <Form.Group controlId="rating" className="my-3">
                          <Form.Label>Rating</Form.Label>
                          <Form.Select
                            style={{
                              border: "1px solid black",
                              color: "black",
                              width: "50%",
                            }}
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                          >
                            <option value="" style={{ color: "black" }}>
                              Select...
                            </option>
                            <option value="1" style={{ color: "black" }}>
                              1 - Poor
                            </option>
                            <option value="2" style={{ color: "black" }}>
                              2 - Fair
                            </option>
                            <option value="3" style={{ color: "black" }}>
                              3 - Good
                            </option>
                            <option value="4" style={{ color: "black" }}>
                              4 - Very Good
                            </option>
                            <option value="5" style={{ color: "black" }}>
                              5 - Excellent
                            </option>
                          </Form.Select>
                        </Form.Group>
                        <Col>
                          <Form.Group controlId="comment" className="my-3">
                            <Form.Label style={{ color: "black" }}>
                              Comment:
                            </Form.Label>
                            <Form.Control
                              style={{
                                border: "1px solid black",
                                color: "black",
                              }}
                              type="text"
                              placeholder="Write a comment..."
                              value={comment}
                              as="textarea"
                              onChange={(e) => setComment(e.target.value)}
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                        <Button type="submit" variant="primary">
                          Submit
                        </Button>
                      </Form>
                    ) : (
                      <Message>
                        Please{" "}
                        <Link
                          to={`/login?redirect=game/${game.id}`}
                          style={{ color: "black" }}
                        >
                          Sign in
                        </Link>{" "}
                        to write a review
                      </Message>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default GameScreen;
