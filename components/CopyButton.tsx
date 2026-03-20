import React from "react";

interface CopyButtonProps {
  text: string;
  fontSize: string;
  onClick: () => void;
}

const CopyButton = ({ text, fontSize, onClick }: CopyButtonProps) => {
  return (
    <button
      className={`bg-primary px-3 max-sm:px-2 py-2.75 max-sm:py-2 rounded-lg ${fontSize} cursor-pointer font-medium hover:bg-primary/90 transition duration-200 ease-in`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default CopyButton;
