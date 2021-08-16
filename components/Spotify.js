import { useContext, useEffect, useState } from "react";
import { ToastProvider, useToasts } from "react-toast-notifications";
import Widget from "./Widget";

import styles from "./Spotify.module.css";
import { NotificationContext } from "../contexts/NotificationProvider";

export default function Spotify({ accessToken, refreshAccessToken }) {
  const [name, setName] = useState("");
  const [artist, setArtist] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  const authUrl = `https://accounts.spotify.com/authorize`;
  const authCompleteUrl =
    authUrl +
    `?client_id=` +
    "c7c535316e97472b8b38c038fb0e8673" +
    `&response_type=code` +
    `&redirect_uri=https://core-dashboard-2021.vercel.app` +
    `&scope=user-read-currently-playing user-read-playback-state user-modify-playback-state`;

  useEffect(() => {
    const getCurrent = () => {
      fetch("https://api.spotify.com/v1/me/player/currently-playing", {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
        .then(async (res) => {
          if (res.status === 401) {
            return refreshAccessToken();
          } else {
            return res.json();
          }
        })
        .then((res) => {
          if (res) {
            if (res.item) {
              console.log(res.item);
              const _name = res.item.name;
              const _artist = res.item.artists
                .map((artist) => artist.name)
                .join(", ");
              const _imageUrl = res.item.album.images[1].url;
              const _isPlaying = res.is_playing;

              if (_isPlaying) {
                setTimeout(getCurrent, res.item.duration_ms - res.progress_ms);
              }

              setName(_name);
              setArtist(_artist);
              setImageUrl(_imageUrl);
              setIsPlaying(_isPlaying);
            } else if (res.currently_playing_type === "ad") {
              setName("AD");
              setArtist("Spotify");
              setImageUrl(
                "https://developer.spotify.com/assets/branding-guidelines/icon1@2x.png"
              );
              setIsPlaying(res.is_playing);
            }
          }
        })
        .catch((err) => console.log(err.message));
    };
    console.log(accessToken);
    if (accessToken) {
      getCurrent();
    }
  }, [accessToken, refreshAccessToken]);

  return (
    <Widget
      style={{ gridArea: "3 / 1 / 4 / 3" }}
      bgColor="--dark-light"
      textColor="--white"
    >
      {accessToken === null ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <a
            style={{
              backgroundColor: "var(--dark)",
              padding: "16px 12px",
              borderRadius: "8px",
            }}
            href={authCompleteUrl}
          >
            Login with Spotify
          </a>
        </div>
      ) : (
        <ToastProvider>
          <SpotifyWidget
            name={name}
            artist={artist}
            imageUrl={imageUrl}
            isPlaying={isPlaying}
            accessToken={accessToken}
            toggleIsPlaying={() => setIsPlaying(!isPlaying)}
          />
        </ToastProvider>
      )}
    </Widget>
  );
}

const SpotifyWidget = ({
  name,
  artist,
  imageUrl,
  isPlaying,
  accessToken,
  toggleIsPlaying,
}) => {
  const { addToast } = useToasts();
  const { addNotification } = useContext(NotificationContext);
  const resumePlaying = () => {
    fetch("https://api.spotify.com/v1/me/player/play", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => {
      if (!res.ok) {
        console.log(res.status);
        if (res.status === 403) {
          addToast(
            "You cannot use controls if you don't have Spotify Premium.",
            { appearance: "error" }
          );
          addNotification(
            "You cannot use controls if you don't have Spotify Premium."
          );
        }
      } else {
        toggleIsPlaying();
      }
    });
  };

  const pausePlaying = () => {
    fetch("https://api.spotify.com/v1/me/player/pause", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => {
      if (!res.ok) {
        console.log(res.status);
        if (res.status === 403) {
          addToast(
            "You cannot use controls if you don't have Spotify Premium.",
            { appearance: "error" }
          );
          addNotification(
            "You cannot use controls if you don't have Spotify Premium."
          );
        }
      } else {
        toggleIsPlaying();
      }
    });
  };

  const nextPlaying = () => {
    fetch("https://api.spotify.com/v1/me/player/next", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => {
      if (!res.ok) {
        console.log(res.status);
        if (res.status === 403) {
          addToast(
            "You cannot use controls if you don't have Spotify Premium.",
            { appearance: "error" }
          );
        }
      } else {
        getCurrent();
      }
    });
  };
  const prevPlaying = () => {
    fetch("https://api.spotify.com/v1/me/player/previous", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => {
      if (!res.ok) {
        console.log(res.status);
        if (res.status === 403) {
          addToast(
            "You cannot use controls if you don't have Spotify Premium.",
            { appearance: "error" }
          );
        }
      } else {
        getCurrent();
      }
    });
  };
  return name ? (
    <div className={styles.spotify}>
      <div
        className={styles.spotifyMain}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <h4>Play On Spotify</h4>
        <h3 className="bold">{name}</h3>
        <p>{artist}</p>

        <div className={styles.controls}>
          <i
            style={{ cursor: "pointer" }}
            className="fas fa-backward fa-lg"
            onClick={prevPlaying}
          ></i>
          {isPlaying ? (
            <i
              style={{ cursor: "pointer" }}
              className="fas fa-pause fa-lg"
              onClick={pausePlaying}
            ></i>
          ) : (
            <i
              style={{ cursor: "pointer" }}
              className="fas fa-play fa-lg"
              onClick={resumePlaying}
            ></i>
          )}
          <i
            style={{ cursor: "pointer" }}
            className="fas fa-forward fa-lg"
            onClick={nextPlaying}
          ></i>
        </div>
      </div>
      <img
        src={imageUrl}
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px",
        }}
        width="180"
        alt=""
      />
    </div>
  ) : (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <p>Play something on your device to continue</p>
    </div>
  );
};
