import Link from "next/link";
import Layout from "../components/Layout";

const Pedidos = () => {
  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Pedidos</h1>
        <Link
          href="/nuevopedido"
          className="bg-blue-800 py-2 px-5 mt-5 inline-block text-white rounded text-sm hover:bg-gray-400 uppercase font-bold"
        >
          Nuevo Pedido
        </Link>
      </Layout>
    </div>
  );
};

export default Pedidos;
