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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export class Paginate extends Component {
  onNext = () => {
    const { catName, catTrue } = this.props;
    if (catTrue) {
      console.log("clicked on nextCat");
      this.props.nextCategory(catName);
      this.props.addCounter();
      window.scroll({ top: 0, left: 0, behavior: "smooth" });
    }
    this.props.nextQuery();
    this.props.addCounter();
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  };
  onPrevious = () => {
    const { catName, catTrue } = this.props;
    if (catTrue) {
      this.props.reduceCounter();

      this.props.previousCategory(catName);
      window.scroll({ top: 0, left: 0, behavior: "smooth" });
    }
    this.props.reduceCounter();
    this.props.previousQuery();
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  };

  render() {
    const { blogTotal, counter, Buttonloading } = this.props;

    const a = blogTotal / 3;
    const arithematics = Math.ceil(a);

    return (
      <ButtonGroup>
        {counter === 0 || Buttonloading ? (
          <Button color="secondary" disabled>
            <FontAwesomeIcon icon={faArrowLeft} />
            {"   "}
            Previous
          </Button>
        ) : (
          <Button onClick={this.onPrevious} color="secondary">
            <FontAwesomeIcon icon={faArrowLeft} />
            {"   "}
            Previous
          </Button>
        )}
        {counter + 1 === arithematics || Buttonloading ? (
          <Button color="primary" disabled>
            Next {"   "}
            <FontAwesomeIcon icon={faArrowRight} />
          </Button>
        ) : (
          <Button onClick={this.onNext} color="primary">
            Next {"   "}
            <FontAwesomeIcon icon={faArrowRight} />
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
