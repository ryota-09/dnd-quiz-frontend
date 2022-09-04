/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_ALL_GAMES, GET_ALL_USERS } from "../../queries/queries";
import {
  GetAllGamesQuery,
  GetAllUsersQuery,
} from "../../types/generated/graphql";
import { Game, User } from "../../types/types";
import LankingCard from "../organisms/LankingCard";

const LankingArea = () => {
  const {
    data: gameData,
    error: gameError,
    loading: gameLoading,
  } = useQuery<GetAllGamesQuery>(GET_ALL_GAMES);
  const {
    data: userData,
    error: userError,
    loading: userLoading,
  } = useQuery<GetAllUsersQuery>(GET_ALL_USERS);
  const [displayedList, setDisplayedList] = useState<
    { user: Pick<User, "id" | "user_name" | "img_path">; game: Game }[]
  >([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (gameData && userData) {
      let targetList: {
        user: Pick<User, "id" | "user_name" | "img_path">;
        game: Game;
      }[] = [];
      let targetObj: {
        user: Pick<User, "id" | "user_name" | "img_path">;
        game: Game;
      };
      let index = 0;
      for (const game of gameData.games) {
        index++;
        for (const user of userData.users) {
          if (user.id === game.user_id) {
            targetObj = {
              user: {
                id: user.id,
                user_name: user.username,
                img_path: user.img_path,
              },
              game: game,
            };
          }
        }
        if (index <= 5) {
          targetList.push(targetObj);
        }
      }
      setDisplayedList([...targetList]);
    }
  }, [gameData, userData]);

  useEffect(() => {
    if (isOpen) {
      let targetList: {
        user: Pick<User, "id" | "user_name" | "img_path">;
        game: Game;
      }[] = [];
      let targetObj: {
        user: Pick<User, "id" | "user_name" | "img_path">;
        game: Game;
      };
      for (const game of gameData.games) {
        for (const user of userData.users) {
          if (user.id === game.user_id) {
            targetObj = {
              user: {
                id: user.id,
                user_name: user.username,
                img_path: user.img_path,
              },
              game: game,
            };
          }
        }
        targetList.push(targetObj);
      }
      setDisplayedList([...targetList]);
    } else if (!isOpen && gameData) {
      let targetList: {
        user: Pick<User, "id" | "user_name" | "img_path">;
        game: Game;
      }[] = [];
      let targetObj: {
        user: Pick<User, "id" | "user_name" | "img_path">;
        game: Game;
      };
      let index = 0;
      for (const game of gameData.games) {
        index++;
        for (const user of userData.users) {
          if (user.id === game.user_id) {
            targetObj = {
              user: {
                id: user.id,
                user_name: user.username,
                img_path: user.img_path,
              },
              game: game,
            };
          }
        }
        if (index <= 5) {
          targetList.push(targetObj);
        }
      }
      setDisplayedList([...targetList]);
    }
  }, [isOpen]);
  return (
    <>
      <div className="mt-7">
        <h3 className="text-center font-bold text-md">世界ランキング</h3>
        {gameLoading && userLoading
          ? <p className="flex justify-center mt-5">ローディング中...</p>
          : displayedList.map((oneGameData, index) => (
              <LankingCard key={index} lank={index} gameData={oneGameData} />
            ))}
        <div className="flex flex-col md:flex-row items-center justify-center mb-10">
          <button
            type="button"
            className="h-10 border border-zinc-300 w-96 rounded-lg mt-10 shadow-md bg-gray-200 hover:opacity-70"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "6位以下を閉じる" : "６位以下を表示する"}
          </button>
        </div>
      </div>
    </>
  );
};
export default LankingArea;
