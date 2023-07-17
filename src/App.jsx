import { useRef, useState } from "react";
import "./App.css";
import song1 from "../src/assets/song.mp3";
import song2 from "../src/assets/jap.mp3";
import song3 from "../src/assets/bt.mp3";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { BiSolidSkipNextCircle } from "react-icons/bi";
import { PiSkipBackCircleFill } from "react-icons/pi";
function App() {
  const audio = useRef();
  const [value, setValue] = useState(0);
  const [play, setPlay] = useState(false);
  const [songindex, setSongIndex] = useState(0);
  // console.log(songindex);

  const songs = [
    {
      head: "Left and right",
      img: "https://stat4.bollywoodhungama.in/wp-content/uploads/2022/06/Charlie-Puth-drops-his-pop-anthem-Left-And-Right-in-collaboration-with-BTS-Jungkook-with-fun-filled-music-video-165x165.jpg",
      name: song1,
    },
    {
      head: "Pink guy",
      img: "https://i1.sndcdn.com/artworks-000270536477-k3z6ks-t500x500.jpg",
      name: song2,
    },
    {
      head: "Bts chakka",
      img: "https://i1.sndcdn.com/artworks-HnZNqAUmqPteoXc8-7HmUIA-t500x500.jpg",
      name: song3,
    },
  ];
  // console.log(songs.length);

  const GetValue = (e) => {
    // console.log(Math.floor(e.target.value));
    // console.log(e.target.value);
    // console.log(audio.current.duration);
    // console.log(audio.current.currentTime);
    audio.current.currentTime = (e.target.value * audio.current.duration) / 100;
    setValue(e.target.value);
    // setTimeout(() => {
    //   audio.current.currentTime =
    //     (e.target.value * audio.current.duration) / 100;
    //   setValue(e.target.value);
    // }, 10);
  };

  const UpdateRange = () => {
    let progress = (audio.current.currentTime / audio.current.duration) * 100;
    setValue(isNaN(progress) ? 0 : progress);
  };
  const HandlePlay = () => {
    setPlay(!play);
  };
  return (
    <>
      <div className="music">
        <audio
          ref={audio}
          src={songs && songs[songindex].name}
          onTimeUpdate={UpdateRange}
        ></audio>
        <h1>{songs[songindex].head}</h1>
        <img
          className={play ? "img" : "image"}
          src={songs[songindex].img}
          alt=""
        />
        <input type="range" value={value} onChange={GetValue} />
        <div className="main">
          <PiSkipBackCircleFill
            size={40}
            color="gray"
            className="play__pause"
            onClick={() => {
              setPlay(false);
              console.log(songindex);
              setValue(0);
              songindex === 0
                ? () => setSongIndex(songs.length)
                : setSongIndex(songindex - 1);
            }}
          />
          <div className="handle" onClick={HandlePlay}>
            {!play ? (
              <AiFillPlayCircle
                color="gray"
                size={40}
                className="play__pause"
                onClick={() => {
                  audio.current.play();
                }}
              />
            ) : (
              <AiFillPauseCircle
                className="play__pause"
                color="gray"
                size={40}
                onClick={() => {
                  audio.current.pause();
                }}
              />
            )}
          </div>
          <BiSolidSkipNextCircle
            size={40}
            color="gray"
            className="play__pauses"
            onClick={() => {
              setPlay(false);
              setValue(0);
              songindex >= 2 ? setSongIndex(0) : setSongIndex(songindex + 1);
            }}
          />
        </div>
      </div>
    </>
  );
}

export default App;
