import React, { useEffect } from "react";
import { Container, Row, Col, Button, ButtonGroup } from "reactstrap";

import PageTitle from "../components/common/PageTitle";
import { connect } from "react-redux";

import CardComponent from "./CardComponent";

import Spin from "./Spinner";
import Paginate from "./Paginate";
import Fade from "react-reveal/Fade";
import { getCategory } from "../redux/actions/otherBlogPostActions";
import {
  selectCategory,
  selectLoading,
  selectBlogTotal
} from "../utils/reselectFuncs/blogReselectFunc";

function Category(props) {
  useEffect(() => {
    if (props.category.length === 0) {
      props.getCategory(props.match.params.catName, props.history);
    }
  }, []);
  const { category, loading, blogTotal } = props;
  const { catName } = props.match.params;

  const catTotal = blogTotal[catName];

  const catTrue = true;
  if (loading || category === null || category.length === 0) {
    return <Spin />;
  }
  return (
    <Container fluid>
      <Row>
        <Col className="page-header py-4" sm={12}>
          <PageTitle
            sm="4"
            title={catName}
            subtitle="Category"
            className="text-sm-left"
          />
        </Col>
      </Row>

      <Row className="d-flex justify-content-center">
        {category.map((post, idx) => {
          return (
            <Col key={idx} sm="12" md="6" lg="4" className="mb-4">
              <Fade left>
                <CardComponent post={post} />
              </Fade>
            </Col>
          );
        })}
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          <Paginate blogTotal={catTotal} catName={catName} catTrue={catTrue} />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <strong className="text-muted d-block mb-2">Follow Us On</strong>
          <ButtonGroup>
            <Button theme="primary">Facebook </Button>
            <Button theme="secondary">Twitter</Button>
            <Button theme="dark">Instagram</Button>
          </ButtonGroup>
        </Col>
      </Row>
    </Container>
  );
}

const mapStateToProps = state => ({
  category: selectCategory(state),
  loading: selectLoading(state),
  blogTotal: selectBlogTotal(state)
});

export default connect(
  mapStateToProps,
  { getCategory }
)(Category);
