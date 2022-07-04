/* eslint-disable react/display-name */
/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, FC, memo, SetStateAction, useEffect } from "react";

type Props = {
  simpleCount: number;
  setSimpleCount: Dispatch<SetStateAction<number>>;
  simpleTimer: boolean;
};

const CountSimpleTimer: FC<Props> = memo(
  ({ simpleCount, setSimpleCount, simpleTimer }) => {
    const countdown = () => {
      setSimpleCount((simpleCount) => simpleCount - 1);
    };

    useEffect(() => {
      if (simpleTimer) {
        const timerId = setInterval(countdown, 1000);
        return () => clearInterval(timerId);
      }
    }, [simpleTimer]);

    return <div className="text-black-800 text-9xl md:text-9xl font-bold">{simpleCount}</div>;
  }
);
export default CountSimpleTimer;
