import React from "react";
import { VictoryChart, VictoryBar } from "victory";

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
        <VictoryChart domainPadding={{ x: 0 }} width={500} height={1150}>
          <VictoryBar
            barRatio={0.8}
            style={{
              data: { fill: COLORS.accent },
            }}
            horizontal
            data={output}
            x="state_code"
            y="total"
          />
        </VictoryChart>
      );
    }
  }
}

export default BrutalityByState;
