import { useQuery } from "@tanstack/react-query";

import {
  ArrowSmallDownIcon,
  ArrowSmallUpIcon,
  ArrowsPointingInIcon,
  ArrowTrendingUpIcon,
  BanknotesIcon,
  BeakerIcon,
  BoltIcon,
  BuildingLibraryIcon,
  ChatBubbleLeftRightIcon,
  ClockIcon,
  CodeBracketIcon,
  GlobeAltIcon,
  KeyIcon,
  ReceiptPercentIcon,
  StarIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";

const stats = [
  { label: "Total Supply", value: "1,000,000,000" },
  { label: "Max Supply", value: "1,000,000,000" },
  { label: "Decimals", value: 18 },
];
const purposes = [
  {
    icon: BuildingLibraryIcon,
    name: "Governance",
    href: "https://apecoin.com/about",
    blurb:
      "ApeCoin is the ecosystem’s governance token, allowing ApeCoin holders to participate in ApeCoin DAO",
  },
  {
    icon: ArrowsPointingInIcon,
    name: "Unification of Spend",
    href: "https://apecoin.com/about",
    blurb:
      "ApeCoin is the ecosystem’s utility token, giving all its participants a shared and open currency that can be used without centralized intermediaries",
  },
  {
    icon: KeyIcon,
    name: "Access",
    href: "https://apecoin.com/about",
    blurb:
      "ApeCoin provides access to certain parts of the ecosystem that are otherwise unavailable, such as exclusive games, merch, events, and services",
  },
  {
    icon: BeakerIcon,
    name: "Incentivization",
    href: "https://apecoin.com/about",
    blurb:
      "ApeCoin is a tool for third-party developers to participate in the ecosystem by incorporating APE into services, games, and other projects",
  },
];
const entities = [
  {
    id: 1,
    title: "Yuga Labs",
    href: "#",
    preview:
      "Yuga Labs is a web3 company best known for the creation of the Bored Ape Yacht Club. It will be a community member in the ApeCoin DAO and will adopt APE as the primary token across new projects.",
  },
  {
    id: 2,
    title: "BAYC",
    href: "#",
    preview:
      "The Bored Ape Yacht Club is a collection of digital art crafted into NFTs where the token itself doubles as a membership to a swamp club for apes.",
  },
  {
    id: 3,
    title: "APE Foundation",
    href: "#",
    preview:
      "The APE Foundation is the steward of ApeCoin, a legal entity that exists to administer the decisions of the ApeCoin DAO.",
  },
  {
    id: 4,
    title: "ApeCoin DAO",
    href: "#",
    preview:
      "A decentralized governance organization that will make decisions regarding Ecosystem Fund allocations, governance rules, projects, partnerships, and more. ApeCoin DAO membership is open to all ApeCoin holders.",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function numberWithCommas(rawNumber) {
  return rawNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getTokenPrice() {
  const options = { method: "GET", headers: { accept: "application/json" } };
  return fetch(
    "https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=0x4d224452801ACEd8B2F0aebE155379bb5D594381&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true",
    options
  ).then((response) => response.json());
}

function Price() {
  const tokenQuery = useQuery({
    queryKey: ["token"],
    queryFn: () => getTokenPrice(),
  });

  if (tokenQuery.isLoading) return <div>Loading...</div>;
  if (tokenQuery.isError) return <div className="text-xl">n/a</div>;
  if (tokenQuery.data === null) return <div>n/a</div>;
  const contract = "0x4d224452801aced8b2f0aebe155379bb5d594381";
  const token = tokenQuery.data;
  return <div className="text-xl">${token[contract].usd}</div>;
}

function getCoin() {
  const options = { method: "GET", headers: { accept: "application/json" } };
  return fetch(
    "https://api.coingecko.com/api/v3/coins/apecoin?localization=false&tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=true",
    options
  ).then((response) => response.json());
}

function Coin() {
  const coinQuery = useQuery({
    queryKey: ["coin"],
    queryFn: () => getCoin(),
  });

  if (coinQuery.isLoading) return <div>Loading...</div>;
  if (coinQuery.isError)
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div
          key="rank"
          className="mt-2 overflow-hidden rounded-lg bg-white shadow"
        >
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <StarIcon
                  className="h-6 w-6 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500">
                    Market Cap Rank
                  </dt>
                  <dd>
                    <div className="truncate text-md font-medium text-gray-900">
                      n/a
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <div
          key="high"
          className="mt-2 overflow-hidden rounded-lg bg-white shadow"
        >
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ArrowSmallUpIcon
                  className="h-6 w-6 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500">
                    High 24h
                  </dt>
                  <dd>
                    <div className="text-md font-medium text-gray-900">n/a</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <div
          key="low"
          className="mt-2 overflow-hidden rounded-lg bg-white shadow"
        >
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ArrowSmallDownIcon
                  className="h-6 w-6 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500">
                    Low 24h
                  </dt>
                  <dd>
                    <div className="text-md font-medium text-gray-900">n/a</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <div
          key="ath"
          className="mt-2 overflow-hidden rounded-lg bg-white shadow"
        >
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrophyIcon
                  className="h-6 w-6 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500">
                    All Time High
                  </dt>
                  <dd>
                    <div className="text-md font-medium text-gray-900">n/a</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <div
          key="percentage"
          className="mt-2 overflow-hidden rounded-lg bg-white shadow"
        >
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ReceiptPercentIcon
                  className="h-6 w-6 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500">
                    All Time High Change %
                  </dt>
                  <dd>
                    <div className="text-md font-medium text-gray-900">n/a</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  if (coinQuery.data === null) return <div>n/a</div>;
  const coin = coinQuery.data;

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <div
        key="rank"
        className="mt-2 overflow-hidden rounded-lg bg-white shadow"
      >
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <StarIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="truncate text-sm font-medium text-gray-500">
                  Market Cap Rank
                </dt>
                <dd>
                  <div className="truncate text-md font-medium text-gray-900">
                    {coin.market_cap_rank}
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
      <div
        key="high"
        className="mt-2 overflow-hidden rounded-lg bg-white shadow"
      >
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ArrowSmallUpIcon
                className="h-6 w-6 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="truncate text-sm font-medium text-gray-500">
                  High 24h
                </dt>
                <dd>
                  <div className="text-md font-medium text-gray-900">
                    {coin.market_data.high_24h.usd}
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
      <div
        key="low"
        className="mt-2 overflow-hidden rounded-lg bg-white shadow"
      >
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ArrowSmallDownIcon
                className="h-6 w-6 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="truncate text-sm font-medium text-gray-500">
                  Low 24h
                </dt>
                <dd>
                  <div className="text-md font-medium text-gray-900">
                    {coin.market_data.low_24h.usd}
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
      <div
        key="ath"
        className="mt-2 overflow-hidden rounded-lg bg-white shadow"
      >
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <TrophyIcon
                className="h-6 w-6 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="truncate text-sm font-medium text-gray-500">
                  All Time High
                </dt>
                <dd>
                  <div className="text-md font-medium text-gray-900">
                    ${coin.market_data.ath.usd}
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
      <div
        key="percentage"
        className="mt-2 overflow-hidden rounded-lg bg-white shadow"
      >
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ReceiptPercentIcon
                className="h-6 w-6 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="truncate text-sm font-medium text-gray-500">
                  All Time High Change %
                </dt>
                <dd>
                  <div className="text-md font-medium text-gray-900">
                    {coin.market_data.ath_change_percentage.usd.toFixed(1)}%
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MarketData() {
  const coinQuery = useQuery({
    queryKey: ["coin"],
    queryFn: () => getCoin(),
  });

  if (coinQuery.isLoading) return <div>Loading...</div>;
  if (coinQuery.isError)
    return (
      <section aria-labelledby="recent-hires-title">
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <h2
              className="text-base font-medium text-gray-900"
              id="recent-hires-title"
            >
              Pricing Market Data
            </h2>
            <div className="mt-6 flow-root">
              <ul role="list" className="-my-5 divide-y divide-gray-200">
                <li key="1h" className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900">
                        Price Change Percentage 1h
                      </p>
                    </div>
                    <div>n/a</div>
                  </div>
                </li>
                <li key="24h" className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900">
                        Price Change Percentage 24h
                      </p>
                    </div>
                    <div>n/a</div>
                  </div>
                </li>
                <li key="7d" className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900">
                        Price Change Percentage 7d
                      </p>
                    </div>
                    <div>n/a</div>
                  </div>
                </li>
                <li key="14d" className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900">
                        Price Change Percentage 14d
                      </p>
                    </div>
                    <div>n/a</div>
                  </div>
                </li>
                <li key="30d" className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900">
                        Price Change Percentage 30d
                      </p>
                    </div>
                    <div>n/a</div>
                  </div>
                </li>
                <li key="60d" className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900">
                        Price Change Percentage 60d
                      </p>
                    </div>
                    <div>n/a</div>
                  </div>
                </li>
                <li key="200d" className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900">
                        Price Change Percentage 200d
                      </p>
                    </div>
                    <div>n/a</div>
                  </div>
                </li>
                <li key="1y" className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900">
                        Price Change Percentage 1y
                      </p>
                    </div>
                    <div>n/a</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  if (coinQuery.data === null) return <div>n/a</div>;
  const marketdata = coinQuery.data;

  return (
    <section aria-labelledby="recent-hires-title">
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="p-6">
          <h2
            className="text-base font-medium text-gray-900"
            id="recent-hires-title"
          >
            Pricing Market Data
          </h2>
          <div className="mt-6 flow-root">
            <ul role="list" className="-my-5 divide-y divide-gray-200">
              <li key="1h" className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900">
                      Price Change Percentage 1h
                    </p>
                  </div>
                  <div>
                    {Number(
                      marketdata.market_data
                        .price_change_percentage_1h_in_currency.usd
                    ) >= 0 && (
                      <div className="inline-flex items-center rounded-full bg-green-500 px-2.5 py-1 text-xs font-semibold text-white">
                        {Number(
                          marketdata.market_data
                            .price_change_percentage_1h_in_currency.usd
                        ).toFixed(1)}
                        %
                      </div>
                    )}
                    {Number(
                      marketdata.market_data
                        .price_change_percentage_1h_in_currency.usd
                    ) < 0 && (
                      <div className="inline-flex items-center rounded-full bg-red-500 px-2.5 py-1 text-xs font-semibold text-white">
                        {Number(
                          marketdata.market_data
                            .price_change_percentage_1h_in_currency.usd
                        ).toFixed(1)}
                        %
                      </div>
                    )}
                  </div>
                </div>
              </li>
              <li key="24h" className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900">
                      Price Change Percentage 24h
                    </p>
                  </div>
                  <div>
                    {Number(
                      marketdata.market_data
                        .price_change_percentage_24h_in_currency.usd
                    ) >= 0 && (
                      <div className="inline-flex items-center rounded-full bg-green-500 px-2.5 py-1 text-xs font-semibold text-white">
                        {Number(
                          marketdata.market_data
                            .price_change_percentage_24h_in_currency.usd
                        ).toFixed(1)}
                        %
                      </div>
                    )}
                    {Number(
                      marketdata.market_data
                        .price_change_percentage_24h_in_currency.usd
                    ) < 0 && (
                      <div className="inline-flex items-center rounded-full bg-red-500 px-2.5 py-1 text-xs font-semibold text-white">
                        {Number(
                          marketdata.market_data
                            .price_change_percentage_24h_in_currency.usd
                        ).toFixed(1)}
                        %
                      </div>
                    )}
                  </div>
                </div>
              </li>
              <li key="7d" className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900">
                      Price Change Percentage 7d
                    </p>
                  </div>
                  <div>
                    {Number(
                      marketdata.market_data
                        .price_change_percentage_7d_in_currency.usd
                    ) >= 0 && (
                      <div className="inline-flex items-center rounded-full bg-green-500 px-2.5 py-1 text-xs font-semibold text-white">
                        {Number(
                          marketdata.market_data
                            .price_change_percentage_7d_in_currency.usd
                        ).toFixed(1)}
                        %
                      </div>
                    )}
                    {Number(
                      marketdata.market_data
                        .price_change_percentage_7d_in_currency.usd
                    ) < 0 && (
                      <div className="inline-flex items-center rounded-full bg-red-500 px-2.5 py-1 text-xs font-semibold text-white">
                        {Number(
                          marketdata.market_data
                            .price_change_percentage_7d_in_currency.usd
                        ).toFixed(1)}
                        %
                      </div>
                    )}
                  </div>
                </div>
              </li>
              <li key="14d" className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900">
                      Price Change Percentage 14d
                    </p>
                  </div>
                  <div>
                    {Number(
                      marketdata.market_data
                        .price_change_percentage_14d_in_currency.usd
                    ) >= 0 && (
                      <div className="inline-flex items-center rounded-full bg-green-500 px-2.5 py-1 text-xs font-semibold text-white">
                        {Number(
                          marketdata.market_data
                            .price_change_percentage_14d_in_currency.usd
                        ).toFixed(1)}
                        %
                      </div>
                    )}
                    {Number(
                      marketdata.market_data
                        .price_change_percentage_14d_in_currency.usd
                    ) < 0 && (
                      <div className="inline-flex items-center rounded-full bg-red-500 px-2.5 py-1 text-xs font-semibold text-white">
                        {Number(
                          marketdata.market_data
                            .price_change_percentage_14d_in_currency.usd
                        ).toFixed(1)}
                        %
                      </div>
                    )}
                  </div>
                </div>
              </li>
              <li key="30d" className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900">
                      Price Change Percentage 30d
                    </p>
                  </div>
                  <div>
                    {Number(
                      marketdata.market_data
                        .price_change_percentage_30d_in_currency.usd
                    ) >= 0 && (
                      <div className="inline-flex items-center rounded-full bg-green-500 px-2.5 py-1 text-xs font-semibold text-white">
                        {Number(
                          marketdata.market_data
                            .price_change_percentage_30d_in_currency.usd
                        ).toFixed(1)}
                        %
                      </div>
                    )}
                    {Number(
                      marketdata.market_data
                        .price_change_percentage_30d_in_currency.usd
                    ) < 0 && (
                      <div className="inline-flex items-center rounded-full bg-red-500 px-2.5 py-1 text-xs font-semibold text-white">
                        {Number(
                          marketdata.market_data
                            .price_change_percentage_30d_in_currency.usd
                        ).toFixed(1)}
                        %
                      </div>
                    )}
                  </div>
                </div>
              </li>
              <li key="60d" className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900">
                      Price Change Percentage 60d
                    </p>
                  </div>
                  <div>
                    {Number(
                      marketdata.market_data
                        .price_change_percentage_60d_in_currency.usd
                    ) >= 0 && (
                      <div className="inline-flex items-center rounded-full bg-green-500 px-2.5 py-1 text-xs font-semibold text-white">
                        {Number(
                          marketdata.market_data
                            .price_change_percentage_60d_in_currency.usd
                        ).toFixed(1)}
                        %
                      </div>
                    )}
                    {Number(
                      marketdata.market_data
                        .price_change_percentage_60d_in_currency.usd
                    ) < 0 && (
                      <div className="inline-flex items-center rounded-full bg-red-500 px-2.5 py-1 text-xs font-semibold text-white">
                        {Number(
                          marketdata.market_data
                            .price_change_percentage_60d_in_currency.usd
                        ).toFixed(1)}
                        %
                      </div>
                    )}
                  </div>
                </div>
              </li>
              <li key="200d" className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900">
                      Price Change Percentage 200d
                    </p>
                  </div>
                  <div>
                    {Number(
                      marketdata.market_data
                        .price_change_percentage_200d_in_currency.usd
                    ) >= 0 && (
                      <div className="inline-flex items-center rounded-full bg-green-500 px-2.5 py-1 text-xs font-semibold text-white">
                        {Number(
                          marketdata.market_data
                            .price_change_percentage_200d_in_currency.usd
                        ).toFixed(1)}
                        %
                      </div>
                    )}
                    {Number(
                      marketdata.market_data
                        .price_change_percentage_200d_in_currency.usd
                    ) < 0 && (
                      <div className="inline-flex items-center rounded-full bg-red-500 px-2.5 py-1 text-xs font-semibold text-white">
                        {Number(
                          marketdata.market_data
                            .price_change_percentage_200d_in_currency.usd
                        ).toFixed(1)}
                        %
                      </div>
                    )}
                  </div>
                </div>
              </li>
              <li key="1y" className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900">
                      Price Change Percentage 1y
                    </p>
                  </div>
                  <div>
                    {Number(
                      marketdata.market_data
                        .price_change_percentage_1y_in_currency.usd
                    ) >= 0 && (
                      <div className="inline-flex items-center rounded-full bg-green-500 px-2.5 py-1 text-xs font-semibold text-white">
                        {Number(
                          marketdata.market_data
                            .price_change_percentage_1y_in_currency.usd
                        ).toFixed(1)}
                        %
                      </div>
                    )}
                    {Number(
                      marketdata.market_data
                        .price_change_percentage_1y_in_currency.usd
                    ) < 0 && (
                      <div className="inline-flex items-center rounded-full bg-red-500 px-2.5 py-1 text-xs font-semibold text-white">
                        {Number(
                          marketdata.market_data
                            .price_change_percentage_1y_in_currency.usd
                        ).toFixed(1)}
                        %
                      </div>
                    )}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Token() {
  const tokenQuery = useQuery({
    queryKey: ["token"],
    queryFn: () => getTokenPrice(),
  });

  if (tokenQuery.isLoading) return <div>Loading...</div>;
  if (tokenQuery.isError) return <div>{`Error! ${error.message}`}</div>;
  if (tokenQuery.data === null) return <div>n/a</div>;
  const contract = "0x4d224452801aced8b2f0aebe155379bb5d594381";
  const token = tokenQuery.data;

  return (
    <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <div
        key="cap"
        className="mt-2 overflow-hidden rounded-lg bg-white shadow"
      >
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <BanknotesIcon
                className="h-6 w-6 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="truncate text-sm font-medium text-gray-500">
                  Market Cap
                </dt>
                <dd>
                  <div className="truncate text-md font-medium text-gray-900">
                    $
                    {numberWithCommas(
                      token[contract].usd_market_cap.toFixed(0)
                    )}
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
      <div
        key="trading"
        className="mt-2 overflow-hidden rounded-lg bg-white shadow"
      >
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ClockIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="truncate text-sm font-medium text-gray-500">
                  24 Hour Trading Vol
                </dt>
                <dd>
                  <div className="text-md font-medium text-gray-900">
                    ${numberWithCommas(token[contract].usd_24h_vol.toFixed(0))}
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
      <div
        key="fdv"
        className="mt-2 overflow-hidden rounded-lg bg-white shadow"
      >
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ArrowTrendingUpIcon
                className="h-6 w-6 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="truncate text-sm font-medium text-gray-500">
                  FDV
                </dt>
                <dd>
                  <div className="text-md font-medium text-gray-900">
                    $
                    {numberWithCommas(
                      (token[contract].usd * 1000000000).toFixed(0)
                    )}
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const ApeCoin = () => {
  return (
    <>
      <div className="font-montserrat">
        <div className="flex justify-end max-w-6xl mx-auto mt-0 px-4 text-sm leading-6 font-normal text-gray-900 sm:px-6 lg:px-8">
          ApeCoin
        </div>
        <main className="flex-1 flex-col pb-8">
          <div className="-mt-3">
            <div className="flex-1 px-4 flex-col justify-between sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
              <div className="space-y-8 divide-y divide-gray-200">
                <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                  <div className="space-y-6 sm:space-y-5">
                    <div>
                      <h1 className="mb-8 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:leading-9">
                        ApeCoin Overview
                      </h1>
                      <div className="min-h-full">
                        <main className="mt-8 pb-8">
                          <div className="mx-auto max-w-3xl  lg:max-w-7xl">
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
                                              alt="ApeCoin"
                                            />
                                          </div>
                                          <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                                            <p className="text-sm font-medium text-gray-600">
                                              ApeCoin is for the Web3 Economy
                                            </p>
                                            <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                                              ApeCoin (APE)
                                            </p>
                                            <p className="text-sm font-medium text-gray-600">
                                              The APE Foundation is the steward
                                              of ApeCoin
                                            </p>
                                          </div>
                                        </div>
                                        <div className="mt-5 flex justify-center sm:mt-0">
                                          <div className="flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300">
                                            <Price />
                                          </div>
                                        </div>
                                      </div>
                                      <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                                        <dt className="sr-only">Website</dt>
                                        <dd className="mt-3 items-center text-sm font-medium capitalize text-gray-500 sm:mr-6">
                                          <a
                                            href="https://apecoin.com"
                                            className="inline-flex items-center hover:underline hover:text-apelight"
                                            rel="noreferrer"
                                            target="_blank"
                                          >
                                            <GlobeAltIcon
                                              className="mr-1.5 h-5 w-5 flex-shrink-0"
                                              aria-hidden="true"
                                            />
                                            Website
                                          </a>
                                        </dd>
                                        <dt className="sr-only">Forum</dt>
                                        <dd className="mt-3 flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6 sm:mt-0">
                                          <a
                                            href="https://forum.apecoin.com"
                                            className="inline-flex items-center hover:underline hover:text-apelight"
                                            rel="noreferrer"
                                            target="_blank"
                                          >
                                            <ChatBubbleLeftRightIcon
                                              className="mr-1.5 h-5 w-5 flex-shrink-0"
                                              aria-hidden="true"
                                            />
                                            Forum
                                          </a>
                                        </dd>
                                        <dt className="sr-only">Snapshot</dt>
                                        <dd className="mt-3 flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6 sm:mt-0">
                                          <a
                                            href="https://snapshot.org/#/apecoin.eth"
                                            className="inline-flex items-center hover:underline hover:text-apelight"
                                            rel="noreferrer"
                                            target="_blank"
                                          >
                                            <BoltIcon
                                              className="mr-1.5 h-5 w-5 flex-shrink-0"
                                              aria-hidden="true"
                                            />
                                            Snapshot
                                          </a>
                                        </dd>
                                        <dt className="sr-only">
                                          Smart Contract
                                        </dt>
                                        <dd className="mt-3 flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6 sm:mt-0">
                                          <a
                                            href="https://etherscan.io/token/0x4d224452801aced8b2f0aebe155379bb5d594381"
                                            className="inline-flex items-center hover:underline hover:text-apelight"
                                            rel="noreferrer"
                                            target="_blank"
                                          >
                                            <CodeBracketIcon
                                              className="mr-1.5 h-5 w-5 flex-shrink-0"
                                              aria-hidden="true"
                                            />
                                            Contract address
                                          </a>
                                        </dd>
                                      </dl>
                                    </div>
                                    <div className="grid grid-cols-1 divide-y divide-gray-200 border-t border-gray-200 bg-gray-50 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
                                      {stats.map((stat) => (
                                        <div
                                          key={stat.label}
                                          className="px-6 py-5 text-center text-sm font-medium"
                                        >
                                          <span className="text-gray-900">
                                            {stat.value}
                                          </span>{" "}
                                          <span className="text-gray-600">
                                            {stat.label}
                                          </span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </section>
                                {/* Overview */}
                                <Token />
                                <Coin />
                                {/* Purposes panel */}
                                <div>
                                  <h2 className="mt-4 text-lg font-medium leading-6 text-gray-900">
                                    ApeCoin Protocol
                                  </h2>
                                </div>
                                <section aria-labelledby="quick-links-title">
                                  <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0">
                                    <h2
                                      className="sr-only"
                                      id="quick-links-title"
                                    >
                                      Quick links
                                    </h2>
                                    {purposes.map((purpose, purposeIdx) => (
                                      <div
                                        key={purpose.name}
                                        className={classNames(
                                          purposeIdx === 0
                                            ? "rounded-tl-lg rounded-tr-lg sm:rounded-tr-none"
                                            : "",
                                          purposeIdx === 1
                                            ? "sm:rounded-tr-lg"
                                            : "",
                                          purposeIdx === purpose.length - 2
                                            ? "sm:rounded-bl-lg"
                                            : "",
                                          purposeIdx === purpose.length - 1
                                            ? "rounded-bl-lg rounded-br-lg sm:rounded-bl-none"
                                            : "",
                                          "group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-apelight"
                                        )}
                                      >
                                        <div>
                                          <span
                                            className={classNames(
                                              "inline-flex rounded-lg p-3 ring-4 ring-white"
                                            )}
                                          >
                                            <purpose.icon
                                              className="h-6 w-6"
                                              aria-hidden="true"
                                            />
                                          </span>
                                        </div>
                                        <div className="mt-8">
                                          <h3 className="text-lg font-medium">
                                            <a
                                              href={purpose.href}
                                              className="focus:outline-none"
                                              rel="noreferrer"
                                              target="_blank"
                                            >
                                              {/* Extend touch target to entire panel */}
                                              <span
                                                className="absolute inset-0"
                                                aria-hidden="true"
                                              />
                                              {purpose.name}
                                            </a>
                                          </h3>
                                          <p className="mt-2 text-sm text-gray-500">
                                            {purpose.blurb}
                                          </p>
                                        </div>
                                        <span
                                          className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                                          aria-hidden="true"
                                        >
                                          <svg
                                            className="h-6 w-6"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                          >
                                            <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                                          </svg>
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </section>
                              </div>

                              {/* Right column */}
                              <div className="grid grid-cols-1 gap-4">
                                {/* Market Data */}
                                <MarketData />
                                {/* Entities */}
                                <section aria-labelledby="entities-title">
                                  <div className="overflow-hidden rounded-lg bg-white shadow">
                                    <div className="p-6">
                                      <h2
                                        className="text-base font-medium text-gray-900"
                                        id="entities-title"
                                      >
                                        Who/What are the different entities and
                                        names, and how do they relate to each
                                        other?
                                      </h2>
                                      <div className="mt-6 flow-root">
                                        <ul
                                          role="list"
                                          className="-my-5 divide-y divide-gray-200"
                                        >
                                          {entities.map((entity) => (
                                            <li
                                              key={entity.id}
                                              className="py-5"
                                            >
                                              <div className="relative focus-within:ring-2 focus-within:ring-cyan-500">
                                                <h3 className="text-sm font-semibold text-gray-800">
                                                  <a
                                                    href={entity.href}
                                                    className="hover:underline focus:outline-none"
                                                  >
                                                    {/* Extend touch target to entire panel */}
                                                    <span
                                                      className="absolute inset-0"
                                                      aria-hidden="true"
                                                    />
                                                    {entity.title}
                                                  </a>
                                                </h3>
                                                <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                                                  {entity.preview}
                                                </p>
                                              </div>
                                            </li>
                                          ))}
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

export default ApeCoin;
