import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import ApeCoin from "./routes/ape-coin";
import Governance from "./routes/governance";
import Treasury from "./routes/treasury";
import Staking from "./routes/staking";
import WalletProfiler from "./routes/wallet-profiler";
import Collections from "./routes/collections";
import ErrorPage from "./error-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
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
        path: "walletprofiler",
        element: <WalletProfiler />,
      },
      {
        path: "collections",
        element: <Collections />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
