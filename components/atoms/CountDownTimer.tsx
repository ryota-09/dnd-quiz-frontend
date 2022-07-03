/* eslint-disable react/display-name */
/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, FC, memo, SetStateAction, useEffect, useState } from "react";

type Props = {
  downCount: number;
  setDownCount: Dispatch<SetStateAction<number>>;
  downTimer: boolean;
};

const CountDownTimer: FC<Props> = memo(
  ({ downCount, setDownCount, downTimer }) => {
    const countdown = () => {
      setDownCount((prevDownCount) => prevDownCount - 0.1);
    };

    useEffect(() => {
      if (downTimer) {
        const timerId = setInterval(countdown, 100);
        return () => clearInterval(timerId);
      }
    }, [downTimer]);

    return <div>残り時間: {downCount.toFixed(1)} s</div>;
  }
);
export default CountDownTimer;
