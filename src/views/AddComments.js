import React, { Component } from "react";

import { Button, Spinner } from "reactstrap";
import { connect } from "react-redux";

import { addComment } from "../redux/actions/blogPostActions";
export class AddComments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      comment: "",
      commentor: ""
    };
  }
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onClick = e => {
    e.preventDefault();

    this.props.addComment(this.state, this.props.blogId);
    this.setState({
      email: "",
      comment: "",
      commentor: ""
    });
  };
  render() {
    const { email, comment, commentor } = this.state;
    const { Buttonloading } = this.props;

    return (
      <div>
        <form onSubmit={this.onClick}>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Name"
            name="commentor"
            value={commentor}
            onChange={this.onChange}
            required
          />
          <input
            type="email"
            className="form-control mb-3"
            placeholder="smbdy@example.com"
            name="email"
            value={email}
            onChange={this.onChange}
            required
          />

          <label>Your Comment</label>
          <textarea
            className="form-control"
            rows="3"
            name="comment"
            value={comment}
            onChange={this.onChange}
            required
          />

          {Buttonloading ? (
            <Button
              style={{
                backgroundColor: "#8e44ad",
                marginTop: "7px",
                marginBottom: "0px",

                borderColor: "#8e44ad"
              }}
              disabled
            >
              <Spinner
                as="span"
                animation="border"
                variant="primary"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              Post Comment
            </Button>
          ) : (
            <Button
              type="submit"
              style={{
                backgroundColor: "#8e44ad",
                marginTop: "7px",
                marginBottom: "0px",

                borderColor: "#8e44ad"
              }}
            >
              Post Comment
            </Button>
          )}
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  { addComment }
)(AddComments);
