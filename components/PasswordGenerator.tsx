"use client";
import { useState } from "react";
import CopyButton from "@/components/CopyButton";
import Loop from "@/components/svgs/Loop";
import Unchecked from "@/components/svgs/Unchecked";
import Checked from "@/components/svgs/Checked";
import { generatePassword } from "@/lib/password-generator";
import { type Character } from "@/lib/password-generator";

const PassswordGenerator = () => {
  const [password, setPassword] = useState(() => {
    return generatePassword({
      characters: ["uppercase", "lowercase", "numbers"],
      length: 16,
    });
  });
  const [length, setLength] = useState(16);
  const [copied, setCopied] = useState(false);

  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: false,
  });

  function toggleOption(key: keyof typeof options) {
    const checkedCount = Object.values(options).filter(Boolean).length;
    if (checkedCount === 1 && options[key]) return;

    const nextOptions = { ...options, [key]: !options[key] };
    setOptions(nextOptions);

    const characters = (Object.keys(nextOptions) as Character[]).filter(
      (char) => nextOptions[char],
    );

    handleGenerate({ characters });
  }

  const checkboxes = [
    { id: "uppercase", label: "ABC", title: "Uppercase letters" },
    { id: "lowercase", label: "abc", title: "Lowercase letters" },
    { id: "numbers", label: "123", title: "Numbers" },
    { id: "symbols", label: "$#&", title: "Symbols" },
  ] as const;

  function handleGenerate(overrides?: {
    characters?: Character[];
    length?: number;
  }) {
    const characters =
      overrides?.characters ??
      (Object.keys(options) as Character[]).filter((char) => options[char]);

    const password = generatePassword({
      characters,
      length: overrides?.length ?? length,
    });
    setPassword(password);
  }

  async function handleCopy() {
    if (!password) return;
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="bg-card rounded-lg p-3.75 max-sm:p-2.5 shadow-card mt-7.5 max-sm:mt-5 flex flex-col gap-7.5">
      {/* generator  */}
      <div role="group" className="flex gap-6 max-sm:gap-3.75">
        <div className="relative flex-1">
          <input
            type="text"
            className="w-full bg-primary-900 h-full rounded-lg shadow-[2px_2px_4px_0px_rgba(55,39,114,0.5)] focus:outline-none focus:border-primary focus:ring-[3px] focus:ring-primary-500/50 px-5 text-[20px] truncate pr-10 select-none"
            value={password}
            readOnly
            onMouseDown={(e) => e.preventDefault()}
          />
          <button
            type="button"
            aria-label="Generate new password"
            className="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer"
            onClick={() => handleGenerate()}
          >
            <span aria-hidden="true">
              <Loop />
            </span>
          </button>
        </div>
        <CopyButton
          text={copied ? "Copied!" : "Copy"}
          fontSize={"text-[20px]"}
          onClick={handleCopy}
        />
      </div>

      {/* length setter  */}
      <div className="flex items-center justify-between max-sm:flex-col max-sm:items-start gap-5 max-sm:gap-5">
        <div className="text-[20px]">
          <label htmlFor="password-length">Password length:</label>
          <span className="ml-0.5" aria-live="polite">
            {length}
          </span>
        </div>

        <div className="flex items-center relative gap-1.25">
          <button
            type="button"
            aria-label={`Decrease length, current: ${length}`}
            onClick={() => {
              setLength((l) => Math.max(1, l - 1));
              handleGenerate({ length: Math.max(1, length - 1) });
            }}
            className="size-10 rounded-full border border-primary-600 cursor-pointer hover:bg-primary-500 transition-colors duration-150 ease-in"
          >
            -
          </button>

          <div className="relative flex-1 flex items-center">
            <div
              aria-hidden="true"
              className="absolute left-0 h-2.5 bg-primary pointer-events-none rounded-l-2xl"
              style={{ width: `${((length - 1) / (64 - 1)) * 100}%` }}
            />
            <input
              type="range"
              id="password-length"
              min={1}
              max={64}
              step={1}
              value={length}
              onChange={(e) => {
                const newLength = Number(e.target.value);
                setLength(newLength);
                handleGenerate({ length: newLength });
              }}
              className="slider"
            />
          </div>

          <button
            type="button"
            aria-label={`Increase length, current: ${length}`}
            onClick={() => {
              setLength((l) => Math.min(64, l + 1));
              handleGenerate({ length: Math.min(64, length + 1) });
            }}
            className="size-10 rounded-full border border-primary-600 cursor-pointer hover:bg-primary-500"
          >
            +
          </button>
        </div>
      </div>

      {/* character options */}
      <fieldset className="flex items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-5">
        <p className="text-[20px]">Include characters</p>

        <div className="flex items-center justify-between flex-1 max-w-82.25 max-sm:gap-6.25">
          {checkboxes.map(({ id, label, title }) => (
            <label key={id} title={title}>
              <input
                type="checkbox"
                id={id}
                checked={options[id]}
                onChange={() => toggleOption(id)}
                className="sr-only"
              />
              <div className="flex items-center gap-1">
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

export default PassswordGenerator;
