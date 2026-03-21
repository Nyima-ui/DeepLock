"use client";
import { useState } from "react";
import ChevronDown from "./svgs/ChevronDown";

const UnlockOn = () => {
  const [isOpen, setisOpen] = useState(false);
  const [selected, setSelected] = useState("1 hour");

  const options = ["1 hour", "6 hours", "1 day", "3 days", "1 week", "Custom"];

  return (
    <div className="text-[20px] mt-9.5 max-sm:mt-4 relative">
      {/* trigger */}
      <div
        className="bg-primary-700 px-5 py-3 max-sm:py-2 shadow-card rounded-lg cursor-pointer flex items-center justify-between"
        onClick={() => setisOpen(!isOpen)}
      >
        <span>{selected}</span>
        <span className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>
          <ChevronDown />
        </span>
      </div>

      {/* options */}
      {isOpen && (
        <div className="w-full top-full mt-2.5 bg-primary-700 rounded-lg shadow-card z-10 overflow-hidden p-[5px]">
          {options.map((option) => (
            <div
              key={option}
              className="px-[10px] py-[8px] max-sm:py-[6px] hover:bg-primary-500 select-none rounded-lg"
              onClick={() => {
                setSelected(option);
                setisOpen(false)
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UnlockOn;
