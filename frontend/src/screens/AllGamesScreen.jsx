import React, { useEffect } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Game from "../components/Game";
import { getGameGenres, listGames } from "../actions/gameActions";
import Loader from "../components/Loader";
import Carousel from "react-multi-carousel";
import useDynamicRefs from "use-dynamic-refs";
import Message from "../components/Message";
import Meta from "../components/Meta";

const AllGamesScreen = () => {
  const gameList = useSelector((state) => state.gameList);
  const { loading, error, games } = gameList;
  const [getRef, setRef] = useDynamicRefs();

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

  const gameGenres = useSelector((state) => state.gameGenres);
  const { genres } = gameGenres;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGameGenres());
    dispatch(listGames(""));
  }, [dispatch]);

  console.log("Genres " + genres);

  const scrollToRef = (ref) => {
    window.scrollTo(0, ref.current.offsetTop);
  };
  const executeScroll = (ref) => scrollToRef(ref);

  return (
    <div>
      <Meta title="Games-Dir | All Games" />
      {loading && <Loader />}
      {error ? (
        <Message variant="danger">{error.message}</Message>
      ) : (
        <>
          <Row className="justify-content-center">
            <Col className="py-lg-4 py-2">
              <ListGroup horizontal="lg">
                {genres.map((genre) => (
                  <ListGroup.Item
                    onClick={() => executeScroll(getRef(genre))}
                    style={{
                      cursor: "pointer",
                      textAlign: "center",
                      fontSize: 15,
                      fontWeight: "bold",
                    }}
                    key={genre.id}
                    action
                    variant="dark"
                  >
                    {genre.name}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
          {genres.map((genre) => (
            <Row
              style={{ borderBottom: "solid", borderWidth: "0.5px" }}
              className="justify-content-center"
              ref={setRef(genre)}
              key={genre.id}
            >
              <h4 className="text-center py-2">{genre.name}</h4>
              <Carousel
                className="w-100"
                responsive={responsive}
                renderButtonGroupOutside={true}
                infinite={true}
              >
                {games.map(
                  (game) =>
                    game.genre.id === genre.id && (
                      <Col key={game.id} xs={11}>
                        <Game game={game} />
                      </Col>
                    )
                )}
              </Carousel>
            </Row>
          ))}{" "}
        </>
      )}
    </div>
  );
};

export default AllGamesScreen;
