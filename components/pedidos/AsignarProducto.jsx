import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import { gql, useQuery } from "@apollo/client";
import PedidoContext from "../../context/pedidos/PedidoContext";

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

  // Acceder al Estado Global

  const pedidosContext = useContext(PedidoContext);
  const { agregarProducto } = pedidosContext;

  //Obtener query de la Base de Datos
  const { data, loading, error } = useQuery(OBTENER_PRODUCTOS);

  useEffect(() => {
    // TODO: Funcion para pasar a PedidosState
    agregarProducto(products);
  }, [products]);
  //   agregarProducto(products);

  const seleccionarProducto = (product) => {
    setProducts(product);
  };

  if (loading) return <p>Cargando...</p>;

  const { obtenerProductos } = data;
  return (
    <>
      <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 text-sm font-bold">
        2.- Asigna un Producto al pedido
      </p>
      <Select
        className="mt-3"
        options={obtenerProductos}
        isMulti={true}
        onChange={(option) => seleccionarProducto(option)}
        getOptionValue={(opciones) => opciones.id}
        getOptionLabel={(opciones) =>
          `${opciones.nombre} - ${opciones.existencia} Disponible`
        }
        placeholder="Seleccione el producto"
        noOptionsMessage={() => "No hay resultados"}
      />
    </>
  );
};

export default AsignarProducto;
