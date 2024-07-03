import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Select from "react-select";
const NuevoPedido = () => {
  const [sabores, setSabores] = useState([]);
  const options = [
    { id: "chocolate", nombre: "Chocolate" },
    { id: "strawberry", nombre: "Strawberry" },
    { id: "vanilla", nombre: "Vanilla" },
  ];

  useEffect(() => {
    console.log(sabores);
  }, [sabores]);

  const agregarSabores = (sabores) => {
    setSabores(sabores);
  };

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Crear Nuevo Pedido</h1>;
      <Select
        options={options}
        isMulti={true}
        onChange={(option) => agregarSabores(option)}
        getOptionValue={(opciones) => opciones.id}
        getOptionLabel={(opciones) => opciones.nombre}
        placeholder="Seleccione sus sabores"
        noOptionsMessage={() => "No hay resultados"}
      />
    </Layout>
  );
};

export default NuevoPedido;
