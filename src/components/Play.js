import React, { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause, FaVolumeUp } from "react-icons/fa";
import { FaForwardStep, FaBackwardStep } from "react-icons/fa6";
import { onValue, ref } from "firebase/database";
import { db } from "../db";

const MusicPlay = () => {
  const audioRef = useRef(null);
  const progressInterval = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [currentIndex, setCurrentIndex] = useState(0); 
  const [song, setSong] = useState([]);


  useEffect(() => {
    const arraySong = [];
    const songRef = ref(db, `songs/1`);
    onValue(songRef, (item) => {
      const data = item.val();
      const key = item.key;
      const singer = ref(db, `singers/${data.singerId[0]}`);
      onValue(singer, (itemsing) => {
        const datasinger = itemsing.val();
        arraySong.push(
          {
            id: key,
            image: data.image,
            title: data.title,
            titlesinger: datasinger.title,
            audio: data.audio
          }
        )
        setSong([...arraySong]);
      })
    })
  }, [])
  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      audioRef.current.pause(); clearInterval(progressInterval.current);
    }
    else {
      setIsPlaying(true);
      audioRef.current.play();
      progressInterval.current = setInterval(() => {
        setProgress(audioRef.current.currentTime);
      }, 500);
    }

  }

  const handleProgressChange = (e) => {
    const newTime = e.target.value;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setProgress(newTime);
    }
  };

  const changeSong = (direction) => {
    setCurrentIndex(currentIndex + direction);
    audioRef.current.load();
    audioRef.current.play();
    setIsPlaying(true);
  };

  const volumeChangeHandler = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };
  console.log(song);
  console.log(song[currentIndex - 1]?.audio);
  console.log(currentIndex);

  return (
    <div className="MusicPlay">
      <div className="container">
        {song.length > 0 && (
          <div className="left">
            <div className="image">
              <img className="play-image" src={song[currentIndex]?.image} alt="song" />
            </div>
            <div className="content">
              <h2 className="name-song play-name">{song[currentIndex]?.title}</h2>
              <p className="name-singer play-singer">{song[currentIndex]?.titlesinger}</p>
              <audio ref={audioRef} className="inner-audio">
                <source src={song[currentIndex]?.audio} type="audio/mpeg" />
              </audio>
            </div>
          </div>
        )}
        <div className="mid">
          <div className="music-controls">
            <button className="prev-button" onClick={() => changeSong(-1)}>
              <FaBackwardStep />
            </button>
            <button className="play-button" onClick={togglePlay}>
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button className="next-button" onClick={() => changeSong(1)}>
              <FaForwardStep />
            </button>
          </div> 
          <div className="progress-bar">
            <input
              type="range"
              className="progress-bar"
              min="0"
              max={audioRef.current?.duration || 0}
              value={progress}
              onChange={handleProgressChange}
            />
          </div>
        </div>
        <div className="right">
          <FaVolumeUp />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={volumeChangeHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default MusicPlay;