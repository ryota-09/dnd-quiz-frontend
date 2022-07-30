import { FC } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Cookies from "universal-cookie";
import { useMutation } from "@apollo/client";

import { LOGOUT_USER } from "../../queries/queries";
import { LogoutMutation } from "../../types/generated/graphql";

const cookie = new Cookies();

type TubTitle = {
  title: string;
};

const Layout: FC<TubTitle> = ({ title, children }) => {
  // const [logout] = useMutation<LogoutMutation>(LOGOUT_USER, {
  //   update(cache, { data: frag }) {
  //     const cacheId = cache.identify(frag);
  //     cache.modify({
  //       fields: {
  //         logout(existingData, { toReference }) {
  //           return [toReference(cacheId), ...existingData];
  //         },
  //       },
  //     });
  //   },
  // });
  // const logout = async () => {
  //   const { data } = await executeLogoutMutation({
  //     variables: {
  //       refreshToken: storage.getItem(AUTH_TOKEN),
  //     },
  //   });

  //   if (data.logout) {
  //     await client.clearStore();

  //     storage.removeItem(AUTH_TOKEN);
  //     store.remove(AUTH_TOKEN);
  //     navigate('/auth');
  //   }
  // };
  const [logout, { client }] = useMutation<LogoutMutation>(LOGOUT_USER);
  const logoutFn = async () => {
    const frag = await logout();
    await client.resetStore();
    await client.clearStore();
    cookie.remove("user_id");
    cookie.remove("refresh_token");
    cookie.remove("access_token");
    console.log(frag);
  };
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
                  Moji Jun
                </a>
              </Link>
              {/* <!-- logo - end --> */}
              <nav className="hidden lg:flex gap-12">
                <Link href="/">
                  <a
                    data-testid="home-nav"
                    className="text-gray-600 hover:text-green-300 active:text-green-700 text-lg font-semibold transition duration-100"
                  >
                    ホーム
                  </a>
                </Link>
                <Link href="/login">
                  <a
                    data-testid="login-nav"
                    className="text-gray-600 hover:text-green-300 active:text-green-700 text-lg font-semibold transition duration-100"
                  >
                    ログイン
                  </a>
                </Link>
                <Link href="/">
                  <a
                    onClick={logoutFn}
                    data-testid="logout-nav"
                    className="text-gray-600 hover:text-green-300 active:text-green-700 text-lg font-semibold transition duration-100"
                  >
                    ログアウト
                  </a>
                </Link>
                <Link href="/mypage">
                  <a
                    data-testid="mypage-nav"
                    className="text-gray-600 hover:text-green-300 active:text-green-700 text-lg font-semibold transition duration-100"
                  >
                    マイページ
                  </a>
                </Link>
              </nav>
              {/* <div className="hidden lg:flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-2.5 -ml-8">
                <Link href="/">
                  <a
                    data-testid="search-nav"
                    className="text-gray-600 hover:text-green-500 active:text-green-700 text-lg font-semibold transition duration-100"
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
