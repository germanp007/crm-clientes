import React, { useContext } from "react";
import Layout from "../components/Layout";
import AsignarCliente from "../components/pedidos/AsignarCliente";

// Context de Pedido
import PedidoContext from "../context/pedidos/PedidoContext";
import AsignarProducto from "../components/pedidos/AsignarProducto";
import ResumenPedido from "../components/pedidos/ResumenPedido";
import Total from "../components/pedidos/Total";
import { gql, useMutation } from "@apollo/client";

const NUEVO_PEDIDO = gql`
  mutation NuevoPedido($input: PedidoInput) {
    nuevoPedido(input: $input) {
      id
    }
  }
`;

const NuevoPedido = () => {
  // Extraer el state y los funciones del context

  const pedidoContext = useContext(PedidoContext);
  const { cliente, productos, total } = pedidoContext;

  // Mutation para crear nuevo pedido

  const [nuevoPedido] = useMutation(NUEVO_PEDIDO);

  const crearNuevoPedido = async () => {
    // Remover lo no deseado de productos
    const pedido = productos.map(
      ({ __typename, existencia, ...product }) => product
    );
    console.log(pedido);
    // try {
    //   const { data } = await nuevoPedido({
    //     variables: {
    //       cliente: cliente.id,
    //       total,
    //     },
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const validarPedido = () => {
    return !productos.every((producto) => producto.cantidad > 0) ||
      total === 0 ||
      cliente.legth === 0
      ? "opacity-50 cursor-not-allowed"
      : "";
  };
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
            className={`bg-gray-800 text-white rounded w-full mt-6 p-3 hover:bg-slate-500 ${validarPedido()}`}
            onClick={() => crearNuevoPedido()}
          >
            Registrar Pedido
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default NuevoPedido;
