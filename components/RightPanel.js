import Widget from "./Widget";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import styles from "./RightPanel.module.css";
import { useContext } from "react";
import { NotificationContext } from "../contexts/NotificationProvider";

export default function RightPanel() {
  const { notifications } = useContext(NotificationContext);
  const ac = 18;
  const volume = 80;
  return (
    <Widget
      style={{
        gridArea: "1 / 3 / 4 / 4",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflowY: "auto",
      }}
      bgColor="--bg-color"
      textColor="--white"
    >
      <Widget
        style={{
          textAlign: "center",
        }}
        bgColor="--dark-light"
        color="--white"
      >
        <h4>Notifications</h4>
        {notifications.length > 0 ? (
          notifications.map((notification, idx) => (
            <div style={{ marginTop: "4px" }} key={idx}>
              <p style={{ fontSize: "12px" }}>{notification}</p>
            </div>
          ))
        ) : (
          <p style={{ marginTop: "4px" }}>No New Notifications</p>
        )}
      </Widget>
      <div className={styles.vol}>
        <CircularProgressbar
          value={volume}
          text={`${volume}`}
          styles={buildStyles({
            pathColor: `var(--red)`,
            textColor: `var(--white)`,
            strokeLinecap: "butt",
            trailColor: "#ca3e4738",
          })}
          counterClockwise={true}
          className={styles.prog}
        />
        <h4>Volume</h4>
      </div>
      <div className={styles.vol}>
        <CircularProgressbar
          value={ac}
          text={`${ac}`}
          minValue={16}
          maxValue={27}
          styles={buildStyles({
            pathColor: `var(--red)`,
            textColor: `var(--white)`,
            strokeLinecap: "butt",
            trailColor: "#ca3e4738",
          })}
          counterClockwise={true}
          className={styles.prog}
        />
        <h4>AC</h4>
      </div>
      {/** <div className="news-update">
          <h4>News Updates</h4>
          <Widget
            bgColor="--dark-light"
            color="--white"
            style={{ margin: "16px 0", padding: 16, borderRadius: 18 }}
          >
            Nearly all $610 Million stolen in cryptocurrency returned by hacker
          </Widget>
          <Widget
            bgColor="--dark-light"
            color="--white"
            style={{ margin: "16px 0", padding: 16, borderRadius: 18 }}
          >
            HCL Technologies becomes 4th IT firm to hit Rs 3 trillion market-cap
          </Widget>
        </div> */}
    </Widget>
  );
}
