import { useRouter } from "next/router";
import CreateWordForm from "../components/organisms/CreateWordForm";
import Layout from "../components/organisms/Layout";

const Home: React.FC = () => {
  const router = useRouter();
  return (
    <>
      <Layout title="Home">
        <div className="flex items-center flex-col min-h-screen">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <p className="mt-6 mb-6 text-3xl font-extrabold text-center text-neutral-600">
              文字並び替えクイズ
            </p>
          </div>
          <button
            className="inline-block bg-green-400 hover:bg-green-600 active:bg-indigo-700 focus-visible:ring ring-green-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-10 py-4"
            onClick={() => router.push("/quiz")}
          >
            スタート
          </button>
          <CreateWordForm />
        </div>
      </Layout>
    </>
  );
};
export default Home;
