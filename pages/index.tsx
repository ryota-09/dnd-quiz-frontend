import CreateWordForm from "../components/organisms/createWordForm";
import Layout from "../components/organisms/Layout";

const Home: React.FC = () => {
  return (
    <>
      <Layout title="Home">
        <div className="flex items-center flex-col min-h-screen">
          <CreateWordForm />
        </div>
      </Layout>
    </>
  );
};
export default Home;
