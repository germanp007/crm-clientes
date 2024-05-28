import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import Cliente from "../components/Cliente";

const OBTENER_CLIENTES_USUARIOS = gql`
  query obtenerClientesVendedor {
    obtenerClienteVendedor {
      id
      nombre
      apellido
      empresa
      email
    }
  }
`;

export default function Home() {
  // Consulta de Apollo
  const router = useRouter();
  const { data, loading, error, client } = useQuery(OBTENER_CLIENTES_USUARIOS);

  if (loading) {
    return <p>Cargando...</p>;
  }
  if (!data) {
    client.clearStore();
    return router.push("/login");
  }
  // console.log(data);
  // console.log(loading);
  // console.log(error);
  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Clientes</h1>
        <Link
          href="/nuevocliente"
          className="bg-blue-800 py-2 px-5 mt-5 inline-block text-white rounded text-sm hover:bg-gray-400 uppercase font-bold"
        >
          Nuevo Cliente
        </Link>
        <table className="table-auto shadow-md mt-10 w-full w-lg">
          <thead className="bg-gray-800">
            <tr className="text-white ">
              <th className="w-1/5 py-2 ">Nombre</th>
              <th className="w-1/5 py-2 ">Empresa</th>
              <th className="w-1/5 py-2">EMail</th>
              <th className="w-1/5 py-2">Eliminar</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data?.obtenerClienteVendedor?.map((cliente) => (
              <Cliente key={cliente.id} cliente={cliente} />
            ))}
          </tbody>
        </table>
      </Layout>
    </div>
  );
}
