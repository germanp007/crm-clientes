import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
const Sidebar = () => {
  const router = useRouter();

  console.log(router.pathname);
  return (
    <aside className="bg-gray-800 sm:w-1/3 lg:w-1/5 sm:min-h-screen p-5 ">
      <div>
        <p className="text-2xl text-white font-black">CRM Clientes</p>
      </div>
      <nav className="mt-5">
        <ul className="text-white flex flex-col gap-3">
          <li className={router.pathname === "/" ? "bg-blue-800 p-3" : "p-3"}>
            <Link href="/">Clientes</Link>
          </li>
          <li
            className={
              router.pathname === "/pedidos" ? "bg-blue-800 p-3" : "p-3"
            }
          >
            {" "}
            <Link href="/pedidos">Pedidos</Link>
          </li>
          <li
            className={
              router.pathname === "/productos" ? "bg-blue-800 p-3" : "p-3"
            }
          >
            {" "}
            <Link href="/productos">Productos</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
