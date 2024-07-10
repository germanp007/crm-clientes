import React, { useReducer } from "react";
import PedidoContext from "./PedidoContext";
import PedidoReducer from "./PedidoReducer";
import {
  SELECCIONAR_CLIENTE,
  SELECCIONAR_PRODUCTO,
  CANTIDAD_PRODUCTOS,
} from "../../types";

const PedidoState = ({ children }) => {
  // State de pedidos
  const initialState = {
    cliente: {},
    productos: [],
    total: 0,
  };

  const [state, dispatch] = useReducer(PedidoReducer, initialState);

  // Modifica el cliente

  const agregarCliente = (cliente) => {
    // console.log(cliente);
    dispatch({
      type: SELECCIONAR_CLIENTE,
      payload: cliente,
    });
  };

  const agregarProducto = (selectedProduct) => {
    // console.log(selectedProduct);
    let nuevoState;

    if (state.productos.length > 0) {
      nuevoState = selectedProduct.map((producto) => {
        const nuevoObjeto = state.productos.find(
          (productoState) => productoState.id === producto.id
        );
        return {
          ...producto,
          ...nuevoObjeto,
        };
      });
    } else {
      nuevoState = selectedProduct;
    }
    dispatch({
      type: SELECCIONAR_PRODUCTO,
      payload: nuevoState,
    });
  };

  //Modifica las cantidades de Productos
  const agregarCantidad = (nuevoProducto) => {
    dispatch({
      type: CANTIDAD_PRODUCTOS,
      payload: nuevoProducto,
    });
  };
  return (
    <PedidoContext.Provider
      value={{
        productos: state.productos,
        agregarCliente,
        agregarProducto,
        agregarCantidad,
      }}
    >
      {children}
    </PedidoContext.Provider>
  );
};

export default PedidoState;
