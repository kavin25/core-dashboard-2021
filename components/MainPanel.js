import React from "react";
import Widget from "./Widget";
import styles from "./MainPanel.module.css";

export default function MainPanel() {
  return (
    <Widget
      style={{
        gridArea: "1 / 1 / 3 / 3",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
      }}
      bgColor="--dark-light"
      textColor="--white"
    >
      <h2>Good Morning!</h2>
      <div className={styles.numbers}>
        <div className="mph">
          <h2 className="heavy">120</h2>
          <h3>mph</h3>
        </div>
        <div className="fuel">
          <h2 className="heavy">27.40</h2>
          <h3>mileage</h3>
        </div>
        <div className="fuel">
          <h2 className="heavy">76%</h2>
          <h3>battery</h3>
        </div>
      </div>
      <div className="driving-style">
        <h4>Driving Style</h4>
        <h2 className="heavy">Comfort</h2>
      </div>
    </Widget>
  );
}
