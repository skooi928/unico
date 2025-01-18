import PageNotFoundImage from "../assets/PageNotFoundImage.png";
import { Link } from "react-router-dom";
import "./PageNotFound.css";

export const PageNotFound = () => {
  return (
    <main className="page-not-found-main">
      <section className="page-not-found-section">
        <div className="error-content">
          <h1 className="error-title">404, Oops!</h1>
          <p className="error-message">
            We can't seem to find the page you're looking for.
          </p>
        </div>
        <div className="error-image-container">
          <img
            className="error-image"
            src={PageNotFoundImage}
            alt="404 Page Not Found!"
            width={800}
            height={800}
          />
        </div>
        <div className="home-button-container">
          <Link to="/">
            <button className="home-button">Back To Home</button>
          </Link>
        </div>
      </section>
    </main>
  );
};
