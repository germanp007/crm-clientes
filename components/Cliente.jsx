import Swal from "sweetalert2";
import { gql, useMutation } from "@apollo/client";
import Router from "next/router";
const ELIMINAR_CLIENTE = gql`
  mutation Mutation($id: ID!) {
    eliminarCliente(id: $id)
  }
`;

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
const Cliente = ({ cliente }) => {
  // Mutation para eliminar cliente
  const [eliminarCliente] = useMutation(ELIMINAR_CLIENTE, {
    update(cache) {
      // optener una copia del objeto de cache
      const { obtenerClienteVendedor } = cache.readQuery({
        query: OBTENER_CLIENTES_USUARIOS,
      });
      console.log(obtenerClienteVendedor);
      // reescribir el chache
      cache.writeQuery({
        query: OBTENER_CLIENTES_USUARIOS,
        data: {
          obtenerClienteVendedor: obtenerClienteVendedor.filter(
            (clienteActual) => clienteActual.id !== id
          ),
        },
      });
    },
  });
  const { nombre, apellido, empresa, email, id } = cliente;
  const confirmarEliminarCliente = (id) => {
    Swal.fire({
      title: "¿Deseas eliminar a este cliente?",
      text: "¡Esta acción no se puede deshacer!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, Eliminar!",
    }).then(async (result) => {
      if (result.value) {
        try {
          // Eliminar por ID
          const { data } = await eliminarCliente({
            variables: { id: id },
          });
          console.log(data);
          // Mensaje de eliminado
          Swal.fire({
            title: "¡Eliminado!",
            text: "Cliente eliminado",
            icon: "success",
          });
        } catch (error) {
          console.log(error.message);
          Swal.fire({
            title: "Error",
            text: "Hubo un problema al eliminar el cliente.",
            icon: "error",
          });
        }
      } else {
        console.log("no se elimino", id);
      }
    });
  };

  const editarCliente = (id) => {
    Router.push({
      pathname: "/editarcliente/[id]",
      query: { id },
    });
  };
  return (
    <tr>
      <td className="border px-4 py-2">
        {nombre} {apellido}
      </td>
      <td className="border px-4 py-2">{empresa}</td>
      <td className="border px-4 py-2">{email}</td>
      <td className="border px-4 py-2 ">
        <button
          className="flex justify-center gap-4 items-center bg-red-800 text-white font-bold py-1 px-4 rounded-md m-auto"
          type="button"
          onClick={() => confirmarEliminarCliente(id)}
        >
          Eliminar
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="size-6"
            fill="white"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </td>
      <td className="border px-4 py-2 ">
        <button
          className="flex justify-center gap-4 items-center bg-green-600 text-white font-bold py-1 px-4 rounded-md m-auto"
          type="button"
          onClick={() => editarCliente(id)}
        >
          Editar
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
        </button>
      </td>
    </tr>
  );
};

export default Cliente;
