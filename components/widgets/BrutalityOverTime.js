import React, { useMemo } from "react";
import { VictoryChart, VictoryLine, VictoryAxis } from "victory";
import { useMeasure } from "react-use";
import { COLORS } from "styles/constants";

function transformData(data) {
  return data
    .map(function (d) {
      return { x: new Date(d.month), y: d.count };
    })
    .sort((a, b) => a.x.getTime() - b.x.getTime());
}

const BrutalityOverTime = ({ data }) => {
  const [ref, { width }] = useMeasure();
  const transformedData = useMemo(() => transformData(data), [data]);
  const lastDate = new Date(
    2020,
    transformedData[transformedData.length - 1].x.getMonth()
  );

  return (
    <div ref={ref}>
      <VictoryChart width={width} height={450} scale={{ x: "time" }}>
        <VictoryLine
          style={{
            data: { stroke: COLORS.accent },
          }}
          data={transformedData}
          domain={{ x: [new Date("2020-01"), lastDate] }}
        />
        <VictoryAxis
          label="Span of Time"
          style={{
            axisLabel: {
              fontSize: 10,
              padding: 30,
            },
          }}
          domain={[new Date("2020-01"), lastDate]}
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
          domain={[0, 250]}
        />
      </VictoryChart>
    </div>
  );
};

export default BrutalityOverTime;
