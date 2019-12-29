import React, { Component } from "react";
import { Link } from "react-router-dom";

import { UncontrolledCarousel, Container, Row } from "reactstrap";

export class BlogCategories extends Component {
  render() {
    const { posts } = this.props;

    let items = posts.map(post => {
      return {
        src: post.BlogImgUrl,
        altText: "blogImgUrl",
        caption: <span>{post.category}</span>,
        header: (
          <Link className="text-white" to={`blog/${post.id}`}>
            {post.title}
          </Link>
        ),
        key: post.id
      };
    });
    return (
      <Container>
        <Row>
          <UncontrolledCarousel items={items} />
        </Row>
      </Container>
    );
  }
}

export default BlogCategories;
