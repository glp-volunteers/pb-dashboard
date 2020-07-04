import React, { useState, useMemo, memo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  useGeographies,
} from "react-simple-maps";
import { scaleQuantile } from "d3-scale";
import ReactTooltip from "react-tooltip";
import { VictoryCursorContainer } from "victory";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";
let mapProjection;
let mapPath;

const InnerMap = memo(
  ({ data, selectState, selectedState, setTooltipContent, isPerCapita }) => {
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
                onMouseEnter={() => {
                  if (cur) {
                    const num = isPerCapita ? cur.total.toFixed(2) : cur.total;
                    setTooltipContent(
                      `${geo.properties.name} — ${num} killings ${
                        isPerCapita ? "per 1 million residents" : ""
                      }`
                    );
                  }
                }}
                onMouseLeave={() => {
                  setTooltipContent("");
                }}
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
  }
);

const MapChart = ({ data, selectState, selectedState, isPerCapita }) => {
  const [content, setContent] = useState("");

  return (
    <>
      <ComposableMap projection="geoAlbersUsa" data-tip="">
        <InnerMap
          data={data}
          selectState={selectState}
          selectedState={selectedState}
          setTooltipContent={setContent}
          isPerCapita={isPerCapita}
        />
      </ComposableMap>
      <ReactTooltip type="dark" backgroundColor="black">
        {content}
      </ReactTooltip>
    </>
  );
};

export default MapChart;
