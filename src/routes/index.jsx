const Index = () => {
  return (
    <>
      <main className="font-montserrat mt-16 mx-auto max-w-7xl px-4 sm:mt-24">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block xl:inline">Smart data for</span>{" "}
            <span className="block text-apelight xl:inline">
              insightful Apes
            </span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Unleashing Governance and Financial Alpha on ApeCoin
          </p>
          <div className="mt-12 max-w-sm mx-auto grid grid-cols-1 gap-y-10 gap-x-8 sm:max-w-none lg:grid-cols-3">
            <div
              key="Free Alpha"
              className="text-center sm:flex sm:text-left lg:block lg:text-center"
            >
              <div className="sm:flex-shrink-0">
                <div className="flow-root">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 mx-auto"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="0.75"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-6 lg:mt-6 lg:ml-0">
                <h3 className="text-sm font-medium text-gray-900">
                  Permanently open and free
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Free ApeCoin ecosystem data.
                  <br />
                  Open and made easy.
                </p>
              </div>
            </div>
            <div
              key="Surface wallets"
              className="text-center sm:flex sm:text-left lg:block lg:text-center"
            >
              <div className="sm:flex-shrink-0">
                <div className="flow-root">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 mx-auto"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="0.75"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-6 lg:mt-6 lg:ml-0">
                <h3 className="text-sm font-medium text-gray-900">
                  Surface finance
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Go down to the rabbit hole! <br />
                  Profile the ApeCoin token, and wallets.
                </p>
              </div>
            </div>
            <div
              key="Always-on"
              className="text-center sm:flex sm:text-left lg:block lg:text-center"
            >
              <div className="sm:flex-shrink-0">
                <div className="flow-root">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 mx-auto"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="0.75"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                </div>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-6 lg:mt-6 lg:ml-0">
                <h3 className="text-sm font-medium text-gray-900">
                  Governance transparency
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Discover opportunities.
                  <br />
                  Perform due diligence on ApeCoin DAO.
                </p>
              </div>
            </div>
          </div>
          <h2 className="mt-8 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Ready to dive in?</span>
          </h2>
        </div>
      </main>
    </>
  );
};

export default Index;
