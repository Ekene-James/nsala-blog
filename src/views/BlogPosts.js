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

class BlogPosts extends React.Component {
  componentDidMount() {
    if (this.props.blogData.length === 0) {
      this.props.getAllBlogs();
      this.props.getBlogTotal();
    }

    return;
  }
  render() {
    const { loading, blogData, blogTotal } = this.props;

    if (loading || blogData === null || blogData.length === 0) {
      return <Spin />;
    }

    return (
      <Container fluid={true}>
        <Row className="page-header py-4">
          <Col sm="12">
            <PageTitle
              sm="4"
              title="New Posts"
              subtitle="Blogs"
              className="text-sm-left"
            />
          </Col>
        </Row>

        <Row>
          {blogData.map((post, idx) => {
            return (
              <Col key={idx} sm="12" md="6" lg="4" className="mb-4">
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
        <Col>
          <strong className="text-muted d-block mb-2">Follow Us On</strong>
          <ButtonGroup className="mr-auto">
            <Button theme="primary">Facebook </Button>
            <Button theme="secondary">Twitter</Button>
            <Button theme="dark">Instagram</Button>
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
