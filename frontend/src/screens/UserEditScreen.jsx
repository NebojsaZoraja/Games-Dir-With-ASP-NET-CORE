import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Container, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUser } from "../actions/userActions";
import { USER_UPDATE_RESET } from "../constatns/userConstants";
import Meta from "../components/Meta";

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user, success } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.replace("/admin/userlist");
    } else {
      if (!user.name || user.id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
        console.log("Help");
      }
    }
  }, [
    user.name,
    user.email,
    user.isAdmin,
    dispatch,
    userId,
    successUpdate,
    history,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ name, email, isAdmin }, user.id));
  };

  return (
    <>
      <Meta title="Admin | Edit User" />
      <Link to="/admin/userlist" className="btn btn-dark my-3">
        Go Back
      </Link>
      <Container>
        <Row className="justify-content-center my-lg-3 my-md-3 my-4">
          <Col lg={4} md={6}>
            <Card className="p-2" style={{ backgroundColor: "indigo" }}>
              <h1 style={{ textAlign: "center" }}>Edit User</h1>
              {loadingUpdate && <Loader />}
              {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
              {loading ? (
                <Loader />
              ) : error ? (
                <Message variant="danger">{error}</Message>
              ) : (
                <Form onSubmit={submitHandler}>
                  <Form.Group controlId="name" className="my-1">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter username"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="email" className="my-1">
                    <Form.Label>Email Address:</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                    <Form.Group controlId="isAdmin" className="my-2">
                      <Form.Check
                        type="checkbox"
                        label="Is Admin"
                        checked={isAdmin}
                        onChange={(e) => setIsAdmin(e.target.checked)}
                      ></Form.Check>
                    </Form.Group>
                  </Form.Group>
                  <Form.Group style={{ textAlign: "center" }}>
                    <Button type="submit" variant="primary" className="my-2">
                      Update
                    </Button>
                  </Form.Group>
                </Form>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserEditScreen;
