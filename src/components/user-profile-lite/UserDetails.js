import React from "react";
import { connect } from "react-redux";

import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  ButtonGroup,
  Button
} from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram
} from "@fortawesome/free-brands-svg-icons";

import { getProfileInfo } from "../../redux/actions/otherBlogPostActions";
import { withRouter } from "react-router-dom";

class UserDetails extends React.Component {
  componentDidMount() {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
    this.props.getProfileInfo(this.props.match.params.uid);
  }
  follow = link => {
    return window.open(link, "_blanck");
  };
  render() {
    const {
      name,
      job,
      bio,
      twitter,
      facebook,
      instagram,
      bloggerProfileImgUrl
    } = this.props.userDetails;
    return (
      <Card small className="mb-4 pt-3">
        <CardHeader className="border-bottom text-center">
          <div className="mb-3 mx-auto">
            <img
              className="rounded-circle"
              src={bloggerProfileImgUrl}
              alt={name}
              width="190"
            />
          </div>
          <h4 className="mb-0">{name}</h4>
          <span className="text-muted d-block mb-2">{job}</span>
          <h5>Brief bio</h5>
          <div>
            <p>{bio}</p>
          </div>
        </CardHeader>
        <ListGroup flush>
          <ListGroupItem>
            <strong className="text-muted d-block mb-2">Follow On</strong>
            <ButtonGroup className="mr-auto">
              <Button
                onClick={this.follow.bind(this, `${facebook}`)}
                color="primary"
              >
                <FontAwesomeIcon icon={faFacebook} />
                {"  "} Facebook{" "}
              </Button>
              <Button
                onClick={this.follow.bind(this, `${twitter}`)}
                color="info"
              >
                <FontAwesomeIcon icon={faTwitter} />
                {"  "}Twitter
              </Button>
              <Button
                onClick={this.follow.bind(this, `${instagram}`)}
                color="success"
              >
                <FontAwesomeIcon icon={faInstagram} />
                {"  "}Instagram
              </Button>
            </ButtonGroup>
          </ListGroupItem>
        </ListGroup>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  userDetails: state.blog.user
});

export default connect(mapStateToProps, { getProfileInfo })(
  withRouter(UserDetails)
);
