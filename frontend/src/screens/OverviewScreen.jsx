import React, { useEffect } from "react";
import { Col, Container, Row, Button, Card } from "react-bootstrap";
import CheckoutSteps from "../components/CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartActions";
import Meta from "../components/Meta";

const OverviewScreen = ({ match, history }) => {
  const gameId = match.params.id;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItem } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
    history.replace("/empty");
  };

  useEffect(() => {
    if (userInfo) {
      if (gameId) {
        dispatch(addToCart(gameId));
      }
    } else {
      history.push(`/login?redirect=overview/${gameId}`);
    }
  }, [dispatch, gameId, userInfo, history]);

  const handleGoToPayment = () => {
    history.push(`/payment/${gameId}`);
  };

  return (
    <Container>
      <Meta title={`Cart | ${cartItem.title}`} />
      {cartItem.game ? (
        <>
          <CheckoutSteps step1 step2 />
          <Row className="justify-content-center">
            <Col lg={6} md={9} xs={15}>
              <Card bg="light">
                <Card.Img src={cartItem.image} />
                <Card.Body>
                  <Row
                    className="py-2"
                    style={{
                      borderBottom: "solid",
                      borderWidth: "0.5px",
                      borderColor: "black",
                    }}
                  >
                    <Card.Text
                      as="h4"
                      style={{ color: "black", textAlign: "center" }}
                    >
                      Price: ${cartItem.price}
                    </Card.Text>
                  </Row>
                  <Row
                    className="py-2"
                    style={{
                      borderBottom: "solid",
                      borderWidth: "0.5px",
                      borderColor: "black",
                    }}
                  >
                    <Card.Text as="h5" style={{ color: "black" }}>
                      Important! The activation keys we provide are going to
                      work only on the Steam platform.
                      <br /> You will need a Steam account in order to activate
                      this product.
                    </Card.Text>
                  </Row>
                  <Row className="justify-content-center">
                    <Col lg={7} md={7} xs={10} style={{ textAlign: "center" }}>
                      <Button
                        onClick={handleGoToPayment}
                        style={{
                          backgroundColor: "dodgerblue",
                          borderColor: "dodgerblue",
                        }}
                        className="mt-3 w-100"
                        disabled={cartItem.numberInStock === 0}
                      >
                        {cartItem.numberInStock > 0
                          ? "Proceed to Payment"
                          : "Out Of Stock"}
                      </Button>
                    </Col>
                  </Row>
                  <Row className="justify-content-center">
                    <Col lg={7} md={7} xs={10} style={{ textAlign: "center" }}>
                      <Button
                        onClick={() => removeFromCartHandler(gameId)}
                        style={{
                          backgroundColor: "red",
                          borderColor: "red",
                        }}
                        className="mt-3 w-100"
                      >
                        Remove from cart
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default OverviewScreen;
