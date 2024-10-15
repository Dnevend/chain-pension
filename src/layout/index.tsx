import { Outlet, NavLink, Link } from "react-router-dom";
import { ConnectKitButton } from "connectkit";
import { PUBLIC_URL } from "@/config";

const Background = () => {
  return (
    <div className="fixed left-0 top-0 h-full w-full">
      <div className="relative h-full w-full bg-white">
        <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>
    </div>
  );
};

export const Layout = () => {
  const menus = [
    {
      name: "投保",
      path: "/bill",
    },
    {
      name: "方案预算",
      path: "/calc",
    },
    // {
    //   name: "基金",
    //   path: "/fund",
    // },
  ];

  return (
    <>
      <Background />

      <div className={"relative inset-0 w-screen flex flex-col min-h-screen"}>
        <header className="flex items-center justify-between px-4 sm:px-12 py-4">
          <div className="flex items-center">
            <Link to="/" className="text-black text-xl sm:text-2xl font-bold">
              ChainPension
            </Link>

            <menu className="px-6 hidden sm:block">
              <ul className="flex gap-4">
                {menus.map((menu) => (
                  <li key={menu.path} className="h-4">
                    <NavLink
                      to={menu.path}
                      className={({ isActive }) =>
                        isActive
                          ? "font-semibold text-blue-500"
                          : "text-gray-500"
                      }
                    >
                      {menu.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </menu>
          </div>

          <ConnectKitButton />
        </header>

        <main className="flex-1">
          <Outlet />
        </main>

        <footer className="py-4">
          <p className="text-center">
            Bethink@2024 x{" "}
            <a href={PUBLIC_URL.FrontRepo} target="_blank">
              ChainPension
            </a>
          </p>
        </footer>
      </div>
    </>
  );
};
