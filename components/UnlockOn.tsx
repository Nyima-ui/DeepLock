"use client";
import { useEffect, useRef, useState } from "react";
import ChevronDown from "./svgs/ChevronDown";
import Calendar from "./Calendar";

const UnlockOn = () => {
  const [isOpen, setisOpen] = useState(false);
  const [selected, setSelected] = useState("1 hour");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLUListElement>(null);

  function handleSelect(option: string) {
    setSelected(option);
    setisOpen(false);
    if (option === "Custom") {
      setIsCalendarOpen(true);
    } else {
      setIsCalendarOpen(false);
    }
    triggerRef.current?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") setisOpen(false);
  }

  const options = ["1 hour", "6 hours", "1 day", "3 days", "1 week", "Custom"];

  useEffect(() => {
    if (isCalendarOpen) {
      calendarRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [isCalendarOpen]);

  useEffect(() => {
    if (isOpen) {
      optionsRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [isOpen]);

  return (
    <div
      className="text-[20px] mt-9.5 max-xl:mt-4 relative"
      role="combobox"
      aria-haspopup="listbox"
      aria-expanded={isOpen}
      aria-label="Select unlock duration"
      aria-controls="listbox"
    >
      {/* trigger */}
      <button
        ref={triggerRef}
        aria-label={`Unlock dudration, currently ${selected}`}
        className="bg-primary-700 px-5 py-3 max-sm:py-2 shadow-card rounded-lg cursor-pointer flex items-center justify-between w-full focus:outline-none focus:ring focus:ring-primary-400"
        onClick={() => setisOpen(!isOpen)}
        onKeyDown={handleKeyDown}
      >
        <span aria-hidden="true">{selected}</span>
        <span className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>
          <ChevronDown />
        </span>
      </button>

      {/* options */}
      {isOpen && (
        <ul
          ref={optionsRef}
          className="w-full top-full mt-2.5 bg-primary-700 rounded-lg shadow-card z-10 overflow-hidden p-1.25 mb-15"
          role="listbox"
          id="listbox"
        >
          {options.map((option) => (
            <li
              key={option}
              role="option"
              aria-selected={selected === option}
              tabIndex={0}
              className="px-2.5 py-2 max-sm:py-1.5 hover:bg-primary-500 select-none rounded-lg"
              onClick={() => handleSelect(option)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleSelect(option);
                }
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}

      {/* calendar */}
      {isCalendarOpen && (
        <div ref={calendarRef} className="mb-10">
          <Calendar />
        </div>
      )}
    </div>
  );
};

export default UnlockOn;
