import React from "react";

import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  ButtonGroup,
  Button
} from "reactstrap";
import FontAwesome from "react-fontawesome";

const UserDetails = ({ userDetails }) => (
  <Card small className="mb-4 pt-3">
    <CardHeader className="border-bottom text-center">
      <div className="mb-3 mx-auto">
        <img
          className="rounded-circle"
          src={userDetails.avatar}
          alt={userDetails.name}
          width="190"
        />
      </div>
      <h4 className="mb-0">{userDetails.name}</h4>
      <span className="text-muted d-block mb-2">{userDetails.jobTitle}</span>
      <Button pill outline size="sm" className="mb-2">
        <i className="material-icons mr-1">person_add</i> Follow
      </Button>
    </CardHeader>
    <ListGroup flush>
      <ListGroupItem className="p-4">
        <strong className="text-muted d-block mb-2">
          {userDetails.metaTitle}
        </strong>
        <span>{userDetails.metaValue}</span>
      </ListGroupItem>
      <ListGroupItem>
        <strong className="text-muted d-block mb-2">Follow On</strong>
        <ButtonGroup className="mr-auto">
          <Button theme="primary">Facebook </Button>
          <Button theme="secondary">Twitter</Button>
          <Button theme="dark">Instagram</Button>
        </ButtonGroup>
        <FontAwesome className="super-crazy-colors" name="rocket" size="2x" />
      </ListGroupItem>
    </ListGroup>
  </Card>
);

UserDetails.defaultProps = {
  userDetails: {
    name: "Sierra Brooks",
    avatar: require("./../../images/avatars/0.jpg"),
    jobTitle: "Project Manager",
    performanceReportTitle: "Workload",
    performanceReportValue: 74,
    metaTitle: "Description",
    metaValue:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eaque, quidem, commodi soluta qui quae minima obcaecati quod dolorum sint alias, possimus illum assumenda eligendi cumque?"
  }
};

export default UserDetails;
