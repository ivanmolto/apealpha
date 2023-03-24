import { Link } from "react-router-dom";
import { ArrowCircleLeftIcon } from "@heroicons/react/24/outline";

const NoMatch = () => {
  return (
    <div className="min-h-full px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
      <div className="max-w-max mx-auto">
        <main className="sm:flex">
          <p className="text-4xl font-extrabold text-apelight sm:text-5xl font-montserrat">
            404
          </p>
          <div className="sm:ml-6">
            <div className="sm:border-l sm:border-gray-200 sm:pl-6">
              <h1 className="text-4xl font-extrabold text-apelight tracking-tight sm:text-5xl font-montserrat">
                Page not found
              </h1>
              <p className="mt-1 text-base text-gray-900 font-montserrat">
                Please check the URL in the address bar and try again.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NoMatch;
