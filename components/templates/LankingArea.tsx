import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_ALL_GAMES } from "../../queries/queries";
import { GetAllGamesQuery } from "../../types/generated/graphql";
import { Game } from "../../types/types";
import LankingCard from "../organisms/LankingCard";

const LankingArea = () => {
  const { data, error, loading } = useQuery<GetAllGamesQuery>(GET_ALL_GAMES);
  const [displayedList, setDisplayedList] = useState<Game[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (data) {
      let targetList: Game[] = [];
      let index = 0;
      for (const game of data.games) {
        index++;
        if (index <= 5) {
          targetList.push(game);
        }
      }
      setDisplayedList([...targetList]);
    }
  }, [data]);

  useEffect(() => {
    if (isOpen) {
      let targetList: Game[] = [];
      for (const game of data.games) {
        targetList.push(game);
      }
      setDisplayedList([...targetList]);
    } else if (!isOpen && data) {
      let targetList: Game[] = [];
      let index = 0;
      for (const game of data.games) {
        index++;
        if (index <= 5) {
          targetList.push(game);
        }
      }
      setDisplayedList([...targetList]);
    }
  }, [isOpen]);
  return (
    <>
      <div className="mt-7">
        <h3 className="text-center font-bold text-md">世界ランキング</h3>
        {loading && "ローディング中..."}
        {data &&
          displayedList.map((game, index) => (
            <LankingCard key={index} lank={index} game={game} />
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
