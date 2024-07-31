import React, { useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import Swal from "sweetalert2";
const ACTUALIZAR_ESTADO_PEDIDO = gql`
  mutation actualizarPedido($id: ID!, $input: PedidoInput) {
    actualizarPedido(id: $id, input: $input) {
      estado
    }
  }
`;

const ELIMINAR_PEDIDO = gql`
  mutation eliminarPedido($id: ID!) {
    eliminarPedido(id: $id)
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

const Pedido = ({ pedido }) => {
  const {
    id,
    total,
    cliente: { nombre, apellido, telefono, empresa, email },
    estado,
  } = pedido;
  const [estadoPedido, setEstadoPedido] = useState(estado);
  const [clase, setClase] = useState("");

  // MUTATION
  const [actualizarPedido] = useMutation(ACTUALIZAR_ESTADO_PEDIDO);
  const [eliminarPedido] = useMutation(ELIMINAR_PEDIDO, {
    update(cache) {
      // Obtener una copia del objeto cache
      const { obtenerPedidosVendedor } = cache.readQuery({
        query: OBTENER_PEDIDOS,
      });
      console.log(obtenerPedidosVendedor);
      // Reescribir cache
      cache.writeQuery({
        query: OBTENER_PEDIDOS,
        data: {
          obtenerPedidosVendedor: obtenerPedidosVendedor.filter(
            (pedido) => pedido.id !== id
          ),
        },
      });
    },
  });

  useEffect(() => {
    // if (estadoPedido) {
    //   setEstadoPedido(estadoPedido);
    // }
    agregarClase();
  }, [estadoPedido]);

  // Agregar Estilo dependiendo del Estado del PEDIDO
  const agregarClase = () => {
    if (estadoPedido === "PENDIENTE") {
      setClase("border-yellow-500");
    } else if (estadoPedido === "COMPLETADO") {
      setClase("border-green-500");
    } else {
      setClase("border-red-800");
    }
  };
  const cambioEstadoPedido = async (estado) => {
    try {
      const { data } = await actualizarPedido({
        variables: {
          id,
          input: { estado: estado, cliente: pedido.cliente.id, total },
        },
      });
      setEstadoPedido(data.actualizarPedido.estado);
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  const eliminarPedidoUi = async (id) => {
    Swal.fire({
      title: "¿Deseas eliminar este Pedido?",
      text: "¡Esta acción no se puede deshacer!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, Eliminar!",
    }).then(async (result) => {
      if (result.value) {
        try {
          // Eliminar por ID
          const { data } = await eliminarPedido({
            variables: { id: id },
          });
          console.log(data);
          // Mensaje de eliminado
          Swal.fire({
            title: "¡Eliminado!",
            text: "Pedido eliminado",
            icon: "success",
          });
        } catch (error) {
          console.log(error.message);
          Swal.fire({
            title: "Error",
            text: "Hubo un problema al eliminar el cliente.",
            icon: "error",
          });
        }
      } else {
        console.log("no se elimino", id);
      }
    });
  };
  return (
    <div
      className={`${clase} border-t-4 mt-4 bg-white rounded p-6 md:grid md: grid-cols-2 md:gap-4 shadow-lg`}
    >
      <div className="flex flex-col justify-between">
        <div className="flex flex-col gap-2">
          <p className="font-medium text-gray-600">
            Cliente:{" "}
            <span className="font-bold text-gray-800">
              {nombre} {apellido}
            </span>
          </p>
          <p className="font-medium text-gray-600 flex gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
            <span className="font-bold text-gray-800">{email}</span>
          </p>
          <p className="font-medium text-gray-600 flex gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
              />
            </svg>

            <span className="font-bold text-gray-800">{telefono}</span>
          </p>
          <p className="font-medium text-gray-600 flex gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
              />
            </svg>

            <span className="font-bold text-gray-800">{empresa}</span>
          </p>
        </div>

        <div>
          <h2 className="font-medium text-gray-600 mt-6">Estado Pedido: </h2>
          <select
            className="mt-2 appearance-none bg-blue-600 border border-blue-600 text-white p-2 text-center rounded leading-tight focus:outline-none focus:bg-blue-600 focus:border-blue-500 uppercase text-xs font-bold"
            value={estadoPedido}
            onChange={(e) => cambioEstadoPedido(e.target.value)}
          >
            <option value="COMPLETADO">COMPLETADO</option>
            <option value="PENDIENTE">PENDIENTE</option>
            <option value="CANCELADO">CANCELADO</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <div>
          <h2 className="text-grey-800 font-bold mt-2">Resumen del Pedido:</h2>
          {pedido.pedido.map((articulo) => (
            <div key={articulo.id}>
              <p className="text-sm text-gray-600">
                Producto: {articulo.nombre}
              </p>
              <p className="text-sm text-gray-600">
                Cantidad: {articulo.cantidad}
              </p>
            </div>
          ))}
        </div>

        <div>
          <p className="text-gray-800 mt-3 font-light">
            Total a Pagar:
            <span className="font-bold text-gray-800"> ${total}</span>
          </p>
          <button
            className="uppercase text-xs font-bold flex gap-2 item-center mt-4 bg-red-800 px-5 py-2 text-white rounded leading-tight"
            onClick={() => eliminarPedidoUi(id)}
          >
            Eliminar Pedido
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="size-4"
              fill="white"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pedido;
