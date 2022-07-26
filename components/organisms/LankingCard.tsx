import { FC, useState } from "react";
import { clsx } from "clsx";

import { Game, User } from "../../types/types";

type Props = {
  lank: number;
  gameData: { user: Pick<User, "id" | "user_name" | "img_path">; game: Game };
};

const LankingCard: FC<Props> = ({ lank, gameData }) => {
  return (
    <>
      <div className="border border-zinc-200 w-[500px] rounded-lg h-20 mt-10 shadow-md">
        <div className="grid grid-cols-10 gap-4  h-full">
          <div
            className={clsx(
              "flex flex-col md:flex-row items-center justify-center font-bold text-2xl",
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
                  <span className="text-black-800 md:text-4xl font-bold">
                    {gameData.game.total_point}
                  </span>
                  <span>&nbsp;点</span>
                </div>
              </div>
              <div className="col-span-3">
                <p>タイム: {gameData.game.trial_time} s</p>
                <p>正解数: {gameData.game.correct_count} / 5</p>
                <p>語い力: {gameData.game.vocabulary_point} pt</p>
              </div>
              <div className="col-span-3">
                <p>ユーザー: </p>
                <p>{gameData.user.user_name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default LankingCard;
