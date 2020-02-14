import React from "react";
import { Spinner, Container } from "reactstrap";

function Spin() {
  return (
    <Container className="d-flex justify-content-center align-items-center my-4 py-4 ">
      <div style={{ marginTop: "300px" }} />
      <Spinner animation="border" variant="primary" />
    </Container>
  );
}

export default Spin;
