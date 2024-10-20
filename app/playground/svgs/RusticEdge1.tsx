import React from "react";

function RusticEdge1({ color = "#000", className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
      className={className}>
      <path
        fill={color}
        fill-opacity="1"
        d="M0,32L120,80C240,128,480,224,720,224C960,224,1200,128,1320,80L1440,32L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"></path>
    </svg>
  );
}

export default RusticEdge1;
