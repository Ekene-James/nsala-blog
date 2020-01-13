import React, { Component } from "react";
import { Col, Row, Container } from "reactstrap";
import { connect } from "react-redux";

import PageTitle from "../components/common/PageTitle";

import "react-quill/dist/quill.bubble.css";
import Fade from "react-reveal/Fade";

import CardComponent from "./CardComponent";
import { getSidebar } from "../redux/actions/blogPostActions";

import { selectSideBarData } from "../utils/reselectFuncs/blogReselectFunc";

export class SideBar extends Component {
  componentDidMount() {
    if (this.props.sideBarData.length === 0) {
      this.props.getSidebar();
    }
    return;
  }
  render() {
    const { sideBarData } = this.props;
    let small = true;

    return (
      <Container
        fluid
        style={{
          backgroundColor: "#8e44ad",
          minHeight: "70%"
        }}
      >
        <Row className="page-header py-4">
          {" "}
          <PageTitle
            sm="4"
            title="Featured Posts"
            subtitle="Blogs"
            className="text-sm-center text-white mb-3"
          />
        </Row>

        {/* Second Row of Posts */}
        <Row className="d-flex justify-content-center">
          {sideBarData &&
            sideBarData.map((post, idx) => {
              return (
                <Col
                  key={idx}
                  className="d-flex justify-content-center mb-3"
                  sm={{ size: "auto" }}
                  md={{ size: "auto" }}
                  lg={{ size: "auto" }}
                >
                  <Fade bottom>
                    {" "}
                    <CardComponent small={small} post={post} />
                  </Fade>
                </Col>
              );
            })}
        </Row>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  sideBarData: selectSideBarData(state)
});

export default connect(
  mapStateToProps,
  { getSidebar }
)(SideBar);
