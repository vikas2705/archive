import React from "react";
import { Link } from "react-router-dom";

const SignedOut = (props) => {
  return (
    <div className="container">
      <div className="d-flex justify-content-md-center align-items-center vh-100">
        <div>
          <h3>You have been successfully logged out</h3>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Link to="/signin" style={{ color: '#ff4081' }}>Back to Login</Link>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignedOut;
