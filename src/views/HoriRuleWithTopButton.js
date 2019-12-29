import React from "react";
import { Badge } from "reactstrap";

function HoriRuleWithTopButton({ buttonText }) {
  return (
    <div>
      <Badge
        style={{
          backgroundColor: "#9b59b6",
          marginTop: "7px",
          marginBottom: "0px",

          borderColor: "#9b59b6"
        }}
      >
        {buttonText}
      </Badge>

      <hr
        style={{
          backgroundColor: "#8e44ad",
          margin: "0px",
          padding: "0px",
          marginBottom: "7px"
        }}
      />
    </div>
  );
}

export default HoriRuleWithTopButton;
