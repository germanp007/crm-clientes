import React from "react";

const DetalleProducto = ({ producto }) => {
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
      />
    </div>
  );
};

export default DetalleProducto;
