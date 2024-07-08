import {
  SELECCIONAR_CLIENTE,
  SELECCIONAR_PRODUCTO,
  CANTIDAD_PRODUCTOS,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case SELECCIONAR_CLIENTE:
      return;
    case SELECCIONAR_PRODUCTO:
      return;
    case CANTIDAD_PRODUCTOS:
      return;

    default:
      return state;
  }
};
