import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Meta from "../components/Meta";
import {
  Col,
  Row,
  Image,
  Container,
  Carousel as CarouselTop,
  Button,
} from "react-bootstrap";
import Game from "../components/Game";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import { listGamesHomePage } from "../actions/gameActions";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const HomeScreen = ({ match, history }) => {
  const dispatch = useDispatch();

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
      slidesToSlide: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  const gameList = useSelector((state) => state.gameList);
  const { loading, error, games } = gameList;
  useEffect(() => {
    dispatch(listGamesHomePage());
  }, [dispatch]);

  const handleViewAll = () => history.push("/games");

  return (
    <>
      <Meta title="Games-Dir | Home" />
      <Container>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            <h3 className="text-center">Games under 30$</h3>
            <Row className="justify-content-center">
              <Col xs={30} className="text-center">
                <CarouselTop responsive={responsive}>
                  {games.map(
                    (game) =>
                      game.price < 30 && (
                        <CarouselTop.Item key={game.id}>
                          <Link
                            to={`/game/${game.id}`}
                            style={{ textDecoration: "none" }}
                          >
                            <Image
                              src={game.image}
                              alt={game.title}
                              className="d-block w-100"
                              fluid
                            />
                          </Link>
                        </CarouselTop.Item>
                      )
                  )}
                </CarouselTop>
              </Col>
            </Row>
            <Row
              className="justify-content-center my-lg-3 py-lg-3 my-3 py-3"
              style={{ borderTop: "solid", borderWidth: "0.5px" }}
            >
              <h2 className="text-center pt-lg-2">Game previews</h2>

              <Col style={{ textAlign: "right" }}>
                <Button
                  variant="outline-light"
                  className="btn-lg"
                  onClick={handleViewAll}
                >
                  View all
                </Button>
                <Carousel
                  className="w-100"
                  responsive={responsive}
                  renderButtonGroupOutside={true}
                  infinite={true}
                >
                  {games.map((game) => (
                    <Col key={game.id}>
                      <Game game={game} />
                    </Col>
                  ))}
                </Carousel>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </>
  );
};

export default HomeScreen;
