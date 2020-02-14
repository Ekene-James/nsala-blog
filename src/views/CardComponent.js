import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  CardImg,
  Button
} from "reactstrap";

import { getSinglePost } from "../redux/actions/blogPostActions";
import Pulse from "react-reveal/Pulse";
import Moment from "react-moment";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

export class CardComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      zoom: false
    };
  }
  onHover = () => {
    this.setState({
      zoom: !this.state.zoom
    });
  };
  render() {
    const { small, post } = this.props;
    const {
      category,
      BlogImgUrl,
      title,
      bloggerId,
      bloggerProfileImgUrl,
      creatAt,
      id,
      name
    } = post;

    return (
      <Card style={{ maxWidth: "300px" }}>
        <CardHeader>{category}</CardHeader>
        <Pulse when={this.state.zoom}>
          {small ? (
            <CardImg
              style={{ maxHeight: "160px" }}
              className="img-fluid"
              onMouseEnter={this.onHover}
              src={BlogImgUrl}
            />
          ) : (
            <CardImg
              style={{ maxHeight: "250px" }}
              className="img-fluid"
              onMouseEnter={this.onHover}
              src={BlogImgUrl}
            />
          )}
        </Pulse>

        <CardBody>
          <CardTitle>{title}</CardTitle>
          <Button
            style={{
              backgroundColor: "#8e44ad",
              borderColor: "white"
            }}
            onClick={() => {
              this.props.getSinglePost(id, this.props.history);

              window.scroll({ top: 0, left: 0, behavior: "smooth" });
            }}
          >
            {" "}
            Read more &rarr;
          </Button>
        </CardBody>
        {small ? null : (
          <CardFooter>
            <div className="card-post__author d-flex">
              <a
                href={`/profile/${bloggerId}`}
                className="card-post__author-avatar card-post__author-avatar--small"
                style={{
                  backgroundImage: `url(${bloggerProfileImgUrl})`
                }}
              ></a>
              Written by {name}
            </div>
            <Moment
              className="text-muted ml-auto"
              format="MMMM Do YYYY, h:mm:ss a"
            >
              {creatAt}
            </Moment>
          </CardFooter>
        )}
      </Card>
    );
  }
}

export default connect(null, { getSinglePost })(withRouter(CardComponent));
