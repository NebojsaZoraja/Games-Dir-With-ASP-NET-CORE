import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getGenreDetails, updateGenre } from "../actions/genreActions";
import { GENRE_UPDATE_RESET } from "../constatns/genreConstants";
import Meta from "../components/Meta";
import Loader from "../components/Loader";
import Message from "../components/Message";

const GenreEditScreen = ({ match, history }) => {
  const [name, setName] = useState("");
  const genreId = match.params.id;
  const dispatch = useDispatch();

  const genreDetails = useSelector((state) => state.genreDetails);
  const { genre, loading, error } = genreDetails;

  const genreUpdate = useSelector((state) => state.genreUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = genreUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: GENRE_UPDATE_RESET });
      history.replace("/admin/genreslist");
    } else {
      dispatch(getGenreDetails(genreId));
      setName(genre.name);
    }
  }, [dispatch, genreId, successUpdate, history, genre.name]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateGenre({ _id: genreId, name }));
  };

  return (
    <>
      <Meta title="Admin | Add/Edit Genre" />
      <Row className="justify-content-center my-lg-5 my-md-5 my-4">
        <Col lg={4} md={6}>
          <Card className="p-2" style={{ backgroundColor: "darkblue" }}>
            <h1 style={{ textAlign: "center" }}>Add/Edit Genre</h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : (
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="name" className="my-1">
                  <Form.Label>Genre Name:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter genre name.."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group style={{ textAlign: "center" }}>
                  <Button type="submit" variant="primary" className="my-2">
                    Submit
                  </Button>
                </Form.Group>
              </Form>
            )}
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default GenreEditScreen;
