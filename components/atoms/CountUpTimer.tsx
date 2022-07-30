/* eslint-disable react/display-name */
/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, FC, memo, SetStateAction, useEffect } from "react";
import { clsx } from "clsx"


type Props = {
  totalCount: number;
  setTotalCount: Dispatch<SetStateAction<number>>;
  upTimer: boolean;
};

const CountUpTimer: FC<Props> = memo(
  ({ totalCount, setTotalCount, upTimer }) => {
    const countup = () => {
      setTotalCount((totalCount) => totalCount + 1);
    };

    useEffect(() => {
      if (upTimer) {
        const timerId = setInterval(countup, 1000);
        return () => clearInterval(timerId);
      }
    }, [upTimer]);

    return (
      <div>
        <p className="text-grey-500 text-xl text-center">Total Time</p>
        <div className="text-2xl font-bold text-center text-black-800 text-7xl font-bold">{totalCount} s</div>
      </div>
    );
  }
);
export default CountUpTimer;
