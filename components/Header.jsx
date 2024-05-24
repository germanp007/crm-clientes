import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

const OBTENER_USUARIO = gql`
  query obtenerUsuario {
    obtenerUsuario {
      id
      nombre
      apellido
      email
    }
  }
`;

const Header = () => {
  const { data, loading, error, client } = useQuery(OBTENER_USUARIO);
  const router = useRouter();
  // Proteger que no accedamos a data antes de tener resultados
  if (loading) return null;

  // Si no hay data

  if (!data) {
    return router.push("/login");
  }
  const { nombre, apellido } = data.obtenerUsuario;

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    client.clearStore();
    router.push("/login");
  };
  return (
    <div className="flex justify-between items-center">
      <h2 className="mr-2 font-bold">
        {" "}
        Hola {nombre} {apellido}
      </h2>
      <button
        onClick={cerrarSesion}
        type="button"
        className="bg-blue-600 text-white p-2 rounded-lg shadow-md font-bold uppercase"
      >
        Cerrar Sesión
      </button>
    </div>
  );
};

export default Header;
