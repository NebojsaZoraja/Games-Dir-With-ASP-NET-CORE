import axios from "axios";
import React, { useEffect, useState } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { Collapse, Card, Col, Row, Button, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails, payOrder } from "../actions/orderActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  ORDER_CREATE_RESET,
  ORDER_PAY_RESET,
} from "../constatns/orderConstants";
import { removeFromCart } from "../actions/cartActions";
import Meta from "../components/Meta";

const OrderScreen = ({ match, history }) => {
  const [open, setOpen] = useState(false);
  const [sdkReady, setSdkReady] = useState(false);
  const orderId = match.params.id;
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  let { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    dispatch(getOrderDetails(orderId));
    dispatch({ type: ORDER_PAY_RESET });
    if (!order || successPay || order.id !== orderId) {
      dispatch(getOrderDetails(orderId));
      dispatch({ type: ORDER_PAY_RESET });
    }
    if (!window.paypal) {
      addPayPalScript();
    } else {
      setSdkReady(true);
    }
  }, [dispatch, orderId, successPay, sdkReady]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
    dispatch(removeFromCart(order.orderItem.game));
  };

  const handleBackToHome = () => {
    history.replace("/");
    dispatch({ type: ORDER_CREATE_RESET });
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <Meta title={`Order | ${order.orderItem.title}`} />
      <Button variant="dark" onClick={handleBackToHome}>
        Back to Homepage
      </Button>
      <Row className="justify-content-center">
        <Col lg={5}>
          <Card style={{ backgroundColor: "indigo" }}>
            <Row className="justify-content-center" variant="flush">
              <Col
                lg={10}
                style={{
                  borderBottom: "solid",
                  borderWidth: "0.5px",
                  textAlign: "center",
                }}
              >
                <h3>Order: {orderId}</h3>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col
                lg={4}
                className="py-2"
                style={{
                  borderBottom: "solid",
                  borderWidth: "0.5px",
                  textAlign: "center",
                }}
                as="h5"
              >
                Product:{" "}
              </Col>
              <Col
                lg={6}
                className="py-2"
                style={{
                  borderBottom: "solid",
                  borderWidth: "0.5px",
                  textAlign: "center",
                }}
                as="h5"
              >
                {" "}
                {order.orderItem.title}{" "}
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col
                lg={4}
                className="py-2"
                style={{
                  borderBottom: "solid",
                  borderWidth: "0.5px",
                  textAlign: "center",
                }}
                as="h5"
              >
                Account:{" "}
              </Col>
              <Col
                lg={6}
                className="py-2"
                style={{
                  borderBottom: "solid",
                  borderWidth: "0.5px",
                  textAlign: "center",
                }}
                as="h5"
              >
                {" "}
                {order.orderUser.name}{" "}
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col
                lg={4}
                className="py-2"
                style={{
                  borderBottom: "solid",
                  borderWidth: "0.5px",
                  textAlign: "center",
                }}
                as="h5"
              >
                Price:{" "}
              </Col>
              <Col
                lg={6}
                className="py-2"
                style={{
                  borderBottom: "solid",
                  borderWidth: "0.5px",
                  textAlign: "center",
                }}
                as="h5"
              >
                {" "}
                ${order.orderItem.price}{" "}
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col
                lg={4}
                className="py-2"
                style={{
                  borderBottom: "solid",
                  borderWidth: "0.5px",
                  textAlign: "center",
                }}
                as="h5"
              >
                Payment Method:{" "}
              </Col>
              <Col
                lg={6}
                className="py-2"
                style={{
                  borderBottom: "solid",
                  borderWidth: "0.5px",
                  textAlign: "center",
                }}
                as="h5"
              >
                {" "}
                {order.paymentMethod}{" "}
              </Col>
            </Row>
            {!order.isPaid ? (
              <Row className="justify-content-center py-2">
                <Col lg={11} style={{ textAlign: "center" }} as="h5">
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </Col>
              </Row>
            ) : (
              <Row className="justify-content-center py-2">
                <Col lg={11} style={{ textAlign: "center" }} as="h5">
                  <Row className="justify-content-center">
                    <Col
                      lg={8}
                      className="py-2"
                      style={{
                        textAlign: "center",
                      }}
                    >
                      <Button
                        variant="dark"
                        style={{
                          width: "100%",
                        }}
                        onClick={() => setOpen(!open)}
                        aria-controls="example-collapse-text"
                        aria-expanded={open}
                      >
                        Click to see your product key
                      </Button>
                      <Collapse in={open} className="my-1">
                        <Dropdown>
                          <Card.Header>
                            <p>{order.productKey}</p>
                          </Card.Header>
                        </Dropdown>
                      </Collapse>
                    </Col>
                  </Row>
                </Col>
              </Row>
            )}
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
