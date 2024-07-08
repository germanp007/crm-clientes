import React, { useContext } from "react";
import PedidoContext from "../../context/pedidos/PedidoContext";
import DetalleProducto from "./DetalleProducto";

const ResumenPedido = () => {
  const pedidoContext = useContext(PedidoContext);
  const { productos } = pedidoContext;
  return (
    <>
      {" "}
      <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 text-sm font-bold">
        3.- Ajusta las cantidades del Producto
      </p>
      {productos.length > 0 ? (
        productos.map((producto) => <DetalleProducto producto={producto} />)
      ) : (
        <div
          className="my-5 bg-white shadow-md px-5
        py-10 rounded-lg"
        >
          <p className="font-bold mb-3 text-gray-700">Aun No Hay Productos</p>
        </div>
      )}
    </>
  );
};

export default ResumenPedido;
