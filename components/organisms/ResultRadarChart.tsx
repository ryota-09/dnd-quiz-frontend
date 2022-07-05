import React, { PureComponent } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

const calcTrialPoint = (trialTime: number) => {
  let timePoint: number;
  if (trialTime < 20) {
    timePoint = trialTime + 80;
  } else if (trialTime >= 20 && trialTime < 40) {
    timePoint = trialTime + 50;
  } else {
    timePoint = 10;
  }
  return timePoint;
};

const calcCorrectPoint = (correctCount: number) => {
  let correctPoint: number;
  if (correctCount === 5) {
    correctPoint = 100;
  } else if (correctCount >= 3 && correctCount <= 4) {
    correctPoint = correctCount * 10;
  } else {
    correctPoint = correctCount * 10;
  }
  return correctPoint;
};

type Props = {
  trialTime: number;
  correctCount: number;
  vocabularyPoint: number;
};

export default class ResultRadarChart extends PureComponent<Props> {
  props: Props = {
    trialTime: this.props.trialTime,
    correctCount: this.props.correctCount,
    vocabularyPoint: this.props.vocabularyPoint,
  };

  render() {
    let data = [
      {
        subject: "スピード",
        A: calcTrialPoint(this.props.trialTime),
        fullMark: 100,
      },
      { subject: "ボキャpt", A: this.props.vocabularyPoint * 2, fullMark: 100 },
      {
        subject: "正確性",
        A: calcCorrectPoint(this.props.correctCount),
        fullMark: 100,
      },
    ];

    return (
      <RadarChart
        cx={300}
        cy={250}
        outerRadius={150}
        width={500}
        height={500}
        data={data}
      >
        <PolarGrid gridType="circle" />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis angle={30} dataKey="A" domain={[0, 100]} />
        <Radar
          name="ユーザーname"
          dataKey="A"
          stroke="rgb(74 222 128)"
          fill="rgb(74 222 128)"
          fillOpacity={0.8}
        />
        <Legend />
      </RadarChart>
    );
  }
}
