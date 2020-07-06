import React from "react";
import { VictoryChart, VictoryLine, VictoryAxis } from "victory";
import { useMeasure } from "react-use";
import { COLORS } from "styles/constants";

function transformData(data) {
  return data.map(function (d) {
    return { x: new Date(d.month), y: d.count };
  });
}

const BrutalityOverTime = ({ data }) => {
  const [ref, { width }] = useMeasure();

  return (
    <div ref={ref}>
      <VictoryChart width={width} height={450} scale={{ x: "time" }}>
        <VictoryLine
          style={{
            data: { stroke: COLORS.accent },
          }}
          data={transformData(data)}
        />
        <VictoryAxis
          label="Span of Time"
          style={{
            axisLabel: {
              fontSize: 10,
              padding: 30,
            },
          }}
          domain={[new Date("2020-01"), new Date()]}
        />
        <VictoryAxis
          dependentAxis
          label="Number of Killings"
          style={{
            axisLabel: {
              fontSize: 10,
              padding: 40,
            },
          }}
          domain={[0,250]}

        />
      </VictoryChart>
    </div>
  );
};

export default BrutalityOverTime;
