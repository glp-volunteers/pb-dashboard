import React, { useState } from "react";

const last20Style = {
  maxHeight: "450px",
  height: "auto",
  overflow: "hidden scroll",
};

const Last20Victims = ({data}) => {

  const [items] = useState(data);
   
  return(
      <div className="Last20Victims" style={last20Style}>
      <ul>
        {items.map((item) => {
          const humanDate = new Date(item.date).toDateString();
          return (
            <li key={item.shootingsID} > 
              <b>
                <a target="_blank" rel="noreferrer" href={item.media_link}>
                  {item.victim_name}
                </a>
              </b>
              &nbsp;was killed in {item.county} County, {item.state}. Reported on&nbsp;
              {humanDate}.
            </li>
          );
        })}
      </ul>
    </div>
    )
  }

export default Last20Victims;
