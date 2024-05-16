import Head from "next/head";

import Sidebar from "../components/Sidebar";
const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>CRM - Administrador de Cliente</title>
        {/* <script src="https://cdn.tailwindcss.com"></script> */}
      </Head>
      <div className="bg-gray-400 w-full min-h-screen flex">
        <Sidebar />
        <main className="sm:w-2/3 lg:w-4/5 min-h-screen p-5">{children}</main>
      </div>
    </>
  );
};

export default Layout;
