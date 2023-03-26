import { useQuery } from "@tanstack/react-query";
import { Contract, utils } from "ethers";
import { useCall, useEthers } from "@usedapp/core";
import { contractabi } from "../util/contractabi";

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

  if (balanceQuery.isLoading) return <div>Loading...</div>;
  if (balanceQuery.isError) return <div>{`Error! ${error.message}`}</div>;
  if (balanceQuery.data === null || balanceQuery.data.length === 0)
    return <div>0 APE</div>;
  return (
    <>
      {numberWithCommas(
        Number(balanceQuery.data[0].balance / 10 ** 18).toFixed(0)
      )}{" "}
      APE
    </>
  );
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

  if (nativeBalanceQuery.isLoading) return <div>Loading...</div>;
  if (nativeBalanceQuery.isError) return <div>{`Error! ${error.message}`}</div>;
  if (nativeBalanceQuery.data === null || nativeBalanceQuery.data.length === 0)
    return <div>0 ETH</div>;
  return <>{nativeBalanceQuery.data.balance / 10 ** 18} ETH</>;
}

function numberWithCommas(rawNumber) {
  return rawNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Staking = () => {
  const { chainId } = useEthers();
  const apeStakingAbi = contractabi;
  const apeStakingAddress = "0x5954aB967Bc958940b7EB73ee84797Dc8a2AFbb9";

  const apeStakingContract =
    chainId && new Contract(apeStakingAddress, apeStakingAbi);

  const poolApe = useCall(
    apeStakingAddress &&
      apeStakingContract && {
        contract: apeStakingContract,
        method: "pools",
        args: [0],
      }
  );

  const poolBayc = useCall(
    apeStakingAddress &&
      apeStakingContract && {
        contract: apeStakingContract,
        method: "pools",
        args: [1],
      }
  );

  const poolMayc = useCall(
    apeStakingAddress &&
      apeStakingContract && {
        contract: apeStakingContract,
        method: "pools",
        args: [2],
      }
  );

  const poolBakc = useCall(
    apeStakingAddress &&
      apeStakingContract && {
        contract: apeStakingContract,
        method: "pools",
        args: [3],
      }
  );

  return (
    <>
      <div className="font-montserrat">
        <div className="flex justify-end max-w-6xl mx-auto mt-0 px-4 text-sm leading-6 font-normal text-gray-900 sm:px-6 lg:px-8">
          APE Staking
        </div>
        <div className="flex-1 flex-col pb-8">
          <div className="-mt-3">
            <div className="flex-1 px-4 flex-col justify-between sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
              <div className="space-y-8 divide-y divide-gray-200">
                <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                  <div className="space-y-6 sm:space-y-5">
                    <div>
                      <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:leading-9">
                        Staking
                      </h1>
                      <p className="mt-2 max-w-2xl text-base text-gray-500"></p>
                      <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        <div
                          key="walletIndex"
                          className="mt-8 overflow-hidden rounded-lg bg-white shadow"
                        >
                          <div className="p-5">
                            <div className="flex items-center">
                              <div className="flex-shrink-0">
                                <img
                                  className="h-8 w-8 rounded-full"
                                  src={`https://cdn.stamp.fyi/avatar/0x5954aB967Bc958940b7EB73ee84797Dc8a2AFbb9?s=32`}
                                  alt="APE Staking address"
                                />
                              </div>
                              <div className="ml-5 w-0 flex-1">
                                <dl>
                                  <dt className="truncate text-sm font-medium text-gray-500">
                                    Staking address
                                  </dt>
                                  <dd>
                                    <div className="truncate text-md font-medium text-gray-900">
                                      <a
                                        href={`https://etherscan.io/address/${apeStakingAddress}`}
                                        className="text-apelight hover:underline"
                                        rel="noreferrer"
                                        target="_blank"
                                      >
                                        {apeStakingAddress.slice(0, 8) +
                                          "..." +
                                          apeStakingAddress.slice(-8)}
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
                                  className="h-8 w-8 rounded-full"
                                  src="https://ivanmolto.mypinata.cloud/ipfs/QmQPRPBHDRhDK81B7woTKm8poNAJrbswzc1kXtWQuE9U84?_gl=1*vmwdxl*_ga*ODhhNzU4NWEtNGMwZS00ODExLWE2YmQtZGE4ZDZjYmU4N2I0*_ga_5RMPXG14TE*MTY3OTUwNDE4OS41MC4xLjE2Nzk1MDQyMzUuMTQuMC4w"
                                  alt="apecoin"
                                />
                              </div>
                              <div className="ml-5 w-0 flex-1">
                                <dl>
                                  <dt className="truncate text-sm font-medium text-gray-500">
                                    APE holdings
                                  </dt>
                                  <dd>
                                    <div className="text-md font-medium text-gray-900">
                                      <Balance account={apeStakingAddress} />
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
                                  className="h-8 w-8 rounded-full"
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
                                      <NativeBalance
                                        account={apeStakingAddress}
                                      />
                                    </div>
                                  </dd>
                                </dl>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 md:max-w-2xl md:grid-cols-2 lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-4">
                        <a
                          href="https://app.apestake.io"
                          className="relative duration-150 hover:scale-105"
                          rel="noreferrer"
                          target="_blank"
                        >
                          <div
                            key="1"
                            className="bg-white ring-1 ring-gray-200 rounded-3xl p-8 shadow-md"
                          >
                            <h3
                              id="1"
                              className="text-gray-900 text-lg font-semibold leading-8"
                            >
                              ApeCoin ($APE)
                            </h3>
                            <p className="mt-4 text-sm leading-6 text-gray-600">
                              As long as you have at least one $APE in your
                              wallet, you can stake and start accruing rewards.
                              The total staking pool is 30,000,000 $APE.
                            </p>
                            <p className="mt-6 flex items-baseline gap-x-1">
                              <span className="text-base font-semibold tracking-tight text-gray-900">
                                {poolApe ? (
                                  poolApe.error ? (
                                    <div>Error fetching contract</div>
                                  ) : (
                                    numberWithCommas(
                                      Number(
                                        utils.formatEther(poolApe.value[2])
                                      ).toFixed(0)
                                    )
                                  )
                                ) : (
                                  "Loading..."
                                )}
                              </span>
                              <span className="text-base font-semibold leading-6 text-gray-900">
                                APE{" "}
                                <span className="text-sm font-normal text-gray-500">
                                  staked
                                </span>
                              </span>
                            </p>

                            <ul
                              role="list"
                              className="mt-8 space-y-3 text-sm leading-6 text-gray-600"
                            >
                              <img
                                src="https://ivanmolto.mypinata.cloud/ipfs/QmcA35YbjdYiQfzQtCrK6vYfdm1WRZH4GSBhpoFhBWrwgx?_gl=1*1rd9gi3*_ga*ODhhNzU4NWEtNGMwZS00ODExLWE2YmQtZGE4ZDZjYmU4N2I0*_ga_5RMPXG14TE*MTY3OTc1OTY2NS41NC4xLjE2Nzk3NTk2NjguNTcuMC4w"
                                alt="APE"
                              />
                            </ul>
                            <p className="mt-6 flex items-baseline gap-x-1">
                              <span className="text-base font-semibold tracking-tight text-gray-900">
                                {poolApe ? (
                                  poolApe.error ? (
                                    <div>Error fetching contract</div>
                                  ) : (
                                    numberWithCommas(
                                      Number(
                                        utils.formatEther(poolApe.value[3])
                                      ).toFixed(2)
                                    )
                                  )
                                ) : (
                                  "Loading..."
                                )}
                              </span>
                              <span className="text-base font-semibold leading-6 text-gray-900">
                                APE{" "}
                                <span className="text-sm font-normal text-gray-500">
                                  rewards share
                                </span>
                              </span>
                            </p>
                          </div>
                        </a>
                        <a
                          href="https://app.apestake.io"
                          className="relative duration-150 hover:scale-105"
                          rel="noreferrer"
                          target="_blank"
                        >
                          <div
                            key="2"
                            className="bg-white ring-1 ring-gray-200 rounded-3xl p-8 shadow-md"
                          >
                            <h3
                              id="2"
                              className="text-gray-900 text-lg font-semibold leading-8"
                            >
                              APE (BAYC)
                            </h3>
                            <p className="mt-4 text-sm leading-6 text-gray-600">
                              The BAYC pool lets you stake up to 10,094 $APE for
                              each BAYC you own. The total staking pool for
                              Bored Apes runs deep at 47,105,000 $APE for Year
                              1.
                            </p>
                            <p className="mt-6 flex items-baseline gap-x-1">
                              <span className="text-base font-semibold tracking-tight text-gray-900">
                                {poolBayc ? (
                                  poolBayc.error ? (
                                    <div>Error fetching contract</div>
                                  ) : (
                                    numberWithCommas(
                                      Number(
                                        utils.formatEther(poolBayc.value[2])
                                      ).toFixed(0)
                                    )
                                  )
                                ) : (
                                  "Loading..."
                                )}
                              </span>
                              <span className="text-base font-semibold leading-6 text-gray-900">
                                APE{" "}
                                <span className="text-sm font-normal text-gray-500">
                                  staked
                                </span>
                              </span>
                            </p>

                            <ul
                              role="list"
                              className="mt-8 space-y-3 text-sm leading-6 text-gray-600"
                            >
                              <img
                                src="https://ivanmolto.mypinata.cloud/ipfs/QmVd5VzEJ7PZpbxZ3FJ7eD2MZizYf93vcCqA1D23J76Jt3?_gl=1*sf175f*_ga*ODhhNzU4NWEtNGMwZS00ODExLWE2YmQtZGE4ZDZjYmU4N2I0*_ga_5RMPXG14TE*MTY3OTc1OTY2NS41NC4xLjE2Nzk3NTk2NjguNTcuMC4w"
                                alt="BAYC"
                              />
                            </ul>
                            <p className="mt-6 flex items-baseline gap-x-1">
                              <span className="text-base font-semibold tracking-tight text-gray-900">
                                {poolBayc ? (
                                  poolBayc.error ? (
                                    <div>Error fetching contract</div>
                                  ) : (
                                    numberWithCommas(
                                      Number(
                                        utils.formatEther(poolBayc.value[3])
                                      ).toFixed(2)
                                    )
                                  )
                                ) : (
                                  "Loading..."
                                )}
                              </span>
                              <span className="text-base font-semibold leading-6 text-gray-900">
                                APE{" "}
                                <span className="text-sm font-normal text-gray-500">
                                  rewards share
                                </span>
                              </span>
                            </p>
                          </div>
                        </a>
                        <a
                          href="https://app.apestake.io"
                          className="relative duration-150 hover:scale-105"
                          rel="noreferrer"
                          target="_blank"
                        >
                          <div
                            key="3"
                            className="bg-white ring-1 ring-gray-200 rounded-3xl p-8 shadow-md"
                          >
                            <h3
                              id="3"
                              className="text-gray-900 text-lg font-semibold leading-8"
                            >
                              MUTANT (MAYC)
                            </h3>
                            <p className="mt-4 text-sm leading-6 text-gray-600">
                              The MAYC pool lets you stake up to 2,042 $APE for
                              each MAYC you own. The total staking pool for
                              Mutants tops out at 19,060,000 $APE for Year 1.
                            </p>
                            <p className="mt-6 flex items-baseline gap-x-1">
                              <span className="text-base font-semibold tracking-tight text-gray-900">
                                {poolMayc ? (
                                  poolMayc.error ? (
                                    <div>Error fetching contract</div>
                                  ) : (
                                    numberWithCommas(
                                      Number(
                                        utils.formatEther(poolMayc.value[2])
                                      ).toFixed(0)
                                    )
                                  )
                                ) : (
                                  "Loading..."
                                )}
                              </span>
                              <span className="text-base font-semibold leading-6 text-gray-900">
                                APE{" "}
                                <span className="text-sm font-normal text-gray-500">
                                  staked
                                </span>
                              </span>
                            </p>

                            <ul
                              role="list"
                              className="mt-8 space-y-3 text-sm leading-6 text-gray-600"
                            >
                              <img
                                src="https://ivanmolto.mypinata.cloud/ipfs/QmbGSRvA6PNbT74rp8upeYk5NgJAQa13JZKgauHHc5WVeG?_gl=1*6ry23f*_ga*ODhhNzU4NWEtNGMwZS00ODExLWE2YmQtZGE4ZDZjYmU4N2I0*_ga_5RMPXG14TE*MTY3OTc1OTY2NS41NC4xLjE2Nzk3NTk2NjguNTcuMC4w"
                                alt="MAYC"
                              />
                            </ul>
                            <p className="mt-6 flex items-baseline gap-x-1">
                              <span className="text-base font-semibold tracking-tight text-gray-900">
                                {poolMayc ? (
                                  poolMayc.error ? (
                                    <div>Error fetching contract</div>
                                  ) : (
                                    numberWithCommas(
                                      Number(
                                        utils.formatEther(poolMayc.value[3])
                                      ).toFixed(2)
                                    )
                                  )
                                ) : (
                                  "Loading..."
                                )}
                              </span>
                              <span className="text-base font-semibold leading-6 text-gray-900">
                                APE{" "}
                                <span className="text-sm font-normal text-gray-500">
                                  rewards share
                                </span>
                              </span>
                            </p>
                          </div>
                        </a>
                        <a
                          href="https://app.apestake.io"
                          className="relative duration-150 hover:scale-105"
                          rel="noreferrer"
                          target="_blank"
                        >
                          <div
                            key="4"
                            className="bg-white ring-1 ring-gray-200 rounded-3xl p-8 shadow-md"
                          >
                            <h3
                              id="4"
                              className="text-gray-900 text-lg font-semibold leading-8"
                            >
                              PAIRED (BAKC)
                            </h3>
                            <p className="mt-4 text-sm leading-6 text-gray-600">
                              A Dog (BAKC) must be paired with an Ape or a
                              Mutant. This pool lets you stake up to 856 $APE.
                              The total staking pool is 3,835,000 $APE for Year
                              1.
                            </p>
                            <p className="mt-6 flex items-baseline gap-x-1">
                              <span className="text-base font-semibold tracking-tight text-gray-900">
                                {poolBakc ? (
                                  poolBakc.error ? (
                                    <div>Error fetching contract</div>
                                  ) : (
                                    numberWithCommas(
                                      Number(
                                        utils.formatEther(poolBakc.value[2])
                                      ).toFixed(0)
                                    )
                                  )
                                ) : (
                                  "Loading..."
                                )}
                              </span>
                              <span className="text-base font-semibold leading-6 text-gray-900">
                                APE{" "}
                                <span className="text-sm font-normal text-gray-500">
                                  staked
                                </span>
                              </span>
                            </p>

                            <ul
                              role="list"
                              className="mt-8 space-y-3 text-sm leading-6 text-gray-600"
                            >
                              <img src="https://ivanmolto.mypinata.cloud/ipfs/QmU7kJccaB9caUZthhWNNQo1moazWePfviN4d5uvs5z59u?_gl=1*1yzdnk0*_ga*ODhhNzU4NWEtNGMwZS00ODExLWE2YmQtZGE4ZDZjYmU4N2I0*_ga_5RMPXG14TE*MTY3OTc1OTY2NS41NC4xLjE2Nzk3NTk2NjguNTcuMC4w" />
                            </ul>
                            <p className="mt-6 flex items-baseline gap-x-1">
                              <span className="text-base font-semibold tracking-tight text-gray-900">
                                {poolBakc ? (
                                  poolBakc.error ? (
                                    <div>Error fetching contract</div>
                                  ) : (
                                    numberWithCommas(
                                      Number(
                                        utils.formatEther(poolBakc.value[3])
                                      ).toFixed(2)
                                    )
                                  )
                                ) : (
                                  "Loading..."
                                )}
                              </span>
                              <span className="text-base font-semibold leading-6 text-gray-900">
                                APE{" "}
                                <span className="text-sm font-normal text-gray-500">
                                  rewards share
                                </span>
                              </span>
                            </p>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Staking;
