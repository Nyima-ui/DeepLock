import React from "react";

interface CopyButtonProps {
  text: string;
  fontSize: string;
}

const CopyButton = ({ text, fontSize }: CopyButtonProps) => {
  return <button className={`bg-primary px-3 py-2.75 rounded-lg ${fontSize} cursor-pointer font-medium hover:bg-primary/90 transition duration-200 ease-in`}>{text}</button>;
};

export default CopyButton;
