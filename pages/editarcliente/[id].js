import { useRouter } from "next/router";
import React from "react";

const EditarCliente = () => {
  // obtener el Id Actual
  const router = useRouter();
  const {
    query: { id },
  } = router;
  console.log(id);
  return <h1>Desde Editar</h1>;
};

export default EditarCliente;
