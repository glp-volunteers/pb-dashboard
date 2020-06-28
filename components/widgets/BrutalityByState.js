import React, { useMemo } from "react";
import { VictoryChart, VictoryBar, VictoryAxis } from "victory";
import { useMeasure } from "react-use";

import { COLORS } from "styles/constants";

const BrutalityByState = ({ data }) => {
  const [ref, { width }] = useMeasure();
  const sortedData = useMemo(
    () =>
      data.sort(function (a, b) {
        return a.total - b.total;
      }),
    [data]
  );
  return (
    <div ref={ref} style={{ height: 1000 }}>
      <VictoryChart
        domainPadding={{ x: 0 }}
        padding={{ left: 80, top: 50, right: 10, bottom: 50 }}
        width={width}
        height={1000}
      >
        <VictoryAxis style={{ tickLabels: { angle: -40 } }} />
        <VictoryAxis dependentAxis />
        <VictoryBar
          barRatio={0.8}
          style={{
            data: { fill: COLORS.accent },
          }}
          horizontal
          data={sortedData}
          x="state"
          y="total"
        />
      </VictoryChart>
    </div>
  );
};

export default BrutalityByState;
