import { useEffect, useRef, useState } from "react";
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
import { useNavigate } from "react-router";
import BackIcon from "../assets/back.svg?react";
import ReplayIcon from "../assets/replay.svg?react";
import ClappingSound from "../assets/sound/clapping.mp3";
import ErrorSound from "../assets/sound/error.mp3";
import FailedAudio from "../assets/sound/failed.mp3";
import InstrunctionAudio from "../assets/sound/instruction.mp3";
import PopSound from "../assets/sound/pop.mp3";
import SuccessAudio from "../assets/sound/success.mp3";
import DropZone from "../components/DropZone";
import Shape from "../components/Shape";
import { shapesInfo } from "../utils/shapes";
import InfoIcon from "../assets/info.svg?react";
import Popup from "../components/Popup";
import bgMusic from "../assets/sound/bg-music.mp3";

const Game = () => {
  const shapes = ["circle", "square", "triangle"];

  const [currentShape, setCurrentShape] = useState(shapes[0]);
  const [availableShapes, setAvailableShapes] = useState(shapesInfo);
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState<{
    message: string;
    type: "success" | "failed";
  } | null>(null);
  const [score, setScore] = useState(0);
  const [isPopup, setIsPopup] = useState(false);

  const [audioFile, setAudioFile] = useState(InstrunctionAudio);

  const audioEffectRef = useRef<HTMLAudioElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioBgRef = useRef<HTMLAudioElement>(null);
  const navigation = useNavigate();

  const handleDrop = (item: { shape: string; id: string }) => {
    const { shape, id } = item;
    if (shape === currentShape) {
      setStatus({ message: "Yay! You did it! Great job!", type: "success" });
      setScore(score + 1);
      setAudioFile(SuccessAudio);
      setIsDragging(false);
      const availableObj = availableShapes.filter((item) => item.id !== id);
      setAvailableShapes(availableObj);
      if (availableObj.length > 0) {
        setCurrentShape(
          availableObj[Math.floor(Math.random() * availableObj.length)].shape
        );
      } else {
        setCurrentShape(shapes[Math.floor(Math.random() * shapes.length)]);
      }
    } else {
      setAudioFile(FailedAudio);
      setStatus({
        message: "Oops, that's incorrect. The shape doesn't match.",
        type: "failed",
      });
    }

    setTimeout(() => {
      setStatus(null);
    }, 1500);
  };

  useEffect(() => {
    if (status) {
      audioRef.current?.play();
      audioEffectRef.current?.play();
    }
    if (isPopup) {
      audioRef.current?.play();
    }
  }, [status, isPopup]);

  useEffect(() => {
    if (availableShapes.length === 0) {
      setAudioFile(ClappingSound);
      setStatus({ message: "", type: "success" });
    }
  }, [availableShapes]);

  useEffect(() => {
    if (audioBgRef.current) {
      audioBgRef.current?.play();
      audioBgRef.current.volume = 0.15;
    }
  }, []);

  return (
    <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
      <div className="flex flex-col items-center gap-4 py-8 ">
        <div className="w-full flex justify-between items-center mt-16 px-4 sm:m-0 sm:px-28">
          <button
            type="button"
            title="back"
            className=" bg-primary shadow-custom rounded-full"
            onClick={() => navigation(-1)}
          >
            <BackIcon className="w-16 h-16 text-indigo-600" />
          </button>

          <p className="font-bold text-xl bg-primary  px-4">Score: {score}</p>

          <button
            type="button"
            title="instruction"
            className="bg-primary shadow-custom rounded-full"
            onClick={() => {
              setIsPopup(true);
              setAudioFile(InstrunctionAudio);
            }}
          >
            <InfoIcon className="w-12 h-12 text-green-600" />
          </button>
        </div>

        {availableShapes.length > 0 ? (
          <div className="flex flex-col gap-2 items-center">
            <div className="text-center bg-primary px-4">
              <p className="text-xl font-semibold">Drag the similar Shape</p>
              <h1 className="text-2xl font-bold text-red-600 capitalize">
                {currentShape}
              </h1>
            </div>

            <DropZone
              currentShape={currentShape}
              onDrop={handleDrop}
              status={status}
              isDragging={isDragging}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-center">
            <img
              src="./images/congratulations.gif"
              alt="congratulations"
              className="w-80 h-80"
            />
            <h1 className="text-2xl font-bold text-green-600 bg-primary px-4">
              Your current score is: {score}
            </h1>

            <button
              type="button"
              title="replay"
              className="bg-indigo-600 text-white w-40 text-xl font-bold p-1.5 px-4 rounded-md flex items-center justify-center gap-1"
              onClick={() => navigation(0)}
            >
              Replay <ReplayIcon className="w-6 h-6" />
            </button>
          </div>
        )}
        <p className={`p-2 h-10 sm:text-xl ${status ? "bg-primary" : ""}`}>
          {status?.message}
        </p>

        <div className="flex flex-wrap gap-4 justify-center mx-auto w-10/12">
          {availableShapes.map((item) => (
            <Shape
              key={item.id}
              id={item.id}
              shape={item.shape}
              image={item.image}
              setIsDragging={setIsDragging}
            />
          ))}
        </div>
        <audio
          ref={audioEffectRef}
          src={status?.type === "failed" ? ErrorSound : PopSound}
        />
        <audio ref={audioRef} src={audioFile} />
        <audio ref={audioBgRef} src={bgMusic} loop />

        {isPopup ? <Popup setIsPopup={setIsPopup} /> : null}
      </div>
    </DndProvider>
  );
};

export default Game;
