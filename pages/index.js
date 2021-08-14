import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Router from "next/router";

import styles from "../styles/Home.module.css";
import Widget from "../components/Widget";
import Spotify from "../components/Spotify";
import { useEffect, useState } from "react";

export default function Home({ code }) {
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const ac = 18;
  const volume = 80;

  const SPOTIFY_CLIENT_ID = "c7c535316e97472b8b38c038fb0e8673";
  const SPOTIFY_CLIENT_SECRET = "3a590f7fe49242dc9b36075cbfa800c6";

  const refreshAccessToken = () => {
    fetch(
      `https://accounts.spotify.com/api/token` +
        `?grant_type=refresh_token` +
        `&refresh_token=${refreshToken}` +
        `&client_id=${SPOTIFY_CLIENT_ID}`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " + btoa(SPOTIFY_CLIENT_ID + ":" + SPOTIFY_CLIENT_SECRET),
        },
        method: "POST",
      }
    )
      .then((res) => res.json())
      .then(({ access_token, refresh_token }) => {
        if (access_token != undefined) {
          setAccessToken(access_token);
          localStorage.setItem("CORE_ACCESS_TOKEN", access_token);
        }
        if (refresh_token != undefined) {
          setRefreshToken(refresh_token);
          localStorage.setItem("CORE_REFRESH_TOKEN", refresh_token);
        }
        Router.push("/");
      });
  };

  useEffect(() => {
    setAccessToken(localStorage.getItem("CORE_ACCESS_TOKEN"));
    setRefreshToken(localStorage.getItem("CORE_REFRESH_TOKEN"));
  }, []);

  useEffect(() => {
    if (code) {
      fetch(
        `https://accounts.spotify.com/api/token` +
          `?grant_type=authorization_code` +
          `&code=${code}` +
          `&redirect_uri=${encodeURI(
            "https://core-dashboard-2021.vercel.app"
          )}` +
          `&client_id=${SPOTIFY_CLIENT_ID}` +
          `&client_secret=${SPOTIFY_CLIENT_SECRET}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:
              "Basic " + btoa(SPOTIFY_CLIENT_ID + ":" + SPOTIFY_CLIENT_SECRET),
          },
          method: "POST",
        }
      )
        .then((res) => res.json())
        .then(({ access_token, refresh_token }) => {
          if (access_token != undefined) {
            setAccessToken(access_token);
            localStorage.setItem("CORE_ACCESS_TOKEN", access_token);
          }
          if (refresh_token != undefined) {
            setRefreshToken(refresh_token);
            localStorage.setItem("CORE_REFRESH_TOKEN", refresh_token);
          }
          Router.push("/");
        });
    }
  }, [code]);

  return (
    <div className={styles.grid}>
      <Widget
        style={{
          gridArea: "1 / 1 / 3 / 3",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
        bgColor="--red"
        textColor="--bg-color"
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
      <Spotify
        accessToken={accessToken}
        refreshAccessToken={refreshAccessToken}
      />
      <Widget
        style={{
          gridArea: "1 / 3 / 4 / 4",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
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
          <p style={{ marginTop: "4px" }}>No New Notifications</p>
        </Widget>
        <div className={styles.vol}>
          <CircularProgressbar
            value={volume}
            text={`${volume}`}
            styles={buildStyles({
              pathColor: `var(--red)`,
              textColor: `var(--white)`,
              strokeLinecap: "butt",
              trailColor: "var(--bg-color)",
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
              trailColor: "var(--bg-color)",
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
    </div>
  );
}

Home.getInitialProps = async ({ query }) => {
  const { code } = query;

  return { code };
};
