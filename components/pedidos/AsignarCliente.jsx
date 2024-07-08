import { useState, useEffect, useContext } from "react";
import Select from "react-select";
import { gql, useQuery } from "@apollo/client";
import PedidoContext from "../../context/pedidos/PedidoContext";

const OBTENER_CLIENTES_USUARIOS = gql`
  query obtenerClientesVendedor {
    obtenerClienteVendedor {
      id
      nombre
      apellido
      empresa
      email
    }
  }
`;

const AsignarCliente = () => {
  const [cliente, setCliente] = useState([]);

  // COntext de Pedidos

  const pedidosContext = useContext(PedidoContext);
  const { agregarCliente } = pedidosContext;

  // Consultar la Base de Datos

  const { data, loading, error } = useQuery(OBTENER_CLIENTES_USUARIOS);

  console.log(data);

  useEffect(() => {
    agregarCliente(cliente);
  }, [cliente]);

  const seleccionarCliente = (cliente) => {
    setCliente(cliente);
  };

  //Resultados de la Consulta
  if (loading) return null;

  const { obtenerClienteVendedor } = data;

  return (
    <>
      <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 text-sm font-bold">
        1.- Asigna un Cliente al pedido
      </p>
      <Select
        className="mt-3"
        options={obtenerClienteVendedor}
        // isMulti={true}
        onChange={(option) => seleccionarCliente(option)}
        getOptionValue={(opciones) => opciones.id}
        getOptionLabel={(opciones) => opciones.nombre}
        placeholder="Seleccione el cliente"
        noOptionsMessage={() => "No hay resultados"}
      />
    </>
  );
};

export default AsignarCliente;
