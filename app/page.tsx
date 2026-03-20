"use client";
import { useEffect, useState } from "react";
import CopyButton from "@/components/CopyButton";
import Loop from "@/components/svgs/Loop";
import Unchecked from "@/components/svgs/Unchecked";
import Checked from "@/components/svgs/Checked";

const PassswordGenerator = () => {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    number: true,
    symbols: false,
  });

  function toggleOption(key: keyof typeof options) {
    const checkedCount = Object.values(options).filter(Boolean).length;
    if (checkedCount === 1 && options[key]) return;
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  useEffect(() => {
    console.log(options);
  }, [options]);

  const checkboxes = [
    { id: "uppercase", label: "ABC", title: "Uppercase letters" },
    { id: "lowercase", label: "abc", title: "Lowercase letters" },
    { id: "number", label: "123", title: "Numbers" },
    { id: "symbols", label: "$#&", title: "Symbols" },
  ] as const;

  return (
    <div className="bg-card rounded-lg p-[15px] shadow-card mt-[30px] space-y-[30px]">
      {/* generator  */}
      <div role="group" className="flex gap-[24px]">
        <div className="relative flex-1">
          <input
            type="text"
            className="w-full bg-primary-900 h-full rounded-lg shadow-[2px_2px_4px_0px_rgba(55,39,114,0.5)] focus:outline-none focus:border-primary focus:ring-[3px] focus:ring-primary-500/50 px-[20px] text-[20px]"
            readOnly
          />
          <button
            type="button"
            aria-label="Generate new password"
            className="absolute top-1/2 -translate-y-1/2 right-[20px] cursor-pointer"
          >
            <span aria-hidden="true">
              <Loop />
            </span>
          </button>
        </div>
        <CopyButton text={"Copy"} fontSize={"text-[20px]"} />
      </div>

      {/* length setter  */}
      <div className="flex items-center justify-between">
        <div className="text-[20px]">
          <label htmlFor="password-length">Password length:</label>
          <span className="ml-[2px]" aria-live="polite">
            {length}
          </span>
        </div>

        <div className="flex items-center relative gap-[5px]">
          <button
            type="button"
            aria-label={`Decrease length, current: ${length}`}
            onClick={() => setLength((l) => Math.max(1, l - 1))}
            className="size-[40px] rounded-full border border-primary-600 cursor-pointer"
          >
            -
          </button>

          <div className="relative flex-1 flex items-center">
            <div
              aria-hidden="true"
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
            aria-label={`Increase length, current: ${length}`}
            onClick={() => setLength((l) => Math.min(64, l + 1))}
            className="size-[40px] rounded-full border border-primary-600 cursor-pointer"
          >
            +
          </button>
        </div>
      </div>

      {/* character options */}
      <fieldset className="flex items-center justify-between">
        <p className="text-[20px]">Include characters</p>

        <div className="flex items-center justify-between flex-1 max-w-[329px]">
          {checkboxes.map(({ id, label, title }) => (
            <label key={id} title={title} className="">
              <input
                type="checkbox"
                id={id}
                checked={options[id]}
                onChange={() => toggleOption(id)}
                className="sr-only"
              />
              <div className="flex items-center gap-[4px]">
                <span>{options[id] ? <Checked /> : <Unchecked />}</span>
                <span className="select-none">{label}</span>
              </div>
            </label>
          ))}
        </div>
      </fieldset>
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
