import { Link } from "react-router-dom";
import { ExternalLink, ChevronRight } from "lucide-react";
import { GlobeDemo } from "./components/Globe";
import { PUBLIC_URL } from "@/config";

const Landing = () => {
  return (
    <div className="mx-auto">
      <div className="relative overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-[url('https://preline.co/assets/svg/examples/polygon-bg-element.svg')] dark:before:bg-[url('https://preline.co/assets/svg/examples-dark/polygon-bg-element.svg')] before:bg-no-repeat before:bg-top before:bg-cover before:size-full before:-z-[1] before:transform before:-translate-x-1/2">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
          <div className="flex justify-center">
            <a
              className="inline-flex items-center gap-x-2 bg-white border border-gray-200 text-sm text-gray-800 p-1 ps-3 rounded-full transition hover:border-gray-300 focus:outline-none focus:border-gray-300 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200 dark:hover:border-neutral-600 dark:focus:border-neutral-600"
              href={PUBLIC_URL.ContractAddress}
              target="_blank"
            >
              Demo release - Online Contract
              <span className="py-1.5 px-2.5 inline-flex justify-center items-center gap-x-2 rounded-full bg-gray-200 font-semibold text-sm text-gray-600 dark:bg-neutral-700 dark:text-neutral-400">
                <svg
                  className="shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </span>
            </a>
          </div>

          <div className="mt-5 max-w-2xl text-center mx-auto">
            <h1 className="block font-bold text-gray-800 text-4xl md:text-5xl lg:text-6xl dark:text-neutral-200">
              链上
              <span className="bg-clip-text bg-gradient-to-tl from-blue-600 to-violet-600 text-transparent">
                养老金
              </span>
            </h1>
          </div>

          <div className="mt-5 max-w-3xl text-center mx-auto">
            <p>基于链上的养老基金项目</p>
            <p className="text-lg text-gray-600 dark:text-neutral-400">
              待补充：利用区块链及ZK证明，实现链上养老金...确保数据透明...利率...
            </p>
          </div>

          <div className="mt-8 gap-3 flex justify-center">
            <Link
              className="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 border border-transparent text-white text-sm font-medium rounded-md focus:outline-none focus:from-violet-600 focus:to-blue-600 py-3 px-4"
              to="/bill"
            >
              立即投保
              <ChevronRight />
            </Link>

            <Link
              type="button"
              to="/calc"
              className="relative group p-2 ps-3 inline-flex items-center gap-x-2 text-sm font-mono rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
            >
              方案预算
            </Link>
          </div>

          <div className="mt-5 flex justify-center items-center gap-x-1 sm:gap-x-3">
            <span className="text-sm text-gray-600 dark:text-neutral-400">
              Support:
            </span>
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              BTC / ETH / USDT
            </span>

            <svg
              className="size-5 text-gray-300 dark:text-neutral-600"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M6 13L10 3"
                stroke="currentColor"
                stroke-linecap="round"
              />
            </svg>
            <Link
              className="inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500"
              to={PUBLIC_URL.ProjectRepo}
              target="_blank"
            >
              Github Repo
              <ExternalLink size={16} />
            </Link>
          </div>
        </div>
      </div>

      <GlobeDemo />
    </div>
  );
};

export default Landing;
