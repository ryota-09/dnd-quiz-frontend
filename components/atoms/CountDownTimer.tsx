/* eslint-disable react/display-name */
/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, FC, memo, SetStateAction, useEffect } from "react";

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
      <div>
        <p>残り時間: </p>
        <div>{downCount.toFixed(1)} s</div>
      </div>
    );
  }
);
export default CountDownTimer;
