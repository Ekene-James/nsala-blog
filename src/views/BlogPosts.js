import React from "react";
import { Container, Row, Col, Button, ButtonGroup } from "reactstrap";

import PageTitle from "../components/common/PageTitle";
import { connect } from "react-redux";

import {
  getAllBlogs,
  getSinglePost,
  getBlogTotal
} from "../redux/actions/blogPostActions";
import CardComponent from "./CardComponent";

import Spin from "./Spinner";
import Paginate from "./Paginate";
import Fade from "react-reveal/Fade";
import {
  selectBlogData,
  selectLoading,
  selectBlogTotal
} from "../utils/reselectFuncs/blogReselectFunc";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faWhatsapp
} from "@fortawesome/free-brands-svg-icons";

class BlogPosts extends React.Component {
  componentDidMount() {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
    if (this.props.blogData.length === 0) {
      this.props.getAllBlogs();
      this.props.getBlogTotal();
    }

    return;
  }
  follow = link => {
    return window.open(link, "_blanck");
  };
  render() {
    const { loading, blogData, blogTotal } = this.props;

    if (loading || blogData === null || blogData.length === 0) {
      return <Spin />;
    }

    return (
      <Container fluid={true}>
        <Col className="page-header py-4" sm="12">
          <PageTitle
            sm="4"
            title="New Posts"
            subtitle="Blogs"
            className="text-sm-left"
          />
        </Col>

        <Row>
          {blogData.map((post, idx) => {
            return (
              <Col
                key={idx}
                sm="12"
                md="6"
                lg="4"
                className="d-flex justify-content-center mb-4"
              >
                <Fade left>
                  <CardComponent post={post} />
                </Fade>
              </Col>
            );
          })}
        </Row>

        <Col className="d-flex justify-content-center">
          <Paginate blogTotal={blogTotal.totalBlogs} />
        </Col>
        <Col className="mb-4">
          <strong className="text-muted d-block mb-2">Follow Us On</strong>
          <ButtonGroup className="mr-auto">
            <Button
              onClick={this.follow.bind(
                this,
                `https://www.facebook.com/edehjamesraphael`
              )}
              color="primary"
            >
              <FontAwesomeIcon icon={faFacebook} />
              {"  "} Facebook{" "}
            </Button>
            <Button
              onClick={this.follow.bind(
                this,
                `https://twitter.com/jamesraphael36`
              )}
              color="info"
            >
              <FontAwesomeIcon icon={faTwitter} />
              {"  "}Twitter
            </Button>
            <Button
              onClick={this.follow.bind(
                this,
                `https://api.whatsapp.com/send?phone=+2348187866412`
              )}
              color="success"
            >
              <FontAwesomeIcon icon={faWhatsapp} />
              {"  "}Whatsapp
            </Button>
          </ButtonGroup>
        </Col>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  blogData: selectBlogData(state),
  loading: selectLoading(state),
  blogTotal: selectBlogTotal(state)
});
export default connect(
  mapStateToProps,
  { getAllBlogs, getSinglePost, getBlogTotal }
)(BlogPosts);
