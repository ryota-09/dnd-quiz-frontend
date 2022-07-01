import { FC } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

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
              <Link href="/">
                <a
                  className="inline-flex items-center text-black-800 text-2xl md:text-3xl font-bold gap-2.5"
                  aria-label="logo"
                  data-testid="home-nav"
                >
                  Title logo
                </a>
              </Link>
              {/* <!-- logo - end --> */}
              <nav className="hidden lg:flex gap-12">
                <Link href="/">
                  <a
                    data-testid="home-nav"
                    className="text-gray-600 hover:text-indigo-500 active:text-indigo-700 text-lg font-semibold transition duration-100"
                  >
                    ランキング
                  </a>
                </Link>
                <Link href="/login">
                  <a
                    data-testid="login-nav"
                    className="text-gray-600 hover:text-indigo-500 active:text-indigo-700 text-lg font-semibold transition duration-100"
                  >
                    ログイン
                  </a>
                </Link>
                <Link href="/mypage">
                  <a
                    data-testid="mypage-nav"
                    className="text-gray-600 hover:text-indigo-500 active:text-indigo-700 text-lg font-semibold transition duration-100"
                  >
                    マイページ
                  </a>
                </Link>
              </nav>
              {/* <div className="hidden lg:flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-2.5 -ml-8">
                <Link href="/">
                  <a
                    data-testid="search-nav"
                    className="text-gray-600 hover:text-indigo-500 active:text-indigo-700 text-lg font-semibold transition duration-100"
                  >
                    ランキング
                  </a>
                </Link>
              </div> */}
            </header>
          </div>
          <main className="flex flex-1 items-center flex-col w-screen">
            {children}
          </main>
          <footer className="w-full h-12 flex justify-center items-center border-t">
            <a
              className="flex items-center"
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Powered by
              {/* <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ml-2" /> */}
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                width={72}
                height={16}
              />
            </a>
          </footer>
        </div>
      </div>
    </>
  );
};
export default Layout;
