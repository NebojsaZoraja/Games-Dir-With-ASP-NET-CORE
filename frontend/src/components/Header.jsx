import React from "react";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../actions/userActions";
import { withRouter } from "react-router-dom";
import { removeFromCart } from "../actions/cartActions";
import SearchBox from "./SearchBox";

const Header = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItem } = cart;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(removeFromCart(cartItem.game));
    history.push("/");
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img
                src="/logo.png"
                width="40"
                height="40"
                className="d-inline-block align-center mx-1"
                alt="Games Dir logo"
              />
              Games-Dir
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Route render={({ history }) => <SearchBox history={history} />} />
            <Nav className="ms-auto">
              {userInfo ? (
                <>
                  {cartItem.game ? (
                    <LinkContainer to={`/overview/${cartItem.game}`}>
                      <Nav.Link>
                        <i className="fas fa-shopping-cart"></i>&nbsp; Cart
                      </Nav.Link>
                    </LinkContainer>
                  ) : (
                    <></>
                  )}
                  <NavDropdown
                    title={
                      <>
                        <i className="fas fa-user"></i>&nbsp; {userInfo.name}
                      </>
                    }
                    id="username"
                  >
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i>&nbsp; Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown
                  title={
                    <>
                      <i
                        className="fas fa-user"
                        style={{ color: "limegreen" }}
                      ></i>
                      &nbsp; Admin
                    </>
                  }
                  id="adminMenu"
                >
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Manage Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/gamelist">
                    <NavDropdown.Item>Manage Games</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/genreslist">
                    <NavDropdown.Item>Manage Genres</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default withRouter(Header);
