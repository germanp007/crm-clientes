import React from "react";
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

// const data = [
//   {
//     name: "Page A",
//     uv: 4000,
//     pv: 4400,
//     amt: 2400,
//   },
//   {
//     name: "Page B",
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: "Page C",
//     uv: 2000,
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: "Page D",
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: "Page E",
//     uv: 1890,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: "Page F",
//     uv: 2390,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: "Page G",
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ];

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
  const { data, loading, error } = useQuery(MEJORES_VENDEDORES);

  console.log(data);
  console.log(loading);
  console.log(error);

  if (loading) return "Cargando...";
  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Mejores Vendedores</h1>
      <div className="mt-10 flex justify-center">
        <BarChart
          width={600}
          height={400}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="pv"
            fill="#3182CE"
            activeBar={<Rectangle fill="blue" stroke="blue" />}
          />
        </BarChart>
      </div>
    </Layout>
  );
};

export default MejoresVendedores;
