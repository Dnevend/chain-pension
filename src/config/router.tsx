import { createBrowserRouter } from "react-router-dom";
import { Layout } from "@/layout";
import Landing from "@/pages/landing";
import Bill from "@/pages/bill";
import Fund from "@/pages/fund";
import Calc from "@/pages/calc";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/calc",
        element: <Calc />,
      },
      {
        path: "/bill",
        element: <Bill />,
      },
      {
        path: "/fund",
        element: <Fund />,
      },
    ],
  },
]);
