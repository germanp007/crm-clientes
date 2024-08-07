import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { gql, useQuery } from "@apollo/client";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
const MEJORES_CLIENTES = gql`
  query MejoresClientes {
    mejoresClientes {
      total
      cliente {
        nombre
        apellido
      }
    }
  }
`;

const MejoresClientes = () => {
  const { data, loading, error, startPolling, stopPolling } =
    useQuery(MEJORES_CLIENTES);

  useEffect(() => {
    startPolling(1000);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);

  if (loading) return "Cargando...";

  const { mejoresClientes } = data;

  const graphicClientes = [];

  mejoresClientes.map((client, index) => {
    const { __typename, ...datosCliente } = client.cliente[0];

    graphicClientes[index] = {
      nombre: datosCliente.nombre + " " + datosCliente.apellido.slice(0, 1),
      total: client.total,
    };
  });
  console.log(graphicClientes);
  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Mejores Clientes</h1>
      <div className="mt-10 flex justify-center">
        <ResponsiveContainer width={"99%"} height={550}>
          <BarChart
            width={600}
            height={400}
            data={graphicClientes}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nombre" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="total"
              fill="#3182CE"
              activeBar={<Rectangle fill="blue" stroke="blue" />}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Layout>
  );
};

export default MejoresClientes;
