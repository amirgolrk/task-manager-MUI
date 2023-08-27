//import React from 'react';
import { Link } from 'react-router-dom';
import "./ErrorPage.scss"

function ErrorPage() {
  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h1>404</h1>
        </div>
        <h2>We are sorry, Page not found!</h2>
        <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
        <Link to={""}><a>Back To Homepage</a></Link>
      </div>
    </div>
  );
}

export default ErrorPage;
