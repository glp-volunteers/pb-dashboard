import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantile } from "d3-scale";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const MapChart = ({ data }) => {
  const colorScale = scaleQuantile()
    .domain(data.map((d) => d.total))
    .range([
      "#C5C6C8",
      "#B5C2C3",
      "#A5BDBE",
      "#95B9B8",
      "#85B4B3",
      "#75B0AE",
      "#65ABA9",
      "#55A7A3",
      "#45A29E",
    ]);

  return (
    <ComposableMap projection="geoAlbersUsa">
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const cur = data.find((s) => s.state === geo.properties.name);
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={cur ? colorScale(cur.total) : "#eee"}
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>
  );
};

export default MapChart;
