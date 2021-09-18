import React from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import Meta from "../components/Meta";

const NotFoundScreen = ({ history }) => {
  const handleBack = () => {
    history.push("/");
  };
  return (
    <>
      <Meta title="Empty" />
      <Container style={{ textAlign: "center" }}>
        <Row lg={1} className="mt-3 pt-3">
          <Col>
            <Image src="/images/notFound.png" className="w-25" />
          </Col>
        </Row>
        <Row className="mt-3 justify-content-center">
          <Col lg={4}>
            <Button variant="info" className="w-75" onClick={handleBack}>
              Back to homepage
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default NotFoundScreen;
