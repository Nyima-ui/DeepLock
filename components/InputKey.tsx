"use client";
import React, { useCallback, useEffect, useState } from "react";
import LongButton from "./LongButton";
import { useRef } from "react";
import PasswordLoader from "./PasswordLoader/PasswordLoader";

interface InputKeyProps {
  accessKey: string;
  onchange: React.Dispatch<React.SetStateAction<string>>;
  onDecrypt: () => void;
  decrypted: boolean;
  loading: boolean;
}

const InputKey = ({
  accessKey,
  onchange,
  onDecrypt,
  decrypted,
  loading,
}: InputKeyProps) => {
  const [copied, setCopied] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const resizeTextArea = useCallback(() => {
    const el = textAreaRef.current;
    if (!el) return;

    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    resizeTextArea();
    onchange(e.target.value);
  }

  useEffect(() => {
    textAreaRef.current?.focus();
    if (!accessKey) return;
    resizeTextArea();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleCopy() {
    if (!accessKey) return;
    await navigator.clipboard.writeText(accessKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 5000);
  }

  if (loading) return <PasswordLoader />;

  if (decrypted)
    return (
      <section
        className="rounded-lg p-3.75 bg-primary-800 flex flex-col gap-5 mt-11.25 w-178.75 max-md:w-auto"
        aria-label="Access key input"
      >
        <label htmlFor="password" className="font-bold text-[18px]">
          Your password
        </label>
        <input
          type="text"
          id="password"
          readOnly
          value={accessKey}
          className="focus:outline-none shadow-card rounded-lg p-3.75 text-base whitespace-pre-wrap min-w-0 focus:ring-[3px] focus:ring-primary-400 scrollbar overflow-auto"
        />
        <LongButton
          text={copied ? "Copied" : "Copy password"}
          className="self-start grow-0 mt-0"
          onClick={handleCopy}
        />
      </section>
    );

  return (
    <section
      className="rounded-lg p-3.75 bg-primary-800 flex flex-col gap-5 mt-11.25 w-178.75 max-md:w-auto"
      aria-label="Access key input"
    >
      <label htmlFor="access-key" className="font-bold text-[18px]">
        Access key
      </label>
      <textarea
        ref={textAreaRef}
        name="access-key"
        id="access-key"
        value={accessKey}
        onChange={handleChange}
        aria-describedby="access-key-hint"
        aria-required="true"
        className="focus:outline-none shadow-card rounded-lg p-3.75 text-base whitespace-pre-wrap min-w-0 focus:ring-[3px] focus:ring-primary-400 scrollbar overflow-auto"
        placeholder="Your access key here"
      ></textarea>

      <p id="access-key-hint" className="sr-only">
        Paste your AGE encrypted access key. Formatting and line breaks will be
        preserved.
      </p>
      <LongButton
        text="Decrypt password"
        className="mt-0 grow-0 self-start"
        onClick={onDecrypt}
      />
    </section>
  );
};

export default InputKey;
