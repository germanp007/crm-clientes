import Link from "next/link";
import Layout from "../components/Layout";
import { gql, useQuery } from "@apollo/client";
import Pedido from "../components/Pedido";

const OBTENER_PEDIDOS = gql`
  query ObtenerPedidosVendedor {
    obtenerPedidosVendedor {
      id
      pedido {
        id
        cantidad
        nombre
      }
      total
      cliente {
        id
        nombre
        apellido
        empresa
        telefono
        email
      }
      vendedor
      estado
    }
  }
`;

const Pedidos = () => {
  const { loading, error, data } = useQuery(OBTENER_PEDIDOS);

  if (loading) return "Cargando...";

  const { obtenerPedidosVendedor } = data;
  console.log(obtenerPedidosVendedor);
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
        {obtenerPedidosVendedor.length === 0 ? (
          <p className="mt-5 text-center text-2xl">No hay Pedidos aún</p>
        ) : (
          obtenerPedidosVendedor.map((pedido) => (
            <Pedido key={pedido.id} pedido={pedido} />
          ))
        )}
      </Layout>
    </div>
  );
};

export default Pedidos;
