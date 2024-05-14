import Head from "next/head";
import Layout from "../components/layout.js";

export default function Home() {
  return (
    <div>
      <Head>
        <title>CRM - Administrador de Cliente</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>

      <Layout>
        <h2>Desde Index</h2>
      </Layout>
    </div>
  );
}
