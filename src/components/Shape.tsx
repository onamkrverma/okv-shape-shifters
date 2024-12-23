import { useEffect } from "react";
import { useDrag } from "react-dnd";

type Props = {
  id: string;
  image: string;
  shape: string;
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
};

const ItemTypes = {
  SHAPE: "shape",
};

const Shape = ({ id, shape, image, setIsDragging }: Props) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.SHAPE,
    item: { id, shape },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  useEffect(() => {
    setIsDragging(isDragging);
  }, [isDragging]);

  return (
    <img
      ref={drag}
      className={`w-20 h-20 cursor-grab drop-filter-shadow ${
        isDragging ? "opacity-20" : ""
      }`}
      src={image}
      alt={shape}
      draggable
    />
  );
};

export default Shape;
