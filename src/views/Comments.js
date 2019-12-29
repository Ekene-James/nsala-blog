import React, { Component } from "react";
import { Card, CardBody } from "reactstrap";
import Moment from "react-moment";

export class Comments extends Component {
  render() {
    const { commentor, comment, creatAt } = this.props.comment;

    return (
      <Card className="mb-3" small>
        <CardBody>
          <h6 className="text-muted">{commentor}</h6>

          <p>{comment}</p>
          <Moment
            className="text-muted ml-auto"
            format="MMMM Do YYYY, h:mm:ss a"
          >
            {creatAt}
          </Moment>
        </CardBody>
      </Card>
    );
  }
}

export default Comments;
