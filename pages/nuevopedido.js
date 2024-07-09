import React, { useContext } from "react";
import Layout from "../components/Layout";
import AsignarCliente from "../components/pedidos/AsignarCliente";

// Context de Pedido
import PedidoContext from "../context/pedidos/PedidoContext";
import AsignarProducto from "../components/pedidos/AsignarProducto";
import ResumenPedido from "../components/pedidos/ResumenPedido";
import Total from "../components/pedidos/Total";

const NuevoPedido = () => {
  // Extraer el state y los funciones del context

  const pedidoContext = useContext(PedidoContext);

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Crear Nuevo Pedido</h1>
      <div className="w-1/2 mx-auto mt-20">
        <div className="w-full">
          <AsignarCliente />
          <AsignarProducto />
          <ResumenPedido />
          <Total />
          <button
            type="buttom"
            className="bg-gray-800 text-white rounded w-full mt-6 p-3 hover:bg-slate-500"
          >
            Registrar Pedido
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default NuevoPedido;
