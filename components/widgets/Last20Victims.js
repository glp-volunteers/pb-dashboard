import React from "react";

class Last20Victims extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    fetch("/api/shootings/last20")
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          isLoaded: true,
          items: json,
        });
      });
  }

  render() {
    var { isLoaded, items } = this.state;
    if (!isLoaded) {
      return <div> Loading...</div>;
    } else {
      return (
        <div className="Last20Victims">
          <ul>
            {items.map((item) => {
              const humanDate = new Date(item.date).toDateString();
              return (
                <li key={item.shootingsID}>
                  <b>
                    <a target="_blank" rel="noreferrer" href={item.media_link}>
                      {item.victim_name}
                    </a>
                  </b>
                  &nbsp;was killed in {item.state} State. Reported on&nbsp;
                  {humanDate}.
                </li>
              );
            })}
          </ul>
        </div>
      );
    }
  }
}

export default Last20Victims;
