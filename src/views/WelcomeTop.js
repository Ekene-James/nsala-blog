import React from "react";
import { Container } from "reactstrap";
import "./welcomeTop.css";

function WelcomeTop() {
  return (
    <Container
      fluid
      style={{
        backgroundColor: "#8e44ad",
        height: "200px",
        textAlign: "center",
        paddingBottom: "10px",
        paddingTop: "40px"
      }}
    >
      <h1 className="text-white caption">Welcome to Nsala Blog</h1>
    </Container>
  );
}

export default WelcomeTop;
