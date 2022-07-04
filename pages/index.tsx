import Layout from "../components/organisms/Layout";

const Home: React.FC = () => {
  return (
    <>
      <Layout title="Home">
        <div className="flex justify-center items-center flex-col min-h-screen">
          <p>トップ</p>
        </div>
      </Layout>
    </>
  );
};
export default Home;
