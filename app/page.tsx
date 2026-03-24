"use client";
import dynamic from "next/dynamic";
import Tab from "@/components/Tab";
import UnlockOn from "@/components/UnlockOn";
import LongButton from "@/components/LongButton";
import Accesskey from "@/components/Accesskey";
import { useEffect, useState } from "react";
import { getCurrentRound, calculateFutureRound2 } from "@/lib/drand-service";
import { encryptPassword } from "@/lib/encryption-service";
import { generatePassword } from "@/lib/password-generator";
import { getDurationInSeconds, getLockedUntil } from "@/lib/Utils";
import type { Options } from "@/types/types";
import { CustomLockDurationProps } from "@/types/types";
import { getCustomDurationInSeconds } from "@/lib/Utils";
import Link from "next/link";
import Image from "next/image";
import NorthEast from "@/components/svgs/NorthEast";
import { useToast } from "@/context/ToastContext";
import Monitor from "@/components/svgs/Monitor";
import InputKey from "@/components/InputKey";

const PassswordGenerator = dynamic(
  () => import("@/components/PasswordGenerator"),
  { ssr: false },
);

export interface EncryptedData {
  accessKey: string;
  unlockRound: number | null;
}

const Page = () => {
  const [isEncrypted, setisEncrypted] = useState(false);
  const [encryptedKey, setEncryptedKey] = useState<EncryptedData>({
    accessKey: "",
    unlockRound: null,
  });
  const [password, setPassword] = useState(() => {
    return generatePassword({
      characters: ["uppercase", "lowercase", "numbers"],
      length: 16,
    });
  });
  const [duration, setDuration] = useState<Options>("1 hour");
  const [activeTab, setActiveTab] = useState<"encrypt" | "decrypt">("encrypt");
  const [customDuration, setCustomDuration] = useState<CustomLockDurationProps>(
    () => {
      const normalized = new Date();
      normalized.setHours(0, 0, 0, 0);
      return {
        startDate: normalized,
        endDate: null,
        endTime: "00:00:00",
      };
    },
  );
  const [lockedUntil, setlockedUntil] = useState<string | null>(null);
  const [inputAccessKey, setInputAccessKey] = useState<string>("");
  const { showToast, hideToast } = useToast();

  async function handleEncrypt() {
    if (activeTab !== "encrypt") return;
    let durationInSec = 0;

    if (duration === "custom" && !customDuration.endDate) {
      alert("Please select an end date from the calendar.");
      return;
    }

    if (duration === "custom" && customDuration.endDate) {
      durationInSec = getCustomDurationInSeconds(customDuration);
      if (durationInSec === -1) {
        alert("Selected time is already in the past.");
        return;
      }
    } else {
      durationInSec = getDurationInSeconds(duration);
    }
    try {
      const currentRound = await getCurrentRound();
      const futureRound = calculateFutureRound2(durationInSec, currentRound);
      const data = await encryptPassword(password, futureRound);
      setEncryptedKey({
        accessKey: data.encryptedData,
        unlockRound: data.unlockRound,
      });
      showToast({
        title: "Password Locked",
        message: `Your access key is ready. Locked until: ${getLockedUntil(durationInSec)}`,
        type: "success",
      });
      setlockedUntil(getLockedUntil(durationInSec));
      setisEncrypted(true);
    } catch (error) {
      console.error(`Error encrypting your password`, error);
      showToast({
        title: "Encryption failed",
        message: "Something went wrong. Please try again.",
        type: "failure",
      });
    }
  }

  useEffect(() => {
    // console.log(customDuration);
  }, [customDuration]);
  return (
    <>
      <main className="px-36 max-lg:px-10 max-md:px-5 py-7 flex justify-between max-xl:flex-col gap-5 pb-20">
        <div className="">
          <h1 className="text-[39px] max-md:text-[31px]">
            Generate a password
          </h1>
          <PassswordGenerator password={password} setPassword={setPassword} />
          <Tab activeTab={activeTab} setActiveTab={setActiveTab} />
          {!isEncrypted && activeTab === "encrypt" && (
            <LongButton
              text="Encrypt password"
              onClick={() => handleEncrypt()}
            />
          )}
          {isEncrypted && activeTab === "encrypt" && (
            <Accesskey
              encryptionData={encryptedKey}
              lockedUntil={lockedUntil}
            />
          )}
          {activeTab === "decrypt" && (
            <InputKey accessKey={inputAccessKey} onchange={setInputAccessKey} />
          )}
        </div>
        {activeTab === "encrypt" ? (
          <div className="flex-1 max-w-100 mt-0 max-xl:mt-9">
            <h2 className="text-[31px] max-lg:text-[28px] max-sm:text-[25px]">
              Unlock until
            </h2>
            <UnlockOn
              duration={duration}
              setDuration={setDuration}
              customDuration={customDuration}
              setCustomDuration={setCustomDuration}
            />
          </div>
        ) : (
          <div className="max-xl:hidden flex items-center">
            <span aria-hidden="true">
              <Monitor />
            </span>
          </div>
        )}
      </main>

      <footer className="px-36 max-lg:px-10 max-md:px-5 mt-10">
        <div className="border-t border-primary-50 py-7">
          <address className="not-italic">
            <p>Built by Tenzin Nyima</p>
            <Link href="mailto:ntenzin492@gmail.com" className="text-sm">
              ntenzin492@gmail.com
            </Link>
            <Link
              href="https://github.com/Nyima-ui/DeepLock"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View DeepLock source code on GitHub, opends in new tab"
              className="flex items-center gap-2 mt-4 group w-fit"
            >
              <span>
                <Image
                  height={32}
                  width={32}
                  src={"/github.svg"}
                  alt="Github"
                />
              </span>
              <span>GitHub</span>
              <span
                aria-hidden="true"
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-75 ease-in"
              >
                <NorthEast />
              </span>
            </Link>
          </address>
        </div>
      </footer>
    </>
  );
};

export default Page;
