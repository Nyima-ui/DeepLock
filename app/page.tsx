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
import { getDurationInSeconds } from "@/lib/Utils";
import type { Options } from "@/types/types";
import { CustomLockDurationProps } from "@/types/types";
import { getCustomDurationInSeconds } from "@/lib/Utils";

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

  async function handleEncrypt() {
    if (activeTab !== "encrypt") return;
    let durationInSec = 0;

    if (duration === "custom" && customDuration.endDate) {
      durationInSec = getCustomDurationInSeconds(customDuration);
      console.log(durationInSec);
    } else {
      durationInSec = getDurationInSeconds(duration);
      // console.log(password, durationInSec);
    }
    // try {
    //   const currentRound = await getCurrentRound();
    // const futureRound = calculateFutureRound2(durationInSec, currentRound);
    //   const data = await encryptPassword(password, futureRound);
    //   setEncryptedKey({
    //     accessKey: data.encryptedData,
    //     unlockRound: data.unlockRound,
    //   });
    // } catch (error) {
    //   console.error(`Error encrypting your password`, error);
    // }
  }

  useEffect(() => {
    // console.log(customDuration);
  }, [customDuration]);
  return (
    <main className="bg-background text-foreground min-h-screen px-36 max-lg:px-10 max-md:px-5 py-7 flex justify-between max-xl:flex-col gap-5 pb-20">
      <div>
        <h1 className="text-[39px] max-md:text-[31px]">Generate a password</h1>
        <PassswordGenerator password={password} setPassword={setPassword} />
        <Tab activeTab={activeTab} setActiveTab={setActiveTab} />
        {!isEncrypted && (
          <LongButton
            text="Encrypt password"
            onClick={() => {
              handleEncrypt();
              setisEncrypted(true);
            }}
          />
        )}
        {isEncrypted && <Accesskey encryptionData={encryptedKey} />}
      </div>
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
    </main>
  );
};

export default Page;
