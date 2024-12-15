import React from "react";
import { Login } from "../components/Login";

const LoginPage = async () => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-center">ログイン</h2>
      <Login />
    </>
  );
};

export default LoginPage;
