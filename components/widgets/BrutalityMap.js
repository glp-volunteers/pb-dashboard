import React, { useState, useMemo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  useGeographies,
} from "react-simple-maps";
import { scaleQuantile } from "d3-scale";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";
let mapProjection;
let mapPath;

const InnerMap = ({ data, selectState, selectedState }) => {
  const { geographies } = useGeographies({ geography: geoUrl });
  const selectedGeography = useMemo(
    () => geographies.find((geo) => geo.properties.name === selectedState),
    [selectedState, geographies]
  );
  const center = useMemo(() => {
    if (!mapProjection || !mapProjection || !selectedGeography) {
      return [-96, 36];
    }
    return mapProjection.invert(mapPath.centroid(selectedGeography));
  }, [selectedGeography]);
  const zoom = selectedGeography ? 3 : 1;
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
    <ZoomableGroup center={center} zoom={zoom} filterZoomEvent={() => {}}>
      <g className="rsm-geographies">
        {geographies.map((geo) => {
          const cur = data.find((s) => s.state === geo.properties.name);
          return (
            <Geography
              aria-label={geo.properties.name}
              key={geo.rsmKey}
              geography={geo}
              fill={cur ? colorScale(cur.total) : "#eee"}
              onClick={() => selectState(geo.properties.name)}
            />
          );
        })}
      </g>
      <Geographies geography={geoUrl}>
        {({ projection, path }) => {
          mapProjection = projection;
          mapPath = path;
        }}
      </Geographies>
    </ZoomableGroup>
  );
};

const MapChart = ({ data, selectState, selectedState }) => {
  return (
    <ComposableMap projection="geoAlbersUsa">
      {
        <InnerMap
          data={data}
          selectState={selectState}
          selectedState={selectedState}
        />
      }
    </ComposableMap>
  );
};

export default MapChart;
