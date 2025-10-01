import React from "react";

const MainDashButton = ({ text }: { text: string }) => {
  return (
    <button className="bg-mainProfile-600 hover:text-mainProfile-600 w-full py-2 border-mainProfile-600 animate rounded-lg border text-white hover:bg-transparent">
      {text}
    </button>
  );
};

export default MainDashButton;
