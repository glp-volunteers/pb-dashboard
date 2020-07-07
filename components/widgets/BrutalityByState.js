import React, { useMemo } from "react";
import { VictoryChart, VictoryBar, VictoryAxis } from "victory";
import { useMeasure } from "react-use";

import { COLORS } from "styles/constants";

const BrutalityByState = ({ data, x = "state", isPerCapita }) => {
  const [ref, { width }] = useMeasure();
  const sortedData = useMemo(
    () =>
      data.sort(function (a, b) {
        return a.total - b.total;
      }),
    [data]
  );
  const barWidth = Math.min(50, (1000 - 12 * data.length) / data.length);
  return (
    <div ref={ref} style={{ height: 1000 }}>
      <VictoryChart
        domainPadding={{ x: barWidth / 2 + 5 }}
        padding={{ left: 100, top: 50, right: 10, bottom: 50 }}
        width={width}
        height={1000}
      >
        <VictoryAxis dependentAxis orientation={"top"} />
        <VictoryAxis style={{ tickLabels: { angle: -30 } }} />
        <VictoryAxis
          dependentAxis
          label={isPerCapita ? "Killings Per 1 million Residents" : "Killings"}
        />
        <VictoryBar
          barWidth={barWidth}
          style={{
            data: { fill: COLORS.accent },
          }}
          horizontal
          data={sortedData}
          x={x}
          y="total"
        />
      </VictoryChart>
    </div>
  );
};

export default BrutalityByState;
