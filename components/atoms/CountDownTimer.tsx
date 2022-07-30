/* eslint-disable react/display-name */
/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, FC, memo, SetStateAction, useEffect } from "react";

import { clsx } from "clsx"

type Props = {
  downCount: number;
  setDownCount: Dispatch<SetStateAction<number>>;
  downTimer: boolean;
};

const CountDownTimer: FC<Props> = memo(
  ({ downCount, setDownCount, downTimer }) => {
    const countdown = () => {
      setDownCount((downCount) => downCount - 0.1);
    };

    useEffect(() => {
      if (downTimer) {
        const timerId = setInterval(countdown, 100);
        return () => clearInterval(timerId);
      }
    }, [downTimer]);

    return (
      <div className="mt-5">
        <p className="text-grey-500 text-xl text-center">残り時間</p>
        <div className={clsx("text-2xl font-bold text-center text-black-800 text-7xl font-bold",
        downCount <= 3 && "text-red-500"
        )}>{downCount.toFixed(1)} s</div>
      </div>
    );
  }
);
export default CountDownTimer;
