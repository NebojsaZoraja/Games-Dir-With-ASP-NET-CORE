import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Paginate = ({
  pages,
  page,
  orders = false,
  games = false,
  users = false,
}) => {
  return (
    pages > 1 && (
      <Pagination variant="success">
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              !games
                ? orders
                  ? `/profile/${x + 1}`
                  : users
                  ? `/admin/userlist/${x + 1}`
                  : ""
                : `/admin/gamelist/${x + 1}`
            }
          >
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;
