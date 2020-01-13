import React, { Component } from "react";
import { getSinglePost } from "../redux/actions/blogPostActions";
import { connect } from "react-redux";
import Spin from "./Spinner";
import { Container, Row, Col, ButtonGroup, Badge, Button } from "reactstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import PageTitle from "../components/common/PageTitle";
import HoriRuleWithTopButton from "./HoriRuleWithTopButton";
import Comments from "./Comments";
import AddComments from "./AddComments";
import CardComponent from "./CardComponent";
import {
  selectButtonloading,
  selectComments,
  selectLoading,
  selectSingleBlogPost,
  selectRelatedBlogs
} from "../utils/reselectFuncs/blogReselectFunc";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faFacebook,
  faTwitter,
  faLinkedin,
  faWhatsapp
} from "@fortawesome/free-brands-svg-icons";

export class SingleBlogPost extends Component {
  componentDidMount() {
    if (this.props.singleBlogPost === null) {
      console.log("single is running ooo");
      return this.props.getSinglePost(
        this.props.match.params.blogId,
        this.props.history
      );
    }
    return;
  }
  shareButton = link => {
    return window.open(link, "_blanck");
  };
  render() {
    const blogId = this.props.match.params.blogId;
    const {
      loading,
      singleBlogPost,

      Buttonloading,
      comments,
      relatedBlogs
    } = this.props;
    const {
      category,
      title,
      bloggerID,
      bloggerProfileImgUrl,
      creatAt,
      text
    } = singleBlogPost;
    if (
      singleBlogPost === null ||
      loading ||
      Object.keys(singleBlogPost).length === 0
    ) {
      return <Spin />;
    }
    return (
      <Container fluid>
        <Row>
          <Col className="page-header py-4">
            <Badge
              className="mr-auto"
              style={{
                backgroundColor: "#9b59b6",
                marginTop: "7px",
                marginBottom: "0px",

                borderColor: "#9b59b6"
              }}
            >
              {category}
            </Badge>
            <PageTitle
              sm="4"
              title={title}
              subtitle="Story"
              className="text-sm-left"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <ReactQuill theme="bubble" value={text} readOnly />
          </Col>
        </Row>

        <Row>
          <Col>
            <div className="card-post__author d-flex">
              <Link
                to={`/profile/${bloggerID}`}
                className="card-post__author-avatar card-post__author-avatar--small"
                style={{
                  backgroundImage: { bloggerProfileImgUrl }
                }}
              />

              <strong className="ml-2 text-muted"> Written by Anna Ken</strong>
            </div>
            <Moment
              className="text-muted ml-auto"
              format="MMMM Do YYYY, h:mm:ss a"
            >
              {creatAt}
            </Moment>
          </Col>
        </Row>

        <Row className="mb-3">
          {" "}
          <HoriRuleWithTopButton buttonText={"Comments"} />
          {comments &&
            comments.map((comment, idx) => (
              <Col key={idx} className="mb-1" sm="12">
                <Comments comment={comment} />
              </Col>
            ))}
        </Row>

        <Col className="mt-4">
          <HoriRuleWithTopButton buttonText={"Add Comments"} />
          <AddComments Buttonloading={Buttonloading} blogId={blogId} />
        </Col>
        <Col className="mt-4">
          <HoriRuleWithTopButton buttonText={"Add Blogger On Socials"} />
          <ButtonGroup className="mr-auto">
            <Button
              onClick={this.shareButton.bind(
                this,
                `https://facebook.com/sharer.php?u=[${this.props.match.url}]`
              )}
              color="primary"
            >
              <FontAwesomeIcon icon={faFacebook} /> Facebook{" "}
            </Button>
            <Button
              onClick={this.shareButton.bind(
                this,
                `https://twitter.com/share?url[${
                  this.props.match.url
                }]&text=[${title}]&via[via]&hashtags=[hashtags]`
              )}
              color="info"
            >
              <FontAwesomeIcon icon={faTwitter} />
              Twitter
            </Button>
            <Button
              onClick={this.shareButton.bind(
                this,
                `https://www.linkedin.com/shareArticle?url=[${
                  this.props.match.url
                }]&title=[${title}]`
              )}
              color="dark"
            >
              <FontAwesomeIcon icon={faLinkedin} /> Linkedln
            </Button>
            <Button
              onClick={this.shareButton.bind(
                this,
                `https://wa.me/?text=[${title}][${this.props.match.url}]`
              )}
              color="success"
            >
              <FontAwesomeIcon icon={faWhatsapp} /> Watsapp
            </Button>
          </ButtonGroup>
        </Col>

        <Container className="mt-4">
          <HoriRuleWithTopButton buttonText={"Related Blogs"} />
          <Row>
            {relatedBlogs &&
              relatedBlogs.map((post, idx) => (
                <Col key={idx} sm="12" md="6" lg="4" className="mb-4">
                  <CardComponent post={post} />
                </Col>
              ))}
          </Row>
        </Container>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  loading: selectLoading(state),

  singleBlogPost: selectSingleBlogPost(state),
  Buttonloading: selectButtonloading(state),
  comments: selectComments(state),
  relatedBlogs: selectRelatedBlogs(state)
});

export default connect(
  mapStateToProps,
  { getSinglePost }
)(SingleBlogPost);
