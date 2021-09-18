import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import Meta from "../components/Meta";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { createGenre, deleteGenre, listGenres } from "../actions/genreActions";
import { GENRE_CREATE_RESET } from "../constatns/genreConstants";

const GenresList = ({ history }) => {
  const dispatch = useDispatch();
  const genresList = useSelector((state) => state.genresList);
  const { loading, error, genres } = genresList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const genreDelete = useSelector((state) => state.genreDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = genreDelete;

  const genreCreate = useSelector((state) => state.genreCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    genre: createdGenre,
  } = genreCreate;

  useEffect(() => {
    dispatch({ type: GENRE_CREATE_RESET });
    if (!userInfo.isAdmin) {
      history.push("/login");
    }
    if (successCreate) {
      history.push(`/admin/genreslist/${createdGenre.id}/edit`);
    } else {
      dispatch(listGenres());
    }
  }, [dispatch, userInfo, history, createdGenre, successCreate, successDelete]);

  const deleteHandler = (id) => {
    if (
      window.confirm(
        "Deleting a genre can result in corruption of data and break the application.\nOnly delete a genre if you have already deleted all games asociated with the genre.\n\nAre you sure you want to delete this genre?"
      )
    ) {
      dispatch(deleteGenre(id));
    }
  };

  const createGenreHandler = () => {
    dispatch(createGenre());
  };

  return (
    <>
      <Meta title="Admin | Genres List" />
      <Row
        className="my-3"
        style={{ borderBottom: "solid", borderWidth: "0.5px" }}
      >
        <h1 className="text-center">Genres</h1>
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
          <Col lg={4} md={6}>
            <Card className="p-1" style={{ backgroundColor: "darkblue" }}>
              <Table striped borderless hover responsive className="table-md">
                <thead>
                  <tr>
                    <th>NAME</th>
                    <th>
                      <Button
                        variant="warning"
                        className="btn-sm"
                        onClick={createGenreHandler}
                      >
                        <i className="fas fa-plus"></i>&nbsp; Add Genre
                      </Button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {genres.map((genre) => (
                    <tr key={genre.id}>
                      <td>{genre.name}</td>
                      <td>
                        <LinkContainer
                          to={`/admin/genreslist/${genre.id}/edit`}
                          className="mx-1"
                        >
                          <Button variant="dark" className="btn-sm">
                            <i className="fas fa-edit"></i>
                          </Button>
                        </LinkContainer>
                        <Button
                          variant="danger"
                          className="btn-sm"
                          onClick={() => deleteHandler(genre.id)}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default GenresList;
