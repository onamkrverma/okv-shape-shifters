import React from "react";

type Props = {
  setIsPopup: React.Dispatch<React.SetStateAction<boolean>>;
};

const Popup = ({ setIsPopup }: Props) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-20 backdrop-blur-sm flex items-center justify-center">
      {/* close popup */}
      <div
        className="h-full w-full absolute top-0"
        onClick={() => setIsPopup(false)}
      ></div>

      <div className="flex flex-col gap-2 p-4 bg-primary border border-neutral-600 shadow-md rounded-md w-10/12 max-w-md z-[2]">
        <div className="border-b pb-2 flex flex-col justify-between items-center relative">
          <h1 className="text-indigo-600 text-2xl">Instruction</h1>
          <button
            type="button"
            title="close"
            onClick={() => setIsPopup(false)}
            className="bg-red-600 text-white w-8 h-8 font-bold text-sm flex items-center justify-center rounded-full absolute -top-8 -right-8"
          >
            X
          </button>
          <p className="text-xl font-semibold">
            Drag the object that matches the given shape.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Popup;
