import { useRouteError } from "react-router-dom";
const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);
  return (
    <div className="min-h-full px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
      <div className="max-w-max mx-auto">
        <main className="sm:flex">
          <p className="text-4xl font-extrabold text-apelight sm:text-5xl font-montserrat">
            Oops
          </p>
          <div className="sm:ml-6">
            <div className="sm:border-l sm:border-gray-200 sm:pl-6">
              <h1 className="text-4xl font-extrabold text-apelight tracking-tight sm:text-5xl font-montserrat">
                Error found
              </h1>
              <p className="mt-1 text-base text-gray-900 font-montserrat">
                Sorry, an unexpected error has occurred
              </p>
              <p className="mt-1 text-base text-gray-900 font-montserrat">
                <i>
                  {" "}
                  {"CoinGecko API is down" ||
                    error.statusText ||
                    error.message}{" "}
                </i>
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ErrorPage;
