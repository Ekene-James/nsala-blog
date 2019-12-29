import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  CardImg,
  Badge
} from "reactstrap";
import { Link } from "react-router-dom";
import Pulse from "react-reveal/Pulse";
import Moment from "react-moment";

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
      bloggerID,
      bloggerProfileImgUrl,
      creatAt,
      id
    } = post;

    return (
      <Card style={{ maxWidth: "300px" }}>
        <CardHeader>{category}</CardHeader>
        <Pulse when={this.state.zoom}>
          <CardImg
            className="img-fluid"
            onMouseEnter={this.onHover}
            src={BlogImgUrl}
          />
        </Pulse>

        <CardBody>
          <CardTitle>{title}</CardTitle>

          <Link to={`/blog/${id}`}>
            <Badge
              style={{
                backgroundColor: "#8e44ad",
                borderColor: "white"
              }}
            >
              Read more &rarr;
            </Badge>
          </Link>
        </CardBody>
        {small ? null : (
          <CardFooter>
            <div className="card-post__author d-flex">
              <a
                href={`/profile/${bloggerID}`}
                className="card-post__author-avatar card-post__author-avatar--small"
                style={{
                  backgroundImage: `src=${bloggerProfileImgUrl}`
                }}
              />{" "}
              Written by Anna Ken
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

export default CardComponent;