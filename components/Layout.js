import Head from "next/head";
import { useRouter } from "next/router";
import Sidebar from "../components/Sidebar";
const Layout = ({ children }) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>CRM - Administrador de Cliente</title>
        {/* <script src="https://cdn.tailwindcss.com"></script> */}
      </Head>
      {router.pathname === "/login" || router.pathname === "/nuevacuenta" ? (
        <div className="bg-gray-800 min-h-screen w-full flex justify-center items-center">
          {children}
        </div>
      ) : (
        <div className="bg-gray-200 w-full min-h-screen flex">
          <Sidebar />
          <main className="sm:w-2/3 lg:w-4/5 min-h-screen p-5">{children}</main>
        </div>
      )}
    </>
  );
};

export default Layout;
