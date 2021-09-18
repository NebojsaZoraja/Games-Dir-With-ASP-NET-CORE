import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  Container,
  Card,
  Table,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { listmyOrders } from "../actions/orderActions";
import Paginate from "../components/Paginate";
import Meta from "../components/Meta";

const ProfileScreen = ({ location, history, match }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const {
    orders,
    loading: loadingOrders,
    error: errorOrders,
    page,
    pages,
  } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(getUserDetails("profile"));
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
    dispatch(listmyOrders(pageNumber));
  }, [history, userInfo, dispatch, pageNumber]);

  const handleOrder = (id) => {
    history.push(`/order/${id}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(updateUserProfile({ id: user.id, name, email, password }));
    }
  };

  return (
    <Container>
      <Meta title={`Profile | ${name}`} />
      <Row className="justify-content-center my-lg-5 my-md-5 my-4">
        <Col
          md={6}
          lg={5}
          style={{ borderRight: "solid", borderWidth: "0.5px" }}
        >
          <Card className="p-2 m-lg-3" style={{ backgroundColor: "darkblue" }}>
            <h2 style={{ textAlign: "center" }}>User Profile</h2>
            {message && <Message variant="danger">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            {success && <Message variant="success">Profile Updated</Message>}
            {loading && <Loader />}
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
              </Form.Group>
              <Form.Group controlId="password" className="my-1">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="confirmPassword" className="my-1">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group style={{ textAlign: "center" }}>
                <Button type="submit" variant="primary" className="my-2">
                  Update
                </Button>
              </Form.Group>
            </Form>
          </Card>
        </Col>
        <Col lg={7}>
          <h3 style={{ textAlign: "center" }}>My Games</h3>
          {loadingOrders ? (
            <Loader />
          ) : errorOrders ? (
            <Message variant="danger">{errorOrders}</Message>
          ) : (
            <Card className="p-1" style={{ backgroundColor: "darkblue" }}>
              <Table striped borderless hover responsive className="table-sm">
                <thead>
                  <tr>
                    <th>NAME</th>
                    <th>TOTAL</th>
                    <th>Purchased on</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      onClick={() => handleOrder(order.id)}
                      style={{ cursor: "pointer" }}
                    >
                      <td>{order.orderItem.title}</td>
                      <td>${order.price}</td>
                      <td>{order.purchasedOn.substring(0, 10)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Paginate pages={pages} page={page} orders={true} />
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileScreen;
