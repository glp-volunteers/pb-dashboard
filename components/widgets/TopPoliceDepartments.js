import React from "react";

const style = {
  maxHeight: "1000px",
  height: "auto",
  overflow: "hidden scroll",
};

const TopPoliceDepartments = ({ data }) => {
  return (
    <div style={style}>
      <ul>
        {data.map((item) => {
          return (
            <li key={item.police_department}>
              <b>{item.police_department}</b> in {item.state} killed{" "}
              {item.count} people.
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TopPoliceDepartments;
