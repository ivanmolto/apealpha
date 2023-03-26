import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import Index from "./routes/index";
import ApeCoin from "./routes/ape-coin";
import Governance from "./routes/governance";
import Treasury from "./routes/treasury";
import Staking from "./routes/staking";
import NoMatch from "./routes/no-match";
import ErrorPage from "./error-page";
import { Mainnet, DAppProvider } from "@usedapp/core";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: `https://eth-mainnet.g.alchemy.com/v2/${
      import.meta.env.VITE_ALCHEMY_API_KEY
    }`,
  },
};

const client = new ApolloClient({
  uri: "https://hub.snapshot.org/graphql",
  cache: new InMemoryCache(),
});
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
          {
            path: "apecoin",
            element: <ApeCoin />,
          },
          {
            path: "governance",
            element: <Governance />,
          },
          {
            path: "treasury",
            element: <Treasury />,
          },
          {
            path: "staking",
            element: <Staking />,
          },
          {
            path: "*",
            element: <NoMatch />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <ApolloProvider client={client}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ApolloProvider>
    </DAppProvider>
  </React.StrictMode>
);
