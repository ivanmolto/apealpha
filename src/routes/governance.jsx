import { gql, useQuery } from "@apollo/client";

import {
  HandRaisedIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
} from "@heroicons/react/24/outline";
import { BoltIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

function numberWithCommas(rawNumber) {
  return rawNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/** SPACE query to retrieve all the snapshot space info */
const SPACE = gql`
  query getSpace {
    space(id: "apecoin.eth") {
      id
      name
      about
      network
      symbol
      strategies {
        name
        network
        params
      }
      admins
      members
    }
  }
`;

const ACTIVE_PROPOSALS = 3;

const NUMPROPOSALS = gql`
  query getProposals {
    proposals(
      first: 100
      skip: 0
      where: { space_in: ["apecoin.eth"] }
      orderBy: "created"
      orderDirection: desc
    ) {
      id
      state
    }
  }
`;

/** PROPOSALS query to retrieve all the proposals info */
const PROPOSALS = gql`
  query getProposals {
    proposals(
      first: 100
      skip: 0
      where: { space_in: ["apecoin.eth"] }
      orderBy: "created"
      orderDirection: desc
    ) {
      id
      ipfs
      author
      created
      type
      title
      body
      choices
      start
      end
      snapshot
      state
      link
      app
      scores
      scores_by_strategy
      scores_state
      scores_total
      scores_updated
      votes
    }
  }
`;

function Stats() {
  const { loading, error, data } = useQuery(NUMPROPOSALS);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  const aips = data.proposals;
  return (
    <div className="grid grid-cols-1 divide-y divide-gray-200 border-t border-gray-200 bg-gray-50 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
      <div key="1" className="px-6 py-5 text-center text-sm font-medium">
        <span className="text-gray-900">{aips.length}</span>{" "}
        <span className="text-gray-600">proposals</span>
      </div>
      <div key="2" className="px-6 py-5 text-center text-sm font-medium">
        <span className="text-gray-900">{ACTIVE_PROPOSALS}</span>{" "}
        <span className="text-gray-600">active proposals</span>
      </div>
      <div key="3" className="px-6 py-5 text-center text-sm font-medium">
        <span className="text-gray-900">{aips.length - ACTIVE_PROPOSALS}</span>{" "}
        <span className="text-gray-600">closed proposals</span>
      </div>
    </div>
  );
}

function Proposals() {
  const { loading, error, data } = useQuery(PROPOSALS);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  const aips = data.proposals;
  return (
    <>
      <h2 className="mt-4 mb-2 text-lg font-medium leading-6 text-gray-900">
        Proposals
      </h2>
      <ul role="list" className="space-y-4">
        {aips.map((aip) => (
          <li
            key={aip.id}
            className="bg-white px-4 py-6 shadow sm:rounded-lg sm:p-6"
          >
            <article aria-labelledby={"question-title-" + aip.id}>
              <div>
                <div className="flex space-x-3">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={`https://cdn.stamp.fyi/avatar/${aip.author}?s=32`}
                      alt=""
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      <a
                        href={`https://etherscan.io/address/${aip.author}`}
                        className="text-apelight hover:underline"
                        rel="noreferrer"
                        target="_blank"
                      >
                        {aip.author.slice(0, 8) + "..." + aip.author.slice(-8)}
                      </a>
                    </p>
                    <div className="text-sm text-gray-500">
                      {aip.state === "active" && (
                        <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium text-white bg-green-500">
                          active
                        </div>
                      )}
                      {aip.state === "closed" && (
                        <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium text-white bg-red-500">
                          closed
                        </div>
                      )}
                      <div className="mt-2">
                        <span className="inline-flex sm:hidden items-center text-sm">
                          <div className="inline-flex space-x-2 text-gray-500">
                            <CheckCircleIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                            <span className="font-medium text-gray-900">
                              {aip.votes} votes
                            </span>
                            <span className="sr-only">Votes</span>
                          </div>
                        </span>
                      </div>
                      <div className="flex sm:hidden text-sm">
                        <span className="inline-flex items-center text-sm">
                          <a
                            href={aip.link}
                            className="inline-flex space-x-2 text-apelight hover:underline"
                          >
                            <BoltIcon className="h-5 w-5" aria-hidden="true" />
                            <span className="font-medium text-apelight">
                              View on Snapshot
                            </span>
                          </a>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <h2
                  id={"question-title-" + aip.id}
                  className="mt-4 text-base font-medium text-gray-900"
                >
                  {aip.title}
                </h2>
              </div>
              <div
                className="hidden sm:block mt-2 space-y-4 text-sm text-gray-700"
                dangerouslySetInnerHTML={{ __html: aip.body }}
              />
              <div
                className="sm:hidden mt-2 space-y-4 text-sm text-gray-700 truncate"
                dangerouslySetInnerHTML={{ __html: aip.body }}
              />
              <div className="mt-6 flex justify-between space-x-8">
                <div className="flex space-x-6">
                  <span className="inline-flex items-center text-sm">
                    <div className="inline-flex space-x-2 text-gray-500 ">
                      <HandThumbUpIcon className="h-5 w-5" aria-hidden="true" />
                      <span className=" font-medium text-gray-900">
                        {numberWithCommas(Number(aip.scores[0]).toFixed(0))} APE
                      </span>
                      <span className="sr-only">{aip.choices[0]}</span>
                    </div>
                  </span>
                  <span className="inline-flex items-center text-sm">
                    <div className="inline-flex space-x-2 text-gray-500 ">
                      <HandThumbDownIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                      <span className="font-medium text-gray-900">
                        {numberWithCommas(Number(aip.scores[1]).toFixed(0))} APE
                      </span>
                      <span className="sr-only">{aip.choices[1]}</span>
                    </div>
                  </span>
                  <span className="inline-flex items-center text-sm">
                    <div className="inline-flex space-x-2 text-gray-500">
                      {aip.choices[2] && (
                        <HandRaisedIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      )}
                      <span className="font-medium text-gray-900">
                        {(!isNaN(aip.scores[2]) &&
                          numberWithCommas(Number(aip.scores[2]).toFixed(0))) ||
                          null}{" "}
                        {!isNaN(aip.scores[2]) && "APE"}
                      </span>
                      <span className="sr-only">{aip.choices[2] || null}</span>
                    </div>
                  </span>
                  <span className="hidden sm:inline-flex items-center text-sm">
                    <div className="inline-flex space-x-2 text-gray-500">
                      <CheckCircleIcon className="h-5 w-5" aria-hidden="true" />
                      <span className="font-medium text-gray-900">
                        {aip.votes} votes
                      </span>
                      <span className="sr-only">Votes</span>
                    </div>
                  </span>
                </div>
                <div className="hidden sm:flex text-sm">
                  <span className="inline-flex items-center text-sm">
                    <a
                      href={aip.link}
                      className="inline-flex space-x-2 text-apelight hover:underline"
                    >
                      <BoltIcon className="h-5 w-5" aria-hidden="true" />
                      <span className="font-medium text-apelight">
                        View on Snapshot
                      </span>
                    </a>
                  </span>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </>
  );
}

const Governance = () => {
  const { loading, error, data } = useQuery(SPACE);
  if (loading)
    return (
      <>
        <div className="font-montserrat">
          <div className="flex justify-end max-w-6xl mx-auto mt-0 px-4 text-sm leading-6 font-normal text-gray-900 sm:px-6 lg:px-8">
            ApeCoin DAO
          </div>
          <main className="flex-1 flex-col pb-8">
            <div className="-mt-3">
              <div className="flex-1 px-4 flex-col justify-between sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
                <div className="space-y-8 divide-y divide-gray-200">
                  <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                    <div className="space-y-6 sm:space-y-5">
                      <div>
                        <h1 className="mb-8 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:leading-9">
                          Governance
                        </h1>
                        <div className="min-h-full">
                          <main className="mt-4 pb-8">Loading...</main>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </>
    );
  if (error)
    return (
      <>
        <div className="font-montserrat">
          <div className="flex justify-end max-w-6xl mx-auto mt-0 px-4 text-sm leading-6 font-normal text-gray-900 sm:px-6 lg:px-8">
            ApeCoin DAO
          </div>
          <main className="flex-1 flex-col pb-8">
            <div className="-mt-3">
              <div className="flex-1 px-4 flex-col justify-between sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
                <div className="space-y-8 divide-y divide-gray-200">
                  <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                    <div className="space-y-6 sm:space-y-5">
                      <div>
                        <h1 className="mb-8 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:leading-9">
                          Governance
                        </h1>
                        <div className="min-h-full">
                          <main className="mt-4 pb-8">{`Error! ${error.message}`}</main>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </>
    );
  const snap = data.space;
  return (
    <>
      <div className="font-montserrat">
        <div className="flex justify-end max-w-6xl mx-auto mt-0 px-4 text-sm leading-6 font-normal text-gray-900 sm:px-6 lg:px-8">
          ApeCoin DAO
        </div>
        <main className="flex-1 flex-col pb-8">
          <div className="-mt-3">
            <div className="flex-1 px-4 flex-col justify-between sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
              <div className="space-y-8 divide-y divide-gray-200">
                <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                  <div className="space-y-6 sm:space-y-5">
                    <div>
                      <h1 className="mb-8 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:leading-9">
                        Governance
                      </h1>
                      <div className="min-h-full">
                        <main className="mt-4 pb-8">
                          <div>
                            <h1 className="sr-only">Profile</h1>
                            {/* Main 3 column grid */}
                            <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
                              {/* Left column */}
                              <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                                {/* Welcome panel */}
                                <section aria-labelledby="profile-overview-title">
                                  <div className="overflow-hidden rounded-lg bg-white shadow">
                                    <h2
                                      className="sr-only"
                                      id="profile-overview-title"
                                    >
                                      Profile Overview
                                    </h2>
                                    <div className="bg-white p-6">
                                      <div className="sm:flex sm:items-center sm:justify-between">
                                        <div className="sm:flex sm:space-x-5">
                                          <div className="flex-shrink-0">
                                            <img
                                              className="mx-auto h-20 w-20 rounded-full"
                                              src="https://ivanmolto.mypinata.cloud/ipfs/QmcpGcaGf9fCh1sW8KvR8XhJmrMXpU86tEwZzKXibKfbHy?_gl=1*1qocd19*_ga*ODhhNzU4NWEtNGMwZS00ODExLWE2YmQtZGE4ZDZjYmU4N2I0*_ga_5RMPXG14TE*MTY3OTU1Njk0Ni41My4wLjE2Nzk1NTY5OTIuMTQuMC4w"
                                              alt=""
                                            />
                                          </div>
                                          <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                                            <p className="text-sm font-medium text-gray-600">
                                              Welcome to {snap.name} Governance
                                              overview
                                            </p>
                                            <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                                              {snap.id}
                                            </p>
                                            <p className="text-sm font-medium text-gray-600">
                                              APE Improvement Proposals post in
                                              batches <br />
                                              on Thursdays at 9PM ET for voting.
                                            </p>
                                            <p className="text-sm font-medium text-gray-600">
                                              Voting closes the following
                                              Wednesday, 9PM ET.
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <Stats />
                                  </div>
                                </section>
                                {/* Proposals panel */}
                                <section aria-labelledby="quick-links-title">
                                  <div className="mt-4">
                                    <h1 className="sr-only">Proposals</h1>
                                    <Proposals />
                                  </div>
                                </section>
                              </div>
                              {/* Right column */}
                              <div className="grid grid-cols-1 gap-4">
                                {/* Members */}
                                <section aria-labelledby="recent-hires-title">
                                  <div className="font-montserrat overflow-hidden rounded-lg bg-white shadow">
                                    <div className="p-6">
                                      <h2
                                        className="text-base font-medium text-gray-900"
                                        id="recent-hires-title"
                                      >
                                        Members
                                      </h2>
                                      <div className="mt-6 flow-root">
                                        <ul
                                          role="list"
                                          className="-my-5 divide-y divide-gray-200"
                                        >
                                          {snap.admins.map((admin) => (
                                            <li key={admin} className="py-4">
                                              <div className="flex items-center space-x-4">
                                                <div className="flex-shrink-0">
                                                  <img
                                                    className="h-8 w-8 rounded-full"
                                                    src={`https://cdn.stamp.fyi/avatar/${admin}?s=32`}
                                                    alt="{admin}"
                                                  />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                  <a
                                                    href={`https://etherscan.io/address/${admin}`}
                                                    rel="noreferrer"
                                                    target="_blank"
                                                  >
                                                    <div className="truncate text-sm font-medium text-apelight hover:underline">
                                                      {admin.slice(0, 8) +
                                                        "..." +
                                                        admin.slice(-8)}
                                                    </div>
                                                  </a>
                                                </div>
                                                <div>
                                                  <div className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 bg-gray-50">
                                                    admin
                                                  </div>
                                                </div>
                                              </div>
                                            </li>
                                          ))}
                                          {snap.members.map((member) => (
                                            <li key={member} className="py-4">
                                              <div className="flex items-center space-x-4">
                                                <div className="flex-shrink-0">
                                                  <img
                                                    className="h-8 w-8 rounded-full"
                                                    src={`https://cdn.stamp.fyi/avatar/${member}?s=32`}
                                                    alt="{member}"
                                                  />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                  <a
                                                    href={`https://etherscan.io/address/${member}`}
                                                    rel="noreferrer"
                                                    target="_blank"
                                                  >
                                                    <div className="truncate text-sm font-medium text-apelight hover:underline">
                                                      {member.slice(0, 8) +
                                                        "..." +
                                                        member.slice(-8)}
                                                    </div>
                                                  </a>
                                                </div>
                                                <div>
                                                  <div className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 bg-gray-50">
                                                    author
                                                  </div>
                                                </div>
                                              </div>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </section>
                                {/* Strategies */}
                                <section aria-labelledby="strategies-title">
                                  <div className="overflow-hidden rounded-lg bg-white shadow">
                                    <div className="p-6">
                                      <h2
                                        className="text-base font-medium text-gray-900"
                                        id="strategies-title"
                                      >
                                        Strategies
                                      </h2>
                                      <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                        Voting power is cumulative
                                      </p>
                                      <div className="mt-6 flow-root">
                                        <ul
                                          role="list"
                                          className="-my-5 divide-y divide-gray-200"
                                        >
                                          {snap.strategies.map(
                                            (strategy, index) => (
                                              <li key={index} className="py-5">
                                                <div className="relative">
                                                  <h3 className="text-sm font-semibold text-gray-800">
                                                    {strategy.name}
                                                  </h3>
                                                  <p className=" mt-1 text-sm text-gray-600 line-clamp-2">
                                                    {strategy.params.symbol}
                                                  </p>
                                                  <div className="truncate">
                                                    <a
                                                      href={`https://etherscan.io/address/${strategy.params.address}`}
                                                      className="text-sm text-apelight hover:underline focus:outline-none"
                                                      rel="noreferrer"
                                                      target="_blank"
                                                    >
                                                      {strategy.params.address}
                                                    </a>
                                                  </div>
                                                </div>
                                              </li>
                                            )
                                          )}
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </section>
                              </div>
                            </div>
                          </div>
                        </main>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Governance;
