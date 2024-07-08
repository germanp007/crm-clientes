import { useState, useEffect } from "react";
import Select from "react-select";
const AsignarCliente = () => {
  const [cliente, setCliente] = useState([]);
  const options = [
    { id: 1, nombre: "Jose" },
    { id: 2, nombre: "Maria" },
    { id: 3, nombre: "Rebeca" },
  ];

  useEffect(() => {
    console.log(cliente);
  }, [cliente]);

  const seleccionarCliente = (sabores) => {
    setCliente(sabores);
  };
  return (
    <Select
      options={options}
      isMulti={true}
      onChange={(option) => seleccionarCliente(option)}
      getOptionValue={(opciones) => opciones.id}
      getOptionLabel={(opciones) => opciones.nombre}
      placeholder="Seleccione el cliente"
      noOptionsMessage={() => "No hay resultados"}
    />
  );
};

export default AsignarCliente;
