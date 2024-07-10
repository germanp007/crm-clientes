import React, { useContext, useEffect, useState } from "react";
import PedidoContext from "../../context/pedidos/PedidoContext";

const DetalleProducto = ({ producto }) => {
  const [cantidad, setCantidad] = useState(0);
  const pedidoContext = useContext(PedidoContext);
  const { agregarCantidad } = pedidoContext;
  useEffect(() => {
    actualizarCantidad();
  }, [cantidad]);
  const actualizarCantidad = () => {
    const nuevoProducto = { ...producto, cantidad: Number(cantidad) };
    agregarCantidad(nuevoProducto);
  };
  return (
    <div
      className="md:flex md:justify-between md:items-center mt-5 "
      key={producto.id}
    >
      <div className="md:w-2/4 mb-2 md:mb-0">
        <p className="font-semibold mb-3 text-gray-700">
          Producto: {producto.nombre}
        </p>
        <p className="font-bold mb-3 text-gray-700">
          Precio: ${producto.precio}{" "}
        </p>
      </div>
      <input
        type="number"
        placeholder="Cantidad"
        className="shadow appearance-none rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-none"
        onChange={(e) => setCantidad(e.target.value)}
        value={cantidad}
      />
    </div>
  );
};

export default DetalleProducto;
