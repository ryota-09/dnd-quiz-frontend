import { FC } from "react";
import { clsx } from "clsx";

import { Game } from "../../types/types";

type Props = {
  lank: number;
  game: Game;
};

const LankingCard: FC<Props> = ({ lank, game }) => {
  return (
    <>
      <div className="border border-zinc-400 w-[500px] rounded-lg h-20 mt-10">
        <div className="grid grid-cols-10 gap-4  h-full">
          <div
            className={clsx(
              "flex flex-col md:flex-row items-center justify-center",
              lank + 1 === 1 && "bg-yellow-300 rounded-lg",
              lank + 1 === 2 && "bg-gray-300 rounded-lg",
              lank + 1 === 3 && "bg-amber-600 rounded-lg"
            )}
          >
            {lank + 1}
          </div>
          <div className="col-span-9">
            <div className="grid grid-cols-10 gap-4  h-full">
              <div className="col-span-4">
                総合点: <br />
                <div className="text-center">
                  <span className="text-black-800 text-9xl md:text-3xl font-bold">
                    {game.total_point}
                  </span>
                  <span>&nbsp;点</span>
                </div>
              </div>
              <div className="col-span-6">
                <p>タイム: {game.trial_time} s</p>
                <p>正解数: {game.correct_count} / 5</p>
                <p>語い力: {game.vocabulary_point} pt</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default LankingCard;
