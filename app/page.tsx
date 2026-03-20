"use client";
import { useEffect, useState } from "react";
import CopyButton from "@/components/CopyButton";
import Loop from "@/components/svgs/Loop";

const PassswordGenerator = () => {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    number: true,
    symbols: false,
  });
  
  useEffect(() => {
    console.log(length);
  }, [length]);

  const checkboxes = [
    { id: "uppercase", label: "ABC", title: "Uppercase letters" },
    { id: "lowercase", label: "abc", title: "Lowercase letters" },
    { id: "number", label: "123", title: "Numbers" },
    { id: "symbols", label: "$#&", title: "Symbols" },
  ] as const;

  return (
    <div className="bg-card rounded-lg p-[15px] shadow-card mt-[30px] space-y-[30px]">
      {/* generator  */}
      <form className="flex gap-[24px]">
        <div className="relative flex-1">
          <input
            type="text"
            className="w-full bg-primary-900 h-full rounded-lg shadow-[2px_2px_4px_0px_rgba(55,39,114,0.5)] focus:outline-none focus:border-primary focus:ring-[3px] focus:ring-primary-500/50 px-[20px] text-[20px]"
          />
          <button
            type="button"
            className="absolute top-1/2 -translate-y-1/2 right-[20px] cursor-pointer"
          >
            <span>
              <Loop />
            </span>
          </button>
        </div>
        <CopyButton text={"Copy"} fontSize={"text-[20px]"} />
      </form>

      {/* length setter  */}
      <div className="flex items-center justify-between">
        <div className="text-[20px]">
          <label htmlFor="password-length">Password length:</label>
          <span className="ml-[2px]">{length}</span>
        </div>

        <div className="flex items-center relative gap-[5px]">
          <button
            type="button"
            aria-label="Decrease length"
            onClick={() => setLength((l) => Math.max(1, l - 1))}
            className="size-[40px] rounded-full border border-primary-600 cursor-pointer"
          >
            -
          </button>

          <div className="relative flex-1 flex items-center">
            <div
              className="absolute left-0 h-[10px] bg-primary pointer-events-none rounded-l-2xl"
              style={{ width: `${((length - 2) / (64 - 2)) * 100}%` }}
            />
            <input
              type="range"
              id="password-length"
              min={1}
              max={64}
              step={1}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="slider"
            />
          </div>

          <button
            type="button"
            aria-label="Increase length"
            onClick={() => setLength((l) => Math.min(64, l + 1))}
            className="size-[40px] rounded-full border border-primary-600 cursor-pointer"
          >
            +
          </button>
        </div>
      </div>

      {/* character  */}
      <div className="flex items-center justify-between">
        <p className="text-[20px]">Include characters</p>

        <div className="flex items-center justify-between flex-1 max-w-[330px]">
          {checkboxes.map(({ id, label, title }) => (
            <label key={id} title={title} className="">
              <input type="checkbox" id={id} checked={true} />
            </label>
          ))}
          {/* <div className="flex items-center">
            <input type="checkbox" id="uppercase" />
            <label htmlFor="uppercase">ABC</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="lowercase" />
            <label htmlFor="lowercase">abc</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="number" />
            <label htmlFor="number">123</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="symbols" />
            <label htmlFor="symbols">$#&</label>
          </div> */}
        </div>
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <div className="bg-background text-foreground min-h-screen px-[144px] max-lg:px-[40px] max-md:px-[20px] py-[60px]">
      <div className="max-w-[600px]">
        <h1 className="text-[39px] max-md:text-[31px]">Generate a password</h1>
        <PassswordGenerator />
      </div>
    </div>
  );
};

export default Page;
