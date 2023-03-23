import { useQuery } from "@tanstack/react-query";

function getBalance(account) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "X-API-Key": import.meta.env.VITE_MORALIS_API_KEY,
    },
  };
  return fetch(
    `https://deep-index.moralis.io/api/v2/${account}/erc20?chain=eth&token_addresses%5B0%5D=0x4d224452801ACEd8B2F0aebE155379bb5D594381`,
    options
  ).then((response) => response.json());
}

function Balance({ account }) {
  const balanceQuery = useQuery({
    queryKey: ["balance", account],
    queryFn: () => getBalance(account),
  });

  if (balanceQuery.isLoading) return <div>isLoading</div>;
  if (balanceQuery.isError) return <div>{`Error! ${error.message}`}</div>;
  if (balanceQuery.data === null || balanceQuery.data.length === 0)
    return <div>0 APE</div>;
  return <>{numberWithCommas(balanceQuery.data[0].balance / 10 ** 18)} APE</>;
}

function getNativeBalance(account) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "X-API-Key": import.meta.env.VITE_MORALIS_API_KEY,
    },
  };
  return fetch(
    `https://deep-index.moralis.io/api/v2/${account}/balance?chain=eth`,
    options
  ).then((response) => response.json());
}

function NativeBalance({ account }) {
  const nativeBalanceQuery = useQuery({
    queryKey: ["nativeBalance", account],
    queryFn: () => getNativeBalance(account),
  });

  if (nativeBalanceQuery.isLoading) return <div>isLoading</div>;
  if (nativeBalanceQuery.isError) return <div>{`Error! ${error.message}`}</div>;
  if (nativeBalanceQuery.data === null || nativeBalanceQuery.data.length === 0)
    return <div>0 ETH</div>;
  console.log(nativeBalanceQuery.data.balance);
  return <>{nativeBalanceQuery.data.balance / 10 ** 18} ETH</>;
}

function numberWithCommas(rawNumber) {
  return rawNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Overview = ({ account }) => {
  return (
    <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <div
        key="walletIndex"
        className="mt-8 overflow-hidden rounded-lg bg-white shadow"
      >
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                className="hidden h-32 w-32 rounded-full sm:block"
                src={`https://cdn.stamp.fyi/avatar/${account}?s=32`}
                alt={account}
              />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="truncate text-sm font-medium text-gray-500">
                  Wallet address
                </dt>
                <dd>
                  <div className="truncate text-md font-medium text-gray-900">
                    <a
                      href={`https://etherscan.io/address/${account}`}
                      className="text-apelight hover:underline"
                      rel="noreferrer"
                      target="_blank"
                    >
                      {account.slice(0, 8) + "..." + account.slice(-8)}
                    </a>
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
      <div
        key="apeBalance"
        className="mt-8 overflow-hidden rounded-lg bg-white shadow"
      >
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                className="hidden h-32 w-32 rounded-full sm:block"
                src="https://ivanmolto.mypinata.cloud/ipfs/QmQPRPBHDRhDK81B7woTKm8poNAJrbswzc1kXtWQuE9U84?_gl=1*vmwdxl*_ga*ODhhNzU4NWEtNGMwZS00ODExLWE2YmQtZGE4ZDZjYmU4N2I0*_ga_5RMPXG14TE*MTY3OTUwNDE4OS41MC4xLjE2Nzk1MDQyMzUuMTQuMC4w"
                alt="apecoin"
              />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="truncate text-sm font-medium text-gray-500">
                  APE balance
                </dt>
                <dd>
                  <div className="text-md font-medium text-gray-900">
                    <Balance account={account} />
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
      <div
        key="ethBalance"
        className="mt-8 overflow-hidden rounded-lg bg-white shadow"
      >
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                className="hidden h-32 w-32 rounded-full sm:block"
                src="https://ivanmolto.mypinata.cloud/ipfs/QmbzgaAHkpKHvz3oz9PS8PF2YnbCRoxbjkcnRsMqGtaxmD?_gl=1*iq8gdq*_ga*ODhhNzU4NWEtNGMwZS00ODExLWE2YmQtZGE4ZDZjYmU4N2I0*_ga_5RMPXG14TE*MTY3OTUwNDE4OS41MC4xLjE2Nzk1MDQyMzUuMTQuMC4w"
                alt="apecoin"
              />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="truncate text-sm font-medium text-gray-500">
                  ETH balance
                </dt>
                <dd>
                  <div className="text-md font-medium text-gray-900">
                    <NativeBalance account={account} />
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
