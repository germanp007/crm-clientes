import React, { useState } from "react";
import Select from "react-select";
import { gql, useQuery } from "@apollo/client";

const OBTENER_PRODUCTOS = gql`
  query ObtenerProductos {
    obtenerProductos {
      id
      nombre
      existencia
      precio
    }
  }
`;

const AsignarProducto = () => {
  const [products, setProducts] = useState([]);
  //Obtener query de la Base de Datos
  const { data, loading, error } = useQuery(OBTENER_PRODUCTOS);
  if (loading) return <p>Cargando...</p>;

  const { obtenerProductos } = data;
  const seleccionarProducto = (product) => {
    setProducts((prev) => [...prev, product]);
  };
  return (
    <>
      <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 text-sm font-bold">
        2.- Asigna un Producto al pedido
      </p>
      <Select
        className="mt-3"
        options={obtenerProductos}
        // isMulti={true}
        onChange={(option) => seleccionarProducto(option)}
        getOptionValue={(opciones) => opciones.id}
        getOptionLabel={(opciones) => opciones.nombre}
        placeholder="Seleccione el producto"
        noOptionsMessage={() => "No hay resultados"}
      />
    </>
  );
};

export default AsignarProducto;
