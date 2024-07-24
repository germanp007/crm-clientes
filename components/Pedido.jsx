import React, { useEffect, useState } from "react";

const Pedido = ({ pedido }) => {
  const { id, total, cliente, estado } = pedido;
  const [estadoPedido, setEstadoPedido] = useState(estado);

  useEffect(() => {
    if (estadoPedido) {
      setEstadoPedido(estadoPedido);
    }
  }, [estadoPedido]);

  return (
    <div className="mt-4 bg-white rounded p-6 md:grid md: grid-cols-2 md:gap-4 shadow-lg">
      <div>
        <p className="font-bold text-gray-800">Cliente: {id}</p>

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
        <button className="uppercase text-xs font-bold flex item-center mt-4 bg-red-800 px-5 py-2 text-white rounded leading-tight">
          Eliminar Pedido
        </button>
      </div>
    </div>
  );
};

export default Pedido;
