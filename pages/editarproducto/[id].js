import React from "react";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
const EditarProducto = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  return (
    <Layout>
      <div>Editar Producto</div>
    </Layout>
  );
};

export default EditarProducto;
