/* eslint-disable react/display-name */
/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, FC, memo, SetStateAction, useEffect, useState } from "react";

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
        <p>Total Time: </p>
        <div>{totalCount} s</div>
      </div>
    );
  }
);
export default CountUpTimer;
