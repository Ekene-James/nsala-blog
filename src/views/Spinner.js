import React from "react";
import { Spinner, Container } from "reactstrap";

function Spin() {
  return (
    <Container
      className="d-flex justify-content-center align-items-center my-4 py-4 "
      style={{ marginTop: "200px", marginDown: "400px" }}
    >
      <Spinner animation="border" variant="primary" />
    </Container>
  );
}

export default Spin;
