import React, { useContext } from "react";
import PedidoContext from "../../context/pedidos/PedidoContext";

const Total = () => {
  const pedidoContext = useContext(PedidoContext);
  const { total } = pedidoContext;
  return (
    <div className="flex items-center mt-5 justify-between bg-gray-300 p-3 border-slate-600">
      <h1 className="text-gray-800 font-bold">Total a Pagar:</h1>
      <p className="text-gray-800 mt-0 font-extrabold">$ {total}</p>
    </div>
  );
};

export default Total;
