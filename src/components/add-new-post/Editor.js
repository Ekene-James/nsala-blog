import React from "react";

import {
  Card,
  CardBody,
  Form,
  FormInput,
  Button,
  Col,
  CardHeader,
  FormSelect
} from "reactstrap";
import { connect } from "react-redux";

import { postBlog } from "../../redux/actions/blogPostActions";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import "./quill.css";
import { modules } from "./quill";

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      text: "",
      category: "",
      file: "",
      separate: []
    };
  }
  handleImageChange = e => {
    e.preventDefault();
    if (e.target.files[0]) {
      const file = e.target.files[0];
      this.setState({
        file
      });
    }
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onTextChange = value => {
    this.setState({
      text: value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    // this.props.addBlogPost(this.state);

    this.props.postBlog(this.state);
  };

  render() {
    const { title } = this.state;

    return (
      <Col>
        <Col>
          <form className="m-4">
            <strong className="d-block">upload this blog post cover img</strong>
            <input type="file" onChange={this.handleImageChange} />
          </form>
        </Col>
        <Card small className="mb-3">
          <CardHeader className="border-bottom">
            <h6 className="m-0">category</h6>
          </CardHeader>
          <CardBody className="p-0">
            <FormSelect
              onChange={this.onChange}
              name="category"
              size="lg"
              className="mb-2"
            >
              <option value="0">--Select--</option>
              <option value="Tech">Tech</option>
              <option value="LifeStyle">LifeStyle</option>
              <option value="Food">Food</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Sports">Sports</option>
              <option value="Others">Others</option>
            </FormSelect>
          </CardBody>
        </Card>

        <Card small className="mb-3">
          <CardBody>
            <Form className="add-new-post" onSubmit={this.onSubmit}>
              <FormInput
                size="lg"
                className="mb-3"
                placeholder="Your Post Title"
                name="title"
                value={title}
                onChange={this.onChange}
              />
              <ReactQuill
                className="add-new-post__editor"
                modules={modules}
                onChange={this.onTextChange}
                theme={"snow"}
              />

              <Button theme="accent" size="sm" className="ml-auto">
                <i className="material-icons">file_copy</i> Publish
              </Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default connect(
  null,
  { postBlog }
)(Edit);
