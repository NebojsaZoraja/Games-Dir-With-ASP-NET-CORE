import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/games/search/${keyword}`);
    } else {
      history.push("/games");
    }
  };

  return (
    <Form onSubmit={submitHandler} className="d-flex mx-lg-3">
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search..."
        className="mr-sm-2 ml-sm-5"
      ></Form.Control>
      <Button type="submit" variant="outline-success" className="btn-md mx-1">
        <i className="fas fa-search"></i>
      </Button>
    </Form>
  );
};

export default SearchBox;
