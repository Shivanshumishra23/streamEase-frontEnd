import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <div>
        <h1> 404 Not found </h1>
        <div>
          <Link to="/">Return To home</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
