import PageNotFoundImage from "../assets/PageNotFoundImage.png";
import { Link } from "react-router-dom";

export const PageNotFound = () => {
  return (
    <main className="max-w-screen-xl min-h-screen flex items-center justify-center pt-20">
      <section className="flex flex-col items-center justify-center text-center px-4 md:px-10">
        <div className="my-6 text-center"> 
          <h1 className="text-4xl font-extrabold text-gray-800 md:text-6xl mb-4">
            404, Oops!
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            We can't seem to find the page you're looking for.
          </p>
        </div>
        <div className="my-6 flex items-center justify-center">
          <img
            className="rounded-lg shadow-lg"
            src={PageNotFoundImage}
            alt="404 Page Not Found!"
            width={800}
            height={800}
          />
        </div>
        <div className="mt-6 pb-8">
          <Link to="/">
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
              Back To Home
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
};