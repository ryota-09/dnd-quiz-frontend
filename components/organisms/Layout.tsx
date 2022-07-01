import { FC } from "react";
import Head from "next/head";

type TubTitle = {
  title: string;
};

const Layout: FC<TubTitle> = ({ title, children }) => {
  return (
    <>
      <div className="flex items-center flex-col min-h-screen">
        <Head>
          <title>{title}</title>
        </Head>
        <div className="bg-white lg:pb-12">
          <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
            <header className="flex justify-between items-center py-4 md:py-8">
              {/* <!-- logo - start --> */}
              <a
                href="#"
                className="inline-flex items-center text-black-800 text-2xl md:text-3xl font-bold gap-2.5"
                aria-label="logo"
              >
                Title logo
              </a>
              {/* <!-- logo - end --> */}
            </header>
          </div>
        </div>
      </div>
    </>
  );
};
export default Layout;
