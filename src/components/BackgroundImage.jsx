import React from "react";

const BackgroundImage = ({ children }) => {
  return (
    <div
      className="container position-relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1639056496887-3caaa605609b?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "50vh",
        borderRadius: "10px",
      }}
    >
      {children}
    </div>
  );
};

export default BackgroundImage;
