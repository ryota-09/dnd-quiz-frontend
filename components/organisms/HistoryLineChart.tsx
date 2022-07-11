import { FC, useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Game } from "../../types/types";

type Props = {
  games: Game[];
};

const HistoryLineChart: FC<Props> = ({ games }) => {
  const [data, setData] = useState([]);

  const calcCorrectPoint = (correctCount: number) => {
    let correctPoint: number;
    if (correctCount === 5) {
      correctPoint = 100;
    } else if (correctCount >= 3 && correctCount <= 4) {
      correctPoint = correctCount * 20;
    } else {
      correctPoint = correctCount * 20;
    }
    return correctPoint;
  };

  const calcTrialTimePoint = (trialTime: number) => {
    let timePoint: number;
    if (trialTime < 20) {
      timePoint = trialTime + 60;
    } else if (trialTime >= 20 && trialTime < 40) {
      timePoint = trialTime + 20;
    } else {
      timePoint = 10;
    }
    return timePoint;
  };

  const formatDate = (strDate: string) => {
    let formatedStr: string;
    let newStr = strDate.split("T")[0];
    let newStr2 = newStr.split("-")[1];
    let newStr3 = newStr.split("-")[2];
    formatedStr = newStr2 + "/" + newStr3;
    return formatedStr;
  };

  useEffect(() => {
    const newArray = games.map((game) => {
      return {
        name: formatDate(`${game.created_at}`),
        correct_count: calcCorrectPoint(game.correct_count),
        trial_time: calcTrialTimePoint(game.trial_time),
        vocabulary_point: game.vocabulary_point * 2,
      };
    });
    const reverseArray = newArray.reverse();
    setData([...reverseArray]);
  }, [games]);
  return (
    <>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 20,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="liner"
          name="スピード"
          dataKey="trial_time"
          stroke="#8884d8"
          strokeWidth={3}
          activeDot={{ r: 0 }}
          isAnimationActive={false}
        />
        <Line
          type="liner"
          name="正確性"
          dataKey="correct_count"
          isAnimationActive={false}
          stroke="#82ca9d"
          strokeWidth={3}
        />
        <Line
          type="liner"
          name="語い力"
          dataKey="vocabulary_point"
          isAnimationActive={false}
          stroke="black"
          strokeWidth={3}
        />
      </LineChart>
    </>
  );
};
export default HistoryLineChart;
