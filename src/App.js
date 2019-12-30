import React, { Component, lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Route Views
import "bootstrap/dist/css/bootstrap.min.css";

import "./shards-dashboards.1.1.0.min.css";
import WelcomeTop from "./views/WelcomeTop";

import MainNavbar from "./views/Navbar";

import MainFooter from "./views/MainFooter";
import { Container, Row, Col } from "reactstrap";

import AddNewPost from "./views/AddNewPost";

import SideBar from "./views/SideBar";
import Spin from "./views/Spinner";
import withTracker from "./withTracker";

const BlogPosts = lazy(() => import("./views/BlogPosts"));
const SingleBlogPost = lazy(() => import("./views/SingleBlogPost"));
const UserProfileLite = lazy(() => import("./views/UserProfileLite"));
const Category = lazy(() => import("./views/Category"));
const SearchCompo = lazy(() => import("./views/SearchCompo"));

export class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <WelcomeTop />
        <MainNavbar />
        <Container className="themed-container" fluid={true}>
          <Row>
            <Col sm="12" md="9">
              <Switch>
                <Suspense fallback={<Spin />}>
                  <Route exact path="/" component={withTracker(BlogPosts)} />
                  <Route
                    path="/category/:catName"
                    component={withTracker(Category)}
                  />
                  <Route
                    path="/user-profile-lite"
                    component={withTracker(UserProfileLite)}
                  />
                  <Route
                    path="/blog/:blogId"
                    component={withTracker(SingleBlogPost)}
                  />
                  <Route
                    path="/search/:searchItem"
                    component={withTracker(SearchCompo)}
                  />
                </Suspense>

                <Route path="/add-new-post" component={AddNewPost} />
              </Switch>
            </Col>

            <Col sm="12" md="3" style={{ border: "0px", padding: "0px" }}>
              <SideBar />
            </Col>
          </Row>
        </Container>

        <MainFooter />
      </BrowserRouter>
    );
  }
}

export default App;
//basename={process.env.REACT_APP_BASENAME || ""} UA-155170048-1
