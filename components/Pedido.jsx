import React, { useEffect, useState } from "react";

const Pedido = ({ pedido }) => {
  const {
    id,
    total,
    cliente: { nombre, apellido, telefono, email },
    estado,
  } = pedido;
  const [estadoPedido, setEstadoPedido] = useState(estado);

  useEffect(() => {
    if (estadoPedido) {
      setEstadoPedido(estadoPedido);
    }
  }, [estadoPedido]);

  return (
    <div className="mt-4 bg-white rounded p-6 md:grid md: grid-cols-2 md:gap-4 shadow-lg">
      <div className="flex flex-col justify-between">
        <div>
          <p className="font-medium text-gray-600">
            Cliente:{" "}
            <span className="font-bold text-gray-800">
              {nombre} {apellido}
            </span>
          </p>
          <p className="font-medium text-gray-600 flex gap-1">
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
        </div>

        <div>
          <h2 className="font-bold text-gray-800">Estado Pedido: </h2>
          <select
            className="mt-2 appearance-none bg-blue-600 border border-blue-600 text-white p-2 text-center rounded leading-tight focus:outline-none focus:bg-blue-600 focus:border-blue-500 uppercase text-xs font-bold"
            value={estadoPedido}
          >
            <option value="completado">COMPLETADO</option>
            <option value="pendiente">PENDIENTE</option>
            <option value="cancelado">CANCELADO</option>
          </select>
        </div>
      </div>
      <div>
        <h2 className="text-grey-800 font-bold mt-2">Resumen del Pedido:</h2>
        {pedido.pedido.map((articulo) => (
          <div>
            <p className="text-sm text-gray-600">Producto: {articulo.nombre}</p>
            <p className="text-sm text-gray-600">
              Cantidad: {articulo.cantidad}
            </p>
          </div>
        ))}
        <p className="text-gray-800 mt-3 font-bold ">
          Total a Pagar:
          <span className="font-light"> ${total}</span>
        </p>
        <button className="uppercase text-xs font-bold flex gap-2 item-center mt-4 bg-red-800 px-5 py-2 text-white rounded leading-tight">
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
  );
};

export default Pedido;
