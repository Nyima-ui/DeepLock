import React from "react";

interface CopyButtonProps {
  text: string;
  fontSize: string;
  onClick: () => void;
}

const CopyButton = ({ text, fontSize, onClick }: CopyButtonProps) => {
  return (
    <button
      className={`bg-primary px-3 max-sm:px-2 py-2.75 max-sm:py-2 rounded-lg ${fontSize} cursor-pointer font-medium hover:opacity-95 transition-opacity duration-150 ease-in bg-linear-to-b from-primary-200 to-primary`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default CopyButton;
