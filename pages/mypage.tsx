import { useQuery, useReactiveVar } from "@apollo/client";
import Cookies from "universal-cookie";
import router from "next/router";

import HistoryLineChart from "../components/organisms/HistoryLineChart";
import Layout from "../components/organisms/Layout";
import { GET_GAMES_BY_USERID } from "../queries/queries";
import { GetGamesByUserIdQuery,  } from "../types/generated/graphql";
import { currentUserVar, setCurrentUser } from "../cache";
import { NextPage } from "next";

const cookie = new Cookies();

const MyPage: NextPage = () => {
  const userId = cookie.get("user_id");
  if (!userId) {
    router.push("/login");
  }
  const { data, error, loading } = useQuery<GetGamesByUserIdQuery>(
    GET_GAMES_BY_USERID,
    {
      variables: { userId: userId },
    }
  );
  // const {} = useQuery<>
  // const newUser: User = {
  //   id: login.user.id,
  //   user_name: login.user.username,
  //   email: login.user.email,
  //   password: login.user.password,
  //   img_path: login.user.img_path,
  //   created_at: login.user.created_at,
  //   updated_at: login.user.updated_at,
  //   game_history: [],
  // };
  // setCurrentUser(newUser);
  const currentUser = useReactiveVar(currentUserVar);
  return (
    <>
      <Layout title="マイページ">
        <div className="flex items-center flex-col min-h-screen">
          <div className="mb-10 md:mb-16">
            <h2 className="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6">
              My Page
            </h2>
          </div>
          {loading ? (
            <p>ローディング中...</p>
          ) : (
            <div>
              <p>{currentUser.user_name}</p>
              <HistoryLineChart games={data.getGameListByUerId} />
              {data.getGameListByUerId.map((game, index) => (
                <div key={index}>
                  <p>{index + 1}: 結果</p>
                  <p>日にち: {game.created_at}</p>
                  <p>タイム: {game.trial_time} s</p>
                  <p>正解数: {game.correct_count} / 5</p>
                  <p>語い力: {game.vocabulary_point} pt</p>
                  <p>総合点: {game.total_point} pt</p>
                  <br />
                </div>
              ))}
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};
export default MyPage;
