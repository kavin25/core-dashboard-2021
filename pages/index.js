import { useEffect, useState } from "react";
import "react-circular-progressbar/dist/styles.css";
import Router from "next/router";

import styles from "../styles/Home.module.css";
import Spotify from "../components/Spotify";
import MainPanel from "../components/MainPanel";
import RightPanel from "../components/RightPanel";

import NotificationContextProvider from "../contexts/NotificationProvider";

export default function Home({ code }) {
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

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
      <MainPanel />
      <NotificationContextProvider>
        <Spotify
          accessToken={accessToken}
          refreshAccessToken={refreshAccessToken}
        />
        <RightPanel />
      </NotificationContextProvider>
    </div>
  );
}

Home.getInitialProps = async ({ query }) => {
  const { code } = query;

  return { code };
};
