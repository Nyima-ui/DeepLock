"use client";
import LongButton from "./LongButton";
import { EncryptedData } from "@/app/page";
import { useEffect, useRef, useState } from "react";

interface AccessKeyProps {
  encryptionData: EncryptedData;
  lockedUntil: string | null;
}

const Accesskey = ({ encryptionData, lockedUntil }: AccessKeyProps) => {
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  async function handleCopy() {
    if (!encryptionData.accessKey) return;
    await navigator.clipboard.writeText(encryptionData.accessKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 5000);
  }
  useEffect(() => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, []);
  return (
    <section
      ref={sectionRef}
      aria-labelledby="access-key-heading"
      className="bg-card rounded-lg p-3.75 mt-11.25 space-y-5 max-w-175"
    >
      <h2 id="access-key-heading" className="text-[20px] font-semibold">
        Access key
      </h2>
      <pre
        aria-label="Encrypted access key"
        aria-readonly="true"
        tabIndex={0}
        className="whitespace-pre-wrap break-all shadow-sm shadow-primary-600 rounded-lg max-w-171.25 p-3.75 max-sm:text-sm font-mono"
      >
        <code>{encryptionData.accessKey}</code>
      </pre>

      <div>
        <p className="max-md:text-sm">
          Save this key now — it can&apos;t be recovered once you leave.
        </p>
        <p className="max-md:text-sm mt-2">
          Your password unlocks at round -{" "}
          <span className="font-bold">{encryptionData.unlockRound}</span>
          <span>: </span>
          <span className="font-semibold">
            {lockedUntil ? lockedUntil : ""}
          </span>
        </p>
      </div>

      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        id="copy-status"
      />

      <LongButton
        text={copied ? "Copied" : "Copy key"}
        className="mt-0"
        aria-label="Copy acccess key to clipboard"
        aria-describedby="copy-status"
        onClick={handleCopy}
      />
    </section>
  );
};

export default Accesskey;
