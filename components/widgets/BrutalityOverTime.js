import React, { useMemo } from "react";
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
  const transformedData = useMemo(() => transformData(data), [data]);
  const startDate = new Date("2020-01");
  // Use last month to avoid having an incomplete month of data
  const endDate = new Date(2020, new Date().getMonth() - 1);

  return (
    <div ref={ref}>
      <VictoryChart width={width} height={450} scale={{ x: "time" }}>
        <VictoryLine
          style={{
            data: { stroke: COLORS.accent },
          }}
          data={transformedData}
          domain={{ x: [startDate, endDate] }}
        />
        <VictoryAxis
          label="Span of Time"
          style={{
            axisLabel: {
              fontSize: 10,
              padding: 30,
            },
          }}
          domain={[startDate, endDate]}
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
