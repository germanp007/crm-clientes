import React, { useEffect } from "react";
import Layout from "../components/Layout";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  // ResponsiveContainer,
} from "recharts";
import { gql, useQuery } from "@apollo/client";

const MEJORES_VENDEDORES = gql`
  query MejoresVendedores {
    mejoresVendedores {
      vendedor {
        nombre
        apellido
      }
      total
    }
  }
`;
const MejoresVendedores = () => {
  const { data, loading, error, startPolling, stopPolling } =
    useQuery(MEJORES_VENDEDORES);

  useEffect(() => {
    startPolling(1000);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);

  if (loading) return "Cargando...";
  const { mejoresVendedores } = data;
  const graphicVendedor = [];

  mejoresVendedores.map((vendedor, index) => {
    /* 
    [
      {
        "__typename": "TopVendedores",
        "vendedor": [
          {
            "__typename": "Usuario", <=== mejoresVendedores
            "nombre": "German",
            "apellido": "Pinto"
          }
                     ],
        "total": 3640
      }
    ] 

    */

    // Del Objeto extraemos los datos q necesitamos
    const { __typename, ...datosVendedor } = vendedor.vendedor[0];
    //Agregamos los datos del Vendedor q extraemos al array graphicVendedor
    graphicVendedor[index] = {
      ...datosVendedor,
      total: vendedor.total,
    };
  });
  console.log(graphicVendedor);
  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Mejores Vendedores</h1>
      <div className="mt-10 flex justify-center">
        <BarChart
          width={600}
          height={400}
          data={graphicVendedor}
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
      </div>
    </Layout>
  );
};

export default MejoresVendedores;
