import React from "react";
import {
  VictoryChart,
  VictoryBar,
  VictoryTheme,
  VictoryZoomContainer,
} from "victory";

import { COLORS } from "styles/constants";

class BrutalityByState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      output: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    fetch(
      "http://cors-anywhere.herokuapp.com/policetracker.link/count/shootings/state/abbv"
    )
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          isLoaded: true,
          output: json.sort(function (a, b) {
            return a.total - b.total;
          }),
        });
      });
  }

  render() {
    var { isLoaded, output } = this.state;
    if (!isLoaded) {
      return <div> Loading...</div>;
    } else {
      return (
        <div style={{ width: 500 }}>
          <h2>Police Killings By State</h2>
          <VictoryChart
            height={800}
            theme={VictoryTheme.material}
            domainPadding={{ x: 0 }}
            containerComponent={
              <VictoryZoomContainer zoomDomain={{ x: [1, 51] }} />
            }
          >
            <VictoryBar
              barRatio={0.8}
              style={{
                data: { fill: COLORS.primary },
              }}
              horizontal
              data={output}
              x="state_code"
              y="total"
            />
          </VictoryChart>
        </div>
      );
    }
  }
}

export default BrutalityByState;
