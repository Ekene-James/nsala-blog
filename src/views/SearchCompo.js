import React from "react";
import { Container, Row, Col } from "reactstrap";
import Fade from "react-reveal/Fade";
import Spin from "./Spinner";
import { connect } from "react-redux";
import CardComponent from "./CardComponent";
import {
  selectSearch,
  selectLoading
} from "../utils/reselectFuncs/blogReselectFunc";

function SearchCompo({ search, loading }) {
  if (loading || search === null) {
    return <Spin />;
  }
  return (
    <Container>
      {search.length === 0 ? (
        <h4>Found No Result For This Search</h4>
      ) : (
        <div>
          <Row>
            <Col className="page-header py-4">
              <h4>{`Found ${search.length} Result(s)`}</h4>
            </Col>{" "}
          </Row>
          <Row>
            {" "}
            {search.map((post, idx) => {
              return (
                <Col key={idx} sm="12" md="6" lg="4" className="mb-4">
                  <Fade left>
                    <CardComponent post={post} />
                  </Fade>
                </Col>
              );
            })}
          </Row>
        </div>
      )}
    </Container>
  );
}
const mapStateToProps = state => ({
  search: selectSearch(state),
  loading: selectLoading(state)
});
export default connect(mapStateToProps)(SearchCompo);
