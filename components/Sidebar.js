import React from "react";

const Sidebar = () => {
  return (
    <div className="bg-gray-800 sm:w-1/3 lg:w-1/5 p-3">
      <h2 className="font-bold text-white">Sidebar</h2>
      <ul className="font-bold text-white">
        <li>Contactos</li>
        <li>Clientes</li>
        <li>Nosotros</li>
        <li>Ellos</li>
      </ul>
    </div>
  );
};

export default Sidebar;
