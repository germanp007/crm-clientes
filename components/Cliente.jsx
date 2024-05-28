import Swal from "sweetalert2";
import { gql, useMutation } from "@apollo/client";

const ELIMINAR_CLIENTE = gql`
  mutation Mutation($eliminarClienteId: ID!) {
    eliminarCliente(id: $eliminarClienteId)
  }
`;
const Cliente = ({ cliente }) => {
  // Mutation para eliminar cliente
  const [eliminarCliente] = useMutation(ELIMINAR_CLIENTE);
  const { nombre, apellido, empresa, email, id } = cliente;

  const confirmarEliminarCliente = (id) => {
    Swal.fire({
      title: "Deseas eliminar a este cliente?",
      text: "Esta acción no se puede deshacer!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar!",
    }).then(async (result) => {
      console.log(result);
      if (result.value)
        try {
          const { data } = await eliminarCliente({
            variables: {
              id,
            },
          });
          console.log(data);
          // Mensaje de Elimido
          Swal.fire({
            title: "Eliminado!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        } catch (error) {
          console.log(error);
        }
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
    </tr>
  );
};

export default Cliente;
