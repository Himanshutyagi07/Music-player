import React, { useEffect, useRef, useState } from 'react'
import { FaPlay, FaPause, FaForward, FaBackward } from 'react-icons/fa';
import { PiRepeat } from "react-icons/pi"
import { BiShuffle } from "react-icons/bi"
import { BsFillVolumeDownFill } from "react-icons/bs"
import song1 from "./songs/song1.mp3"
import song2 from "./songs/song2.mp3"
import song3 from "./songs/song3.mp3"
import song4 from "./songs/song4.mp3"
import song5 from "./songs/song5.mp3"


const App = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [arrayIndex, setArrayIndex] = useState(0)
  const [songDuration, setSongDuration] = useState(0);
  const [currentSecond, setCurrentSecond] = useState(0);
  const audioRef = useRef(null);
  const [repeatSong, setRepeatSong] = useState(false);
  const [suffle, setSuffle] = useState(false)
  const [volume, setVolume] = useState(0);

  const songsArray = [
    {
      name: "music1",
      source: song1
    },
    {
      name: "music2",
      source: song2
    },
    {
      name: "music3",
      source: song3
    },
    {
      name: "music4",
      source: song4
    },
    {
      name: "music5",
      source: song5
    }
  ]
  useEffect(() => {
    isPlaying && audioRef.current.play()
  }, [arrayIndex])

  const playPauseHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying)
  }

  const skipForward = () => {
    if (arrayIndex < 4) {
      let randomNumber = Math.floor(Math.random() * 5);
      suffle ? setArrayIndex(randomNumber) : setArrayIndex(arrayIndex + 1)
    }
  }

  const skipBackward = () => {
    if (arrayIndex > 0) {
      let randomNumber = Math.floor(Math.random() * 5);
      suffle ? setArrayIndex(randomNumber) : setArrayIndex(arrayIndex - 1)
    }
  }

  const handleProgressClick = (event) => {
    const newPosition = parseFloat(event.target.value)
    audioRef.current.currentTime = newPosition
    setCurrentSecond(newPosition)
  };

  const handleRepeat = () => {
    setRepeatSong(!repeatSong)
  }

  const handleSuffle = () => {
    setSuffle(!suffle)
  }

  const onVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  useEffect(() => {
    const audio = audioRef.current;
    audio.removeEventListener('ended', skipForward);
    audio.addEventListener('ended', skipForward);
    audio.addEventListener('timeupdate', () => {
      setCurrentSecond(Math.floor(audio.currentTime));

      if (songDuration === 0) {
        setSongDuration(Math.floor(audio.duration));
      }
    })
  }, [arrayIndex, songDuration]);


  return (
    <div className="music-player">
      <div className='heading'><h2>{songsArray[arrayIndex].name}</h2></div>
      <audio ref={audioRef} src={songsArray[arrayIndex]?.source} loop={repeatSong ? true : false}></audio>
      <input
        type="range"
        id="progressbar"
        min="0"
        className="progressBar"
        max={songDuration}
        step="1"
        value={currentSecond}
        onChange={handleProgressClick}
      />
      <div className='player-controls'>
        <div className='icons-size' onClick={handleSuffle}>
          <BiShuffle />
        </div>
        <div className='buttons-main'>
          <div className="icons-size">
            <FaBackward
              onClick={skipBackward}
            />
          </div>
          {isPlaying ? (
            <div className='play-button icons-size'>
              <FaPause
                onClick={playPauseHandler}
              />
            </div>
          ) : (
            <div className='play-button icons-size'>
              <FaPlay
                onClick={playPauseHandler}
              />
            </div>
          )}
          <div className='icons-size'>
            <FaForward
              onClick={skipForward}
            />
          </div>
        </div>
        <div className='icons-size' onClick={handleRepeat}>
          <PiRepeat />
        </div>
      </div>
      <div className="volume-control">
        <div className='volume-icon'>
          <BsFillVolumeDownFill />
        </div>
        <input
          type="range"
          id="volume"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={onVolumeChange}
        />
      </div>
    </div >
  )
}

export default App