import { useQuery } from "@tanstack/react-query";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronRightIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/20/solid";

const addresses = [
  { id: 1, wallet: "0x93F91d1B3ACDf78894e99930eEE6C07326992434" },
  { id: 2, wallet: "0x5b53Ef8F2Bc6315eBedD8c536498C76773404Fd8" },
  { id: 3, wallet: "0xd3E14f2C63110B2068e912b1b34028025CD9c5A3" },
  { id: 4, wallet: "0x20FaCCBecf9CbEd05A56aF16fa8EE729dCb53DCa" },
  { id: 5, wallet: "0xB436b866246F6917ACF4E32999F8710759584ce3" },
  { id: 6, wallet: "0xf9f4fD27b9711d4558092954379D6d6625ccbcd5" },
  { id: 7, wallet: "0xDf1925127bd2c58cC76672679cA64da1Ea058942" },
  { id: 8, wallet: "0x2b27d10c7764675466f0fcBC575fc241fac0d2af" },
  { id: 9, wallet: "0xbBBe1442975FB8611449e1049A234aaCC07bA685" },
  { id: 10, wallet: "0x0939444549E4CCc0c045bfDF5E7d7d29C66923BA" },
  { id: 11, wallet: "0xF4dBa63012f0ef4908B6fe000962620Cf9E85835" },
  { id: 12, wallet: "0x878c760925E369722DAF83B7EA25FA95e9D5E1C0" },
  { id: 13, wallet: "0x080C19E8343E3cc906a0008D99B502b61490F44d" },
  { id: 14, wallet: "0x04A7d5a4F4CB63b78DBB8C4Fa7957dEDBce137b2" },
  { id: 15, wallet: "0xCa800A780ac0a630cb88C94EE128826e52a6e186" },
  { id: 16, wallet: "0x65E1D755B08A99057d5DCC05c8C974F65A06c6F5" },
  { id: 17, wallet: "0xb1703A3D3abf580fDd6943F3d82cAC89e60F1Bea" },
  { id: 18, wallet: "0x573FABB99F0d8e13e64952F845C2F7aD26b6Ed36" },
  { id: 19, wallet: "0xd4E518E242499AE7D228f7E8c8414d30694aF7D4" },
  { id: 20, wallet: "0x8cf0c3C45a78Ac181486F26C5C4EBBa2dBeDF9e7" },
  { id: 21, wallet: "0x64e252a4034c3524A052B2Cc4Febaf23f03b93e3" },
  { id: 22, wallet: "0x42e0346C698Ae7e9f1E3d37610BF7445be35C92a" },
  { id: 23, wallet: "0x29068ac68645FfeB0303BD2112fa85dEacC5B559" },
  { id: 24, wallet: "0xED491A66de351c1A86fF209E2A3D205854e36712" },
  { id: 25, wallet: "0xeBa8643fA21C1b010C830cF0d722091f8Fd7cf61" },
  { id: 26, wallet: "0x2e25C263820bb061377F8838774644F50BC2fee8" },
  { id: 27, wallet: "0x8290332ae839F998E2d125e53b9C06B77F8Da2C6" },
  { id: 28, wallet: "0x49501183D1038825c22a18Af76736e6c62eC29de" },
  { id: 29, wallet: "0x9CDaB911d364FfD165bdA26C70f7E2A7E0a8dD90" },
  { id: 30, wallet: "0x2e044fED0291F1bBF306C64A356a121Ca1786dbd" },
  { id: 31, wallet: "0x570E85226480Ed2e03EE3e7d1971504F3aC6f0eb" },
  { id: 32, wallet: "0x4cE5CED89eAFf7962E8723F7cf54Aa01ca7e9147" },
  { id: 33, wallet: "0x34C49388D00a5839405bC433579DBd8571290E31" },
  { id: 34, wallet: "0xd449f90a29FB25eA37177dd9e65f67a2F5621D58" },
  { id: 35, wallet: "0x82e57DdD56124841190E82117f3B7F49D3FF9758" },
  { id: 36, wallet: "0x7E185Fb9Ad7EF79ba359956Dd7D73a1595f65524" },
  { id: 37, wallet: "0xCF4a941D81B394D52f2aEC8C6765CCB48E736D50" },
  { id: 38, wallet: "0xb269F4f01174b04918dF9619fD9613E6c41d1800" },
  { id: 39, wallet: "0x995348aEdDF842B88772E7D35858fc2D88A9Ba23" },
  { id: 40, wallet: "0x4f4C4F48a5c5B179b8FABAf200F24142CdF68bdB" },
  { id: 41, wallet: "0xC68709b676bA479E68e356ca4eC087a83198ec07" },
  { id: 42, wallet: "0x8f225Dc9a2A4C361FEd5D91EBaECa1173FdaA9D4" },
  { id: 43, wallet: "0xf9e916b9Ef59D14869a402eBF93Dd933c4200555" },
  { id: 44, wallet: "0xc21b5cFD7BB9076Bb90BEE2D0405f117658F5EFe" },
  { id: 45, wallet: "0xeb95385C0ABc39967130abe0B4d307722b9741e6" },
  { id: 46, wallet: "0x899FaDc2bff5cd2A36162d4f30BD01B61e292017" },
  { id: 47, wallet: "0x7C35EA45dDc392F1d15e7b7D96510b49B118c915" },
  { id: 48, wallet: "0x767196B10Be078A36831c3b19A2DCCCefc378ADF" },
  { id: 49, wallet: "0x9F4bb0c99EDFDCdac75E2D0BA9a3a3fc51D30403" },
  { id: 50, wallet: "0xdc466CF79809eD5FD049C56C7E378bFFD195A0Ce" },
  { id: 51, wallet: "0x1f0e667A6e893D88D8177A9d6307E34F8Aa495a1" },
  { id: 52, wallet: "0xE0B3a77693191a69A4b157bFCf721cCf7308249a" },
  { id: 53, wallet: "0xfA17A73b83539b8A127444516FCbc6071018761b" },
  { id: 54, wallet: "0x329E2443009046Ee787FBFebE98985db8566892E" },
  { id: 55, wallet: "0x92bf0980292a28c3E892F9954a261DDC99E0bd1E" },
  { id: 56, wallet: "0x95A4a2a314681Fbfa5DB40E7d70F3f78556fa935" },
  { id: 57, wallet: "0x3a47ABF085cD75156E38EdAAABD12Bbdda84109f" },
  { id: 58, wallet: "0xa5867fbAf0460b84E5d0b4230BBA81F8e18Ab45f" },
  { id: 59, wallet: "0xA89bBC5231f0C793181180CfB148A29aC87Ae6D7" },
  { id: 60, wallet: "0xB14D61d21aeB0D60A877ecD31d507f6914f62075" },
  { id: 61, wallet: "0x58b99E549b46FE8703dB8d9Cd7873484e2aA0761" },
  { id: 62, wallet: "0xA8D203924B908be655b2CEEBA78DF4929880e9Dc" },
  { id: 63, wallet: "0xD1DAE15d953B0d644B5A078ad9619AceAD3d3328" },
  { id: 64, wallet: "0x340ec0453c99342B96E0e4FcC32cA82093A262cA" },
  { id: 65, wallet: "0xE6e7C90566A80acC801E643E20C17d2D98C2B0E7" },
  { id: 66, wallet: "0x9b645E4C288989eDfD644caAE5610E0CdE508392" },
  { id: 67, wallet: "0x33f662b9665C1A59b937BeB803c30f6274c956F6" },
  { id: 68, wallet: "0x2278879C60fAF01cb5Af93ea2d6d7396812Dc068" },
  { id: 69, wallet: "0xA3952e06bE81392c2f474A4414026ec2bd22BAFc" },
  { id: 70, wallet: "0xD456077b0968B176330CFb6dcf830352cAa98B3f" },
  { id: 71, wallet: "0xe3e5e311467D056CA183EA60a301a00Da862C9A6" },
  { id: 72, wallet: "0x9c0499542Bd582DbCBD0e0B121312d4B887ceBBe" },
  { id: 73, wallet: "0xCC8738f4Aea5149fDA2dCF01dB217212A61EeEBE" },
  { id: 74, wallet: "0xEf1A56Cd0A028A2c91662D79aB98C03876C756E1" },
  { id: 75, wallet: "0x9fe83EDC069Ad74823fAB0cEb2Ce3Be7734781f9" },
  { id: 76, wallet: "0x132c117D4a190d79728F520F5EAde2D28E57e885" },
  { id: 77, wallet: "0x76Fd93fDc41cD798F020f6b4567e6A6Aeb0e37F6" },
  { id: 78, wallet: "0x9b154d11D7AFB370A48e52a014EC1E2Eb452C96F" },
  { id: 79, wallet: "0x1ad2C332259a89a0082925F3a80fD9934d604284" },
  { id: 80, wallet: "0x3a04c799D5c90d9d50b97Dadc66A24316BFCca21" },
  { id: 81, wallet: "0x5f36E3B9b74bAcA7447eDc814d2DB961C355Ccaf" },
  { id: 82, wallet: "0x06C76E90dBA43b8860689A54367C976FFAFF4aee" },
  { id: 83, wallet: "0x27E3B2756595995FB9116050154F477aab7Ec4Bb" },
  { id: 84, wallet: "0xC1452254a7294eFE71Ae8F97b185A7BeaA99a5Ff" },
  { id: 85, wallet: "0xbC559Fc66ee576A8d134E3C1D6e5D2627dd92c07" },
  { id: 86, wallet: "0x51c5ADDA787DD02Ba2deC58b66bbfE5158Fe81B6" },
  { id: 87, wallet: "0xA91D3C320e26e46b38fAF6F5FD01E75749cB5c68" },
  { id: 88, wallet: "0x01d540399ca56038E166C5EAE93eA133D8008A16" },
  { id: 89, wallet: "0xd117960266c3Dd4FCb737E3FFb43eb21a1eCC1F3" },
  { id: 90, wallet: "0xccCb6ce4fb2269C8f7934b8fD8e93E9eE3237a77" },
  { id: 91, wallet: "0x28Ac4FcC5C9a44b518Ac9185BaA1294c7B60d124" },
  { id: 92, wallet: "0xdF3A0486dE04b167fc1a99b9f48150c326CBcAFE" },
  { id: 93, wallet: "0xa9F2496d896E00084B5cb6A13A4Cf640E049c514" },
  { id: 94, wallet: "0x4618bA0e185Cc56AC8249e125a41c1B57A4df40e" },
  { id: 95, wallet: "0x9Ee13bc51F13Ee053A54026Abb9AB4Fa6127b9EC" },
  { id: 96, wallet: "0xB163DfB6601fe634c12DfCe6800aacAFc808F159" },
  { id: 97, wallet: "0xe3f382C2F0291c66EAb2E73E1dF3b917eAa1cEA6" },
  { id: 98, wallet: "0x20aF944Dbe8679Ed0DB83BacA6e8CFF175462dc9" },
  { id: 99, wallet: "0x780CBBe425E3A91f7305B427C8D440f34e745198" },
  { id: 100, wallet: "0xc139325d782e96A028217739557FF7aA898dE44d" },
];

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
  return <>{nativeBalanceQuery.data.balance / 10 ** 18} ETH</>;
}

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
              <a
                href={`https://etherscan.io/tx/${transaction.hash}`}
                className="block bg-white px-4 py-4 hover:bg-gray-50"
                rel="noreferrer"
                target="_blank"
              >
                <span className="flex items-center space-x-4">
                  <span className="flex flex-1 space-x-2 truncate">
                    <span className="flex flex-col truncate text-sm text-gray-500">
                      <span className="truncate">{transaction.hash}</span>
                      <span>
                        <span className="font-medium text-gray-900">
                          {transaction.value / 10 ** 18}
                        </span>{" "}
                        ETH
                      </span>
                      <time dateTime={transaction.block_timestamp}>
                        {transaction.block_timestamp.slice(0, 10)}
                      </time>
                    </span>
                  </span>
                  <ChevronRightIcon
                    className="h-5 w-5 flex-shrink-0 text-apelight"
                    aria-hidden="true"
                  />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

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

function numberWithCommas(rawNumber) {
  return rawNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Treasury = () => {
  const [selected, setSelected] = useState(addresses[0]);
  return (
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
                    <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:leading-9">
                      Treasury
                    </h1>
                    <p className="mt-1 max-w-2xl text-base text-gray-500">
                      Wallets holding tokens alloted to the ApeCoin DAO treasury
                      and resources.
                    </p>
                  </div>

                  <div className="mt-2 space-y-6 sm:space-y-5">
                    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                      <Listbox value={selected} onChange={setSelected}>
                        {({ open }) => (
                          <>
                            <Listbox.Label className="block mt-2 text-base font-medium leading-6 text-gray-900">
                              Treasury Wallet Addresses
                            </Listbox.Label>
                            <div className="relative mt-1">
                              <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-apelight sm:text-sm sm:leading-6">
                                <span className="block truncate">
                                  {selected.wallet}
                                </span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                  <ChevronUpDownIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                  />
                                </span>
                              </Listbox.Button>

                              <Transition
                                show={open}
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                              >
                                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                  {addresses.map((address) => (
                                    <Listbox.Option
                                      key={address.id}
                                      className={({ active }) =>
                                        classNames(
                                          active
                                            ? "bg-apelight text-white"
                                            : "text-gray-900",
                                          "relative cursor-default select-none py-2 pl-3 pr-9"
                                        )
                                      }
                                      value={address}
                                    >
                                      {({ selected, active }) => (
                                        <>
                                          <span
                                            className={classNames(
                                              selected
                                                ? "font-semibold"
                                                : "font-normal",
                                              "block truncate"
                                            )}
                                          >
                                            {address.wallet}
                                          </span>

                                          {selected ? (
                                            <span
                                              className={classNames(
                                                active
                                                  ? "text-white"
                                                  : "text-apelight",
                                                "absolute inset-y-0 right-0 flex items-center pr-4"
                                              )}
                                            >
                                              <CheckIcon
                                                className="h-5 w-5"
                                                aria-hidden="true"
                                              />
                                            </span>
                                          ) : null}
                                        </>
                                      )}
                                    </Listbox.Option>
                                  ))}
                                </Listbox.Options>
                              </Transition>
                            </div>
                          </>
                        )}
                      </Listbox>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="mt-8 -mb-8 text-lg font-medium leading-6 text-gray-900">
                  Overview
                </h2>
              </div>
            </div>
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
                        src={`https://cdn.stamp.fyi/avatar/${selected.wallet}?s=32`}
                        alt={selected.account}
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
                              href={`https://etherscan.io/address/${selected.wallet}`}
                              className="text-apelight hover:underline"
                              rel="noreferrer"
                              target="_blank"
                            >
                              {selected.wallet.slice(0, 8) +
                                "..." +
                                selected.wallet.slice(-8)}
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
                          APE balance
                        </dt>
                        <dd>
                          <div className="text-md font-medium text-gray-900">
                            <Balance account={selected.wallet} />
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
                            <NativeBalance account={selected.wallet} />
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Activity account={selected.wallet} />
        </div>
      </main>
    </div>
  );
};

export default Treasury;
