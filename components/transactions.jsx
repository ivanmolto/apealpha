import { useQuery } from "@tanstack/react-query";
import { BanknotesIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

function getTransactions(account) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "X-API-Key": import.meta.env.VITE_MORALIS_API_KEY,
    },
  };

  return fetch(
    `https://deep-index.moralis.io/api/v2/${account}?chain=eth&include=internal_transactions`,
    options
  ).then((response) => response.json());
}

function Activity({ account }) {
  console.log(account);
  const activityQuery = useQuery({
    queryKey: ["activity", account],
    queryFn: () => getTransactions(account),
  });

  if (activityQuery.isLoading)
    return (
      <div className="mx-auto mt-8 max-w-6xl px-4 text-base font-normal leading-6 text-gray-900 sm:px-6 lg:px-8">
        Loading recent activity...
      </div>
    );
  if (activityQuery.isError)
    return (
      <div className="mx-auto mt-8 max-w-6xl px-4 text-base font-normal leading-6 text-gray-900 sm:px-6 lg:px-8">
        {`Error! ${error.message}`}
      </div>
    );
  if (
    activityQuery.data.result.length === 0 ||
    activityQuery.data === null ||
    activityQuery.data.length === 0
  )
    return null;
  console.log(activityQuery.data);
  const transactions = activityQuery.data.result;
  return (
    <>
      <h2 className="mx-auto mt-8 max-w-6xl px-4 text-lg font-medium leading-6 text-gray-900 sm:px-6 lg:px-8">
        Recent activity
      </h2>

      {/* Activity list (smallest breakpoint only) */}
      <div className="shadow sm:hidden">
        <ul
          role="list"
          className="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden"
        >
          {transactions.map((transaction) => (
            <li key={transaction.hash}>
              <a href="/" className="block bg-white px-4 py-4 hover:bg-gray-50">
                <span className="flex items-center space-x-4">
                  <span className="flex flex-1 space-x-2 truncate">
                    <BanknotesIcon
                      className="h-5 w-5 flex-shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                    <span className="flex flex-col truncate text-sm text-gray-500">
                      <span className="truncate">{transaction.hash}</span>
                      <span>
                        <span className="font-medium text-gray-900">
                          {transaction.value}
                        </span>{" "}
                        USD
                      </span>
                      <time dateTime={transaction.block_timestamp}>
                        {transaction.block_timestamp}
                      </time>
                    </span>
                  </span>
                  <ChevronRightIcon
                    className="h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </a>
            </li>
          ))}
        </ul>

        <nav
          className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3"
          aria-label="Pagination"
        ></nav>
      </div>

      {/* Activity table (small breakpoint and up) */}
      <div className="hidden sm:block">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mt-2 flex flex-col">
            <div className="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th
                      className="bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                      scope="col"
                    >
                      Transaction
                    </th>
                    <th
                      className="bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                      scope="col"
                    >
                      From
                    </th>
                    <th
                      className="bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                      scope="col"
                    >
                      To
                    </th>
                    <th
                      className="hidden bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900 md:block"
                      scope="col"
                    >
                      Amount
                    </th>
                    <th
                      className="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900"
                      scope="col"
                    >
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {transactions.map((transaction) => (
                    <tr key={transaction.hash} className="bg-white">
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                        <div className="flex">
                          <a
                            href={`https://etherscan.io/tx/${transaction.hash}`}
                            rel="noreferrer"
                            target="_blank"
                            className="hover:underline space-x-2 truncate text-sm"
                          >
                            <p className="text-apelight truncate group-hover:text-gray-900">
                              {transaction.hash.slice(0, 15) + "..."}
                            </p>
                          </a>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-left text-sm text-gray-500">
                        <a
                          href={`https://etherscan.io/address/${transaction.from_address}`}
                          rel="noreferrer"
                          target="_blank"
                          className="text-apelight hover:underline"
                        >
                          {transaction.from_address.slice(0, 6)}
                          {"..."}
                          {transaction.from_address.slice(-4)}
                        </a>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-left text-sm text-gray-500">
                        <a
                          href={`https://etherscan.io/address/${transaction.to_address}`}
                          rel="noreferrer"
                          target="_blank"
                          className="text-apelight hover:underline"
                        >
                          {transaction.to_address.slice(0, 6)}
                          {"..."}
                          {transaction.to_address.slice(-4)}
                        </a>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                        <span className="font-medium text-gray-900">
                          {transaction.value / 10 ** 18}
                        </span>{" "}
                        ETH
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                        <time dateTime={transaction.datetime}>
                          {transaction.block_timestamp.slice(0, 10)}
                        </time>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Pagination */}
              <nav
                className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
                aria-label="Pagination"
              >
                <div className="hidden sm:block">
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">1</span> to{" "}
                    <span className="font-medium">
                      {activityQuery.data.result.length}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium">
                      {activityQuery.data.result.length}
                    </span>{" "}
                    results
                  </p>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const statusStyles = {
  success: "bg-green-100 text-green-800",
  processing: "bg-yellow-100 text-yellow-800",
  failed: "bg-gray-100 text-gray-800",
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Transactions = ({ account }) => {
  return (
    <>
      <Activity account={account} />
    </>
  );
};

export default Transactions;
