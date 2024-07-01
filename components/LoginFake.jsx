import React, { useState } from "react";

const LoginFake = () => {
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");
  const [fields, setFields] = useState({
    email: "",
    password: "",
  });

  const onChangeForm = (e) => {
    const { name, value } = e.target;
    setFields({
      ...fields,
      [name]: value,
    });
  };
  const onSubmitForm = (e) => {
    e.preventDefault();
    if (!fields.email || !fields.password)
      return alert("faltan algunos campos");

    alert("Usuario Logeado exitosamente");
  };
  return (
    <div className="w-screen h-screen grid place-items-center">
      <div className="w-1/5 ">
        <form action="" onSubmit={onSubmitForm} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={fields.email}
            onChange={onChangeForm}
            className="border border-black h-[36px] p-4"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={fields.password}
            onChange={onChangeForm}
            className="border border-black h-[36px] p-4"
          />
          <button
            type="submit"
            className="bg-green-700 text-white w-1/3 m-auto rounded-full"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginFake;
