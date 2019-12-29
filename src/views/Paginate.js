import React, { Component } from "react";
import { ButtonGroup, Button } from "reactstrap";
import { connect } from "react-redux";
import {
  nextQuery,
  previousQuery,
  addCounter,
  reduceCounter
} from "../redux/actions/blogPostActions";
import {
  nextCategory,
  previousCategory
} from "../redux/actions/otherBlogPostActions";
import {
  selectCounter,
  selectButtonloading
} from "../utils/reselectFuncs/blogReselectFunc";

export class Paginate extends Component {
  onNext = () => {
    const { catName, catTrue } = this.props;
    if (catTrue) {
      console.log("clicked on nextCat");
      this.props.nextCategory(catName);
      this.props.addCounter();
    }
    this.props.nextQuery();
    this.props.addCounter();
  };
  onPrevious = () => {
    const { catName, catTrue } = this.props;
    if (catTrue) {
      this.props.reduceCounter();

      this.props.previousCategory(catName);
    }
    this.props.reduceCounter();
    this.props.previousQuery();
  };

  render() {
    const { blogTotal, counter, Buttonloading } = this.props;

    const a = blogTotal / 3;
    const arithematics = Math.ceil(a);

    return (
      <ButtonGroup>
        {counter === 0 || Buttonloading ? (
          <Button theme="primary" disabled>
            Previous{" "}
          </Button>
        ) : (
          <Button onClick={this.onPrevious} theme="primary">
            Previous{" "}
          </Button>
        )}
        {counter + 1 === arithematics || Buttonloading ? (
          <Button theme="secondary" disabled>
            Next
          </Button>
        ) : (
          <Button onClick={this.onNext} theme="secondary">
            Next
          </Button>
        )}
      </ButtonGroup>
    );
  }
}
const mapStateToProps = state => ({
  counter: selectCounter(state),
  Buttonloading: selectButtonloading(state)
});
export default connect(
  mapStateToProps,
  {
    nextQuery,
    previousQuery,
    nextCategory,
    previousCategory,
    addCounter,
    reduceCounter
  }
)(Paginate);
