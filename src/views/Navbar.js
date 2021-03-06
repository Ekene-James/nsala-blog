import React from "react";

import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  InputGroup,
  InputGroupAddon,
  Button,
  Collapse
} from "reactstrap";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import "./navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser, faSearch } from "@fortawesome/free-solid-svg-icons";

import { getCategory, getSearch } from "../redux/actions/otherBlogPostActions";

class MainNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.toggleNavbar = this.toggleNavbar.bind(this);

    this.state = {
      dropdownOpen: false,
      collapseOpen: false,
      search: ""
    };
  }

  toggleDropdown() {
    this.setState({
      ...this.state,
      ...{
        dropdownOpen: !this.state.dropdownOpen
      }
    });
  }

  toggleNavbar() {
    this.setState({
      ...this.state,
      ...{
        collapseOpen: !this.state.collapseOpen
      }
    });
  }
  onClick = category => {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
    this.props.getCategory(category, this.props.history);
    if (this.state.collapseOpen) {
      this.setState({
        ...this.state,
        collapseOpen: !this.state.collapseOpen
      });
    }
  };
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onSearch = e => {
    e.preventDefault();
    this.props.getSearch(this.state.search, this.props.history);
    if (this.state.collapseOpen) {
      this.setState({
        ...this.state,
        search: "",
        collapseOpen: !this.state.collapseOpen
      });
    } else {
      this.setState({
        ...this.state,
        search: ""
      });
    }
  };
  toggleHome = () => {
    if (this.state.collapseOpen) {
      this.setState({
        ...this.state,
        collapseOpen: !this.state.collapseOpen
      });
    }
    return;
  };

  render() {
    return (
      <Navbar full sticky={"top"} dark color="dark" expand="md">
        <NavbarBrand className="text-white">Nsala Blog</NavbarBrand>
        <NavbarToggler onClick={this.toggleNavbar} />

        <Collapse isOpen={this.state.collapseOpen} navbar>
          <Nav navbar>
            <NavItem onClick={this.toggleHome}>
              <Link active to="/">
                <NavLink>
                  <FontAwesomeIcon icon={faHome} /> Home
                </NavLink>
              </Link>
            </NavItem>

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Categories
              </DropdownToggle>

              <DropdownMenu right>
                <DropdownItem onClick={this.onClick.bind(this, "Tech")}>
                  Tech
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={this.onClick.bind(this, "LifeStyle")}>
                  LifeStyle
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={this.onClick.bind(this, "Food")}>
                  Food
                </DropdownItem>
                <DropdownItem onClick={this.onClick.bind(this, "Fantasy")}>
                  Fantasy
                </DropdownItem>
                <DropdownItem onClick={this.onClick.bind(this, "Sports")}>
                  Sports
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={this.onClick.bind(this, "Others")}>
                  Others
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>

          <Nav navbar className="ml-auto">
            <form onSubmit={this.onSearch}>
              <InputGroup>
                <input
                  type="text"
                  className="form-control border-0"
                  placeholder="Search..."
                  name="search"
                  value={this.state.search}
                  onChange={this.onChange}
                  required
                />

                <InputGroupAddon addonType="append">
                  <Button onClick={this.onSubmit}>
                    <FontAwesomeIcon icon={faSearch} /> Search
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </form>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default connect(null, { getCategory, getSearch })(
  withRouter(MainNavbar)
);
