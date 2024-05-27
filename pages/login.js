import React, { useState } from "react";
import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";

const AUTH_USUARIO = gql`
  mutation autenticarUsuario($input: AutenticarInput) {
    autenticarUsuario(input: $input) {
      token
    }
  }
`;
const Login = () => {
  const router = useRouter();
  // State para el mensaje

  const [mensaje, setMensaje] = useState(null);

  // Mutation para logear usuarios en el server

  const [autenticarUsuario] = useMutation(AUTH_USUARIO);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("el email no es valido")
        .required("este campo no puede ir vacio"),
      password: Yup.string().required("el password es obligatorio"),
    }),
    onSubmit: async (values) => {
      const { email, password } = values;
      console.log(values);
      try {
        const { data } = await autenticarUsuario({
          variables: {
            input: {
              email,
              password,
            },
          },
        });
        if (!data?.autenticarUsuario) {
          setMensaje(`El Usuario o Password son incorrectos`);
          setTimeout(() => {
            setMensaje(null);
            // redirigir al login
          }, 3000);
          throw new Error("ERROR");
        }

        // Usuario Logeado correctamente
        console.log(data);
        setMensaje("Autenticando...");
        // Guardar el token en LocalStorage
        const { token } = data.autenticarUsuario;
        localStorage.setItem("token", token);
        //  Redireccionar a Clientes
        setTimeout(() => {
          setMensaje(null);
          // redirigir al login
          router.push("/");
        }, 3000);
      } catch (error) {
        console.log(error);
        // setMensaje(`${error.message}`);
      }
    },
  });

  const monstrarMensaje = () => {
    return (
      <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
        <p className="text-red-600">{mensaje}</p>
      </div>
    );
  };
  return (
    <Layout>
      <div className="flex flex-col w-screen">
        <h1 className="text-2xl text-white font-light text-center">Login</h1>
        {mensaje && monstrarMensaje()}
        <div className="flex justify-center mt-5">
          <div className="w-full max-w-sm ">
            <form
              className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
              onSubmit={formik.handleSubmit}
            >
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
                  placeholder="Email Usuario"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                ></input>
              </div>
              {formik.touched.email && formik.errors.email ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.email}</p>
                </div>
              ) : null}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="password Usuario"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                ></input>
              </div>
              {formik.touched.password && formik.errors.password ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.password}</p>
                </div>
              ) : null}
              <input
                type="submit"
                className="bg-gray-800 w-full mt-5 p-2 text-white uppercase cursor-pointer hover:bg-slate-900"
                value="Iniciar Sesión"
              />
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
