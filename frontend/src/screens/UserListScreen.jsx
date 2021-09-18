import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listUsers, deleteUser } from "../actions/userActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import Meta from "../components/Meta";
import Paginate from "../components/Paginate";

const UserListScreen = ({ history, match }) => {
  const dispatch = useDispatch();
  const pageNumber = match.params.pageNumber || 1;

  const userList = useSelector((state) => state.userList);
  const { loading, error, users, pages, page } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if ((userInfo && userInfo.isAdmin) || successDelete) {
      dispatch(listUsers(Number(pageNumber)));
    } else {
      history.push("/login");
    }
  }, [dispatch, userInfo, history, successDelete, pageNumber]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <>
      <Meta title="Admin | User List" />
      <Row
        className="my-3"
        style={{ borderBottom: "solid", borderWidth: "0.5px" }}
      >
        <h1 className="text-center">Users</h1>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row className="justify-content-center">
          <Col lg={10} md={15}>
            <Card className="p-1" style={{ backgroundColor: "darkblue" }}>
              <Table striped borderless hover responsive className="table-md">
                <thead>
                  <tr>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>ADMIN</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>
                        <a href={`mailto:${user.email}`}>{user.email}</a>
                      </td>
                      <td>
                        {user.isAdmin ? (
                          <i
                            className="fas fa-check"
                            style={{ color: "limegreen" }}
                          ></i>
                        ) : (
                          <i
                            className="fas fa-times"
                            style={{ color: "red" }}
                          ></i>
                        )}
                      </td>
                      <td>
                        <LinkContainer
                          to={`/admin/user/${user.id}/edit`}
                          className="mx-1"
                        >
                          <Button variant="dark" className="btn-sm">
                            <i className="fas fa-edit"></i>
                          </Button>
                        </LinkContainer>
                        <Button
                          variant="danger"
                          className="btn-sm"
                          onClick={() => deleteHandler(user.id)}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Paginate pages={pages} page={page} users={true} />
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default UserListScreen;
