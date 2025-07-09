import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col">
      404 NOT FOUND
      <Link to="/">Home from Link</Link>
      <a href="/">Home from A</a>
    </div>
  );
};

export default NotFoundPage;
