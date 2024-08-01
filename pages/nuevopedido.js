import React, { useContext, useState } from "react";
import Layout from "../components/Layout";
import AsignarCliente from "../components/pedidos/AsignarCliente";

import { useRouter } from "next/router";
import Swal from "sweetalert2";

// Context de Pedido
import PedidoContext from "../context/pedidos/PedidoContext";
import AsignarProducto from "../components/pedidos/AsignarProducto";
import ResumenPedido from "../components/pedidos/ResumenPedido";
import Total from "../components/pedidos/Total";
import { gql, useMutation, useQuery } from "@apollo/client";

const NUEVO_PEDIDO = gql`
  mutation NuevoPedido($input: PedidoInput) {
    nuevoPedido(input: $input) {
      id
    }
  }
`;

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

const NuevoPedido = () => {
  // Extraer el state y los funciones del context

  const pedidoContext = useContext(PedidoContext);
  const { cliente, productos, total } = pedidoContext;
  const [mensaje, setMensaje] = useState(null);
  const router = useRouter();

  // Mutation para crear nuevo pedido

  const [nuevoPedido] = useMutation(NUEVO_PEDIDO, {
    update(cache, { data: { nuevoPedido } }) {
      const { obtenerPedidosVendedor } = cache.readQuery({
        query: OBTENER_PEDIDOS,
      });
      cache.writeQuery({
        query: OBTENER_PEDIDOS,
        data: {
          obtenerPedidosVendedor: [...obtenerPedidosVendedor, nuevoPedido],
        },
      });
    },
  });

  const crearNuevoPedido = async () => {
    // Remover lo no deseado de productos
    const pedido = productos.map(
      ({ __typename, existencia, ...product }) => product
    );
    console.log(pedido);
    try {
      const { data } = await nuevoPedido({
        variables: {
          input: { cliente: cliente.id, total, pedido },
        },
      });
      console.log(data);

      // Redireccionar a Pedidos
      router.push("/pedidos");
      // Mostrar Alerta

      Swal.fire(
        "Pedido creado",
        "El pedido se ha creado correctamente",
        "success"
      );
    } catch (error) {
      setMensaje(error.message);
      setTimeout(() => {
        setMensaje(null);
      }, 3000);
    }
  };

  const validarPedido = () => {
    return !productos.every((producto) => producto.cantidad > 0) ||
      total === 0 ||
      cliente.legth === 0
      ? "opacity-50 cursor-not-allowed"
      : "";
  };

  const mostrarMensaje = () => {
    return (
      <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
        <p className="text-red-700">{mensaje}</p>
      </div>
    );
  };
  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Crear Nuevo Pedido</h1>
      {mensaje && mostrarMensaje()}
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
