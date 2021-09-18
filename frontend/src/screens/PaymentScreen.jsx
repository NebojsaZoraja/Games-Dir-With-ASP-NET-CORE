import React, { useEffect, useState } from "react";
import { Form, Button, Col, Card, Row, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../actions/cartActions";
import Meta from "../components/Meta";

const PaymentScreen = ({ history, match }) => {
  const gameId = match.params.id;

  const cart = useSelector((state) => state.cart);

  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push(`/placeorder/${gameId}`);
  };

  useEffect(() => {
    if (!cartItem.game) {
      history.replace("/empty");
    }
  });

  const { cartItem } = cart;
  return (
    <Container>
      <Meta title="Choose Payment" />
      <CheckoutSteps step1 step2 step3 />
      <Row className="justify-content-center">
        <Col lg={7} xs={15}>
          <Card bg="light">
            <h2
              className="pt-3"
              style={{ color: "black", textAlign: "center" }}
            >
              Payment method
            </h2>
            <Card.Body>
              <Form onSubmit={submitHandler}>
                <Form.Group>
                  <Form.Label
                    className="py-1"
                    as="legend"
                    style={{ color: "black" }}
                  >
                    Select payment method:
                  </Form.Label>
                </Form.Group>
                <Row className="py-1">
                  <Col>
                    <Form.Check
                      style={{ color: "black" }}
                      type="radio"
                      label="PayPal or Credit Card"
                      id="PayPal"
                      name="paymentMethod"
                      value="PayPal"
                      checked
                      onChange={(e) => setPaymentMethod(e.taget.value)}
                    ></Form.Check>
                  </Col>
                </Row>

                <Row className="justify-content-center mt-4">
                  <Col style={{ textAlign: "center" }}>
                    <Button
                      type="submit"
                      style={{
                        backgroundColor: "dodgerblue",
                        borderColor: "dodgerblue",
                      }}
                    >
                      Continue
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentScreen;
