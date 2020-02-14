import React from "react";
import { Container, Row, Col } from "reactstrap";

import PageTitle from "../components/common/PageTitle";
import UserDetails from "../components/user-profile-lite/UserDetails";

const UserProfileLite = () => (
  <Container fluid className="main-content-container px-4">
    <Row className="page-header py-4">
      <PageTitle
        title="Blogger Profile"
        subtitle="Overview"
        md="12"
        className="ml-sm-auto mr-sm-auto"
      />
    </Row>
    <Row>
      <Col>
        <UserDetails />
      </Col>
    </Row>
  </Container>
);

export default UserProfileLite;
