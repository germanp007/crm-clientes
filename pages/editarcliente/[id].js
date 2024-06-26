import { useRouter } from "next/router";
import React from "react";
import Layout from "../../components/Layout";
import { useQuery, gql, useMutation } from "@apollo/client";
import { Formik } from "formik";
import * as Yup from "yup";
const EditarCliente = () => {
  // obtener Cliente por ID

  const OBTENER_CLIENTE = gql`
    query obtenerCliente($id: ID!) {
      obtenerCliente(id: $id) {
        nombre
        apellido
        empresa
        email
        telefono
      }
    }
  `;

  // Schema para actualizar cliente con GRAPHQL

  const ACTUALIZAR_CLIENTE = gql`
    mutation actualizarCliente($id: ID!, $input: ClienteInput) {
      actualizarCliente(id: $id, input: $input) {
        nombre
        apellido
        empresa
        email
        telefono
      }
    }
  `;
  // obtener el Id Actual
  const router = useRouter();
  const {
    query: { id },
  } = router;

  // Consultar para obtener cliente

  const { data, loading, error } = useQuery(OBTENER_CLIENTE, {
    variables: {
      id,
    },
  });

  // Actualizar cliente
  const [actualizarCliente] = useMutation(ACTUALIZAR_CLIENTE);

  // Validacion con YUP

  const validationSchema = Yup.object({
    nombre: Yup.string().required("El nombre del cliente es obligatorio"),
    apellido: Yup.string().required("El apellido del cliente es obligatorio"),
    empresa: Yup.string().required("La empresa del cliente es obligatorio"),
    email: Yup.string().required("El email del cliente es obligatorio"),
    telefono: Yup.string().required("El telefono del cliente es obligatorio"),
  });

  if (loading) return "Cargando...";

  const { obtenerCliente } = data;

  // Modificar cliente en BD

  const actualizarInfoCliente = async (valores) => {
    const { nombre, apellido, empresa, email, telefono } = valores;

    try {
      const { data } = await actualizarCliente({
        variables: {
          id,
          input: {
            nombre,
            apellido,
            empresa,
            email,
            telefono,
          },
        },
      });
      console.log(data);
      // Mensaje de Actualizacion SweetAlert
      // Redireccionar al Usuario
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <h1>Editar Cliente</h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <Formik
            validationSchema={validationSchema}
            enableReinitialize
            initialValues={obtenerCliente}
            onSubmit={(value) => {
              actualizarInfoCliente(value);
            }}
          >
            {(props) => {
              return (
                <form
                  className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                  onSubmit={props.handleSubmit}
                >
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="nombre"
                    >
                      Nombre
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="nombre"
                      type="text"
                      placeholder="Nombre Cliente"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.nombre}
                    ></input>
                    {props.touched.nombre && props.errors.nombre ? (
                      <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                        <p className="font-bold">Error</p>
                        <p>{props.errors.nombre}</p>
                      </div>
                    ) : null}
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="apellido"
                    >
                      Apellido
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="apellido"
                      type="text"
                      placeholder="Apellido Cliente"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.apellido}
                    ></input>
                    {props.touched.apellido && props.errors.apellido ? (
                      <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                        <p className="font-bold">Error</p>
                        <p>{props.errors.apellido}</p>
                      </div>
                    ) : null}
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="empresa"
                    >
                      Empresa
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="empresa"
                      type="text"
                      placeholder="Empresa Cliente"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.empresa}
                    ></input>
                    {props.touched.empresa && props.errors.empresa ? (
                      <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                        <p className="font-bold">Error</p>
                        <p>{props.errors.empresa}</p>
                      </div>
                    ) : null}
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="email"
                      type="email"
                      placeholder="Email Cliente"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.email}
                    ></input>
                    {props.touched.email && props.errors.email ? (
                      <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                        <p className="font-bold">Error</p>
                        <p>{props.errors.email}</p>
                      </div>
                    ) : null}
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="telefono"
                    >
                      Telefono
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="telefono"
                      type="telefono"
                      placeholder="Telefono Cliente"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.telefono}
                    ></input>
                    {props.touched.telefono && props.errors.telefono ? (
                      <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                        <p className="font-bold">Error</p>
                        <p>{props.errors.telefono}</p>
                      </div>
                    ) : null}
                  </div>
                  <input
                    type="submit"
                    className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 cursor-pointer"
                    value="Guardar Cambios"
                  />
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    </Layout>
  );
};

export default EditarCliente;
