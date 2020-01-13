import React from "react";

import { Container, Row } from "reactstrap";

const MainFooter = () => (
  <footer className="main-footer p-2 px-3 text-white bg-dark">
    <Container fluid>
      <Row>
        <span className="copyright">Copyright © 2020 BlogTonic</span>
      </Row>
    </Container>
  </footer>
);

export default MainFooter;
