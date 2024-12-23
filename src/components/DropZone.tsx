import TriangleIcon from "../assets/triangle.svg?react";
import SquareIcon from "../assets/square.svg?react";
import CircleIcon from "../assets/circle.svg?react";
import { useDrop } from "react-dnd";
import ArrowIcon from "../assets/arrow.svg?react";
import CrossIcon from "../assets/cross.svg?react";
import TickIcon from "../assets/tick.svg?react";

export type TItem = {
  shape: string;
  id: string;
};

type Props = {
  currentShape: string;
  onDrop: (item: TItem) => void;
  status: {
    message: string;
    type: "success" | "failed";
  } | null;
  isDragging: boolean;
};

const ItemTypes = {
  SHAPE: "shape",
};

const DropZone = ({ currentShape, onDrop, status, isDragging }: Props) => {
  const [{}, drop] = useDrop(
    () => ({
      accept: ItemTypes.SHAPE,
      drop: (item: any) => onDrop(item),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }),
    [onDrop]
  );

  return (
    <div ref={drop} className={"w-40 h-40 mb-4 relative"}>
      {currentShape === "circle" ? (
        <CircleIcon className="w-full h-full" />
      ) : currentShape === "square" ? (
        <SquareIcon className="w-full h-full" />
      ) : (
        <TriangleIcon className="w-full h-full" />
      )}

      {status ? (
        <span className="absolute top-0 w-full h-full flex items-center justify-center">
          {status?.type === "failed" ? (
            <CrossIcon
              className={`w-16 h-16 animate-pulse text-red-600 transition-all`}
            />
          ) : status?.type === "success" ? (
            <TickIcon
              className={`w-16 h-16 animate-pulse text-green-600 transition-all`}
            />
          ) : null}
        </span>
      ) : null}
      <span className="absolute  top-4 -right-8 -rotate-45">
        <ArrowIcon
          className={`w-10 h-10 ${
            isDragging ? "animate-shaking" : ""
          } transition-transform  text-red-600`}
        />
      </span>
      <span className="absolute  bottom-4 -right-8 rotate-[20deg]">
        <ArrowIcon
          className={`w-10 h-10 ${
            isDragging ? "animate-shaking" : ""
          } transition-transform  text-red-600`}
        />
      </span>
      <span className="absolute  top-4 -left-8 rotate-180">
        <ArrowIcon
          className={`w-10 h-10 ${
            isDragging ? "animate-shaking" : ""
          } transition-transform  text-red-600`}
        />
      </span>
      <span className="absolute  bottom-4 -left-8 rotate-180">
        <ArrowIcon
          className={`w-10 h-10 ${
            isDragging ? "animate-shaking" : ""
          } transition-transform  text-red-600`}
        />
      </span>
    </div>
  );
};

export default DropZone;
