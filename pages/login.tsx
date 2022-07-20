import { NextPage } from "next";
import Layout from "../components/organisms/Layout";
import LoginForm from "../components/organisms/LoginForm";

const Login: NextPage = () => {
  return (
    <>
      <Layout title="Home">
        <div className="flex items-center flex-col min-h-screen">
          <h2 className="text-gray-800 text-2xl lg:text-3xl font-bold text-center">
            Log in
          </h2>
          <LoginForm />
        </div>
      </Layout>
    </>
  );
};
export default Login;
