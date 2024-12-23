import { Link } from "react-router";
import PlayIcon from "../assets/play.svg?react";
import bgMusic from "../assets/sound/bg-music.mp3";
import { useEffect, useRef } from "react";

const Intro = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
      audioRef.current.volume = 0.3;
    }
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 h-screen relative">
      <div className="w-11/12 flex justify-center items-center pt-36 sm:pt-4">
        <h1 className="text-5xl font-bold text-center text-red-600 leading-[1.5]">
          Okv Shape Shifters
        </h1>
      </div>

      <div className="flex justify-center items-center w-full mt-8">
        <Link
          to={"/game"}
          title="start game"
          className="text-green-600 z-10 p-1 bg-[#f1f7c2] cursor-pointer rounded-full shadow-custom animate-scaling transition-transform"
        >
          <PlayIcon className="w-24 h-24  sm:w-28 sm:h-28" />
        </Link>
      </div>

      <div className="absolute bottom-0 w-full flex justify-around gap-8 sm:gap-4 items-center">
        <img
          src="./images/girl.png"
          alt="child"
          className="w-32 sm:w-60 h-fit"
        />
        <img
          src="./images/boy.png"
          alt="child"
          className="w-32 sm:w-60 h-fit"
        />
      </div>
      <audio ref={audioRef} src={bgMusic} loop />
    </div>
  );
};

export default Intro;
