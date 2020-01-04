import React from "react";

export default function NotFound(props) {
  const { errorMessage } = props;

  return (
    <div className="masthead error segment">
      <div className="container">
        {errorMessage ? <h1>{errorMessage}</h1> : <h1>Page Not Found</h1>}
      </div>
    </div>
  );
}
