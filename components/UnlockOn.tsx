"use client";
import { useEffect, useRef, useState } from "react";
import ChevronDown from "./svgs/ChevronDown";
import Calendar from "./Calendar";
import type { Options, CustomLockDurationProps } from "@/types/types";

interface UnlockOnProps {
  duration: string;
  setDuration: (val: Options) => void;
  customDuration: CustomLockDurationProps;
  setCustomDuration: React.Dispatch<
    React.SetStateAction<CustomLockDurationProps>
  >;
}

const UnlockOn = ({
  duration,
  setDuration,
  customDuration,
  setCustomDuration,
}: UnlockOnProps) => {
  const [isOpen, setisOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLUListElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  function handleSelect(option: Options) {
    setDuration(option);
    setisOpen(false);
    if (option === "custom") {
      setIsCalendarOpen(true);
    } else {
      setIsCalendarOpen(false);
    }
    triggerRef.current?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") setisOpen(false);
  }

  const options: Options[] = [
    "1 hour",
    "6 hours",
    "1 day",
    "3 days",
    "1 week",
    "custom",
  ];

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

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setisOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div
      ref={containerRef}
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
        aria-label={`Unlock dudration, currently ${duration}`}
        className="bg-primary-700 px-5 py-3 max-sm:py-2 shadow-card rounded-lg cursor-pointer flex items-center justify-between w-full focus:outline-none focus:ring focus:ring-primary-400"
        onClick={() => {
          setisOpen(!isOpen);
          if (isCalendarOpen) {
            setIsCalendarOpen(false);
          }
        }}
        onKeyDown={handleKeyDown}
      >
        <span aria-hidden="true">
          {duration === "custom"
            ? duration.charAt(0).toUpperCase() + duration.slice(1)
            : duration}
        </span>
        <span className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>
          <ChevronDown />
        </span>
      </button>

      {/* options */}
      {isOpen && (
        <ul
          ref={optionsRef}
          className="w-full top-full mt-2.5 bg-primary-700 rounded-lg shadow-card z-10 overflow-hidden p-1.25"
          role="listbox"
          id="listbox"
        >
          {options.map((option) => (
            <li
              key={option}
              role="option"
              aria-selected={duration === option}
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
              {option === "custom"
                ? option.charAt(0).toUpperCase() + option.slice(1)
                : option}
            </li>
          ))}
        </ul>
      )}

      {/* calendar */}
      {isCalendarOpen && (
        <div ref={calendarRef} className="mb-10">
          <Calendar
            customDuration={customDuration}
            setCustomDuration={setCustomDuration}
          />
        </div>
      )}
    </div>
  );
};

export default UnlockOn;
