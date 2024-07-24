import React from "react";

const Pedido = ({ pedido }) => {
  const { id, total, cliente, estado } = pedido;
  return (
    <div className="mt-4 bg-white rounded p-6 md:grid md: grid-cols-2 md:gap-4 shadow-lg">
      <div>
        <p className="font-bold text-gray-800">Cliente: {id}</p>

        <h2 className="font-bold text-gray-800">Estado Pedido: </h2>
        <select className="mt-2 appearance-none bg-blue-600 border border-blue-600 text-white p-2 text-center rounded leading-tight focus:outline-none focus:bg-blue-600 focus:border-blue-500 uppercase text-xs font-bold">
          <option value="completado">COMPLETADO</option>
          <option value="pendiente">PENDIENTE</option>
          <option value="cancelado">CANCELADO</option>
        </select>
      </div>
      <div></div>
    </div>
  );
};

export default Pedido;
