"use client";
import { useState } from "react";
import { generateSecurePassword } from "@/lib/password-generator";
import {
  calculateFutureRound,
  parseDateTimeInput,
  getCurrentRound,
} from "@/lib/drand-service";
import { encryptPassword, decryptPassword } from "@/lib/encryption-service";

export default function Home() {
  const [password, setPassword] = useState("");
  const [encryptedData, setEncryptedData] = useState("");
  const [unLockRound, setUnLockRound] = useState<string | null>(null);
  const PASSWORD_LENGTH = 10;

  function generatePassword() {
    const newPassword = generateSecurePassword(PASSWORD_LENGTH);
    setPassword(newPassword);
  }

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const date = formData.get("date") as string;
    const hour = formData.get("hour") as string;
    const minute = formData.get("minute") as string;

    if (!password) {
      alert("Please generate a password first!");
      return;
    }
    try {
      const currentRound = await getCurrentRound();
      const unlockDate = parseDateTimeInput(date, hour, minute);
      const futureRound = calculateFutureRound(currentRound, unlockDate);
      if (!futureRound) {
        alert("Please select a future date and time");
        return;
      }

      const data = await encryptPassword(password, futureRound);
      setEncryptedData(data.encryptedData);
      setUnLockRound(data.unlockRound.toString());
      alert("Password locked successfully ✅")
    } catch (error) {
      console.error("Encryption failed", error);
      alert("Encryption failed: try again later");
    }
  }

  async function handleDecrypt() {
    if (!encryptedData) {
      alert("No encrypted data to decrypt!");
      return;
    }
    const password = await decryptPassword(encryptedData);
    if (!password) return;
    setPassword(password);
    alert(`Decrypted text: ${password}`);
  }

  return (
    <div className="p-5">
      <h1 className="text-5xl">Fill in the details</h1>
      <form className="mt-5" onSubmit={handleSubmit}>
        <div className="flex gap-10">
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="text"
              name="password"
              id="password"
              placeholder="click Generate"
              value={password}
              readOnly
              className="border block outline-none focus:border-sky-300 rounded-sm py-1 px-1.5 mt-2"
            />
          </div>

          <div>
            <div>
              <label htmlFor="date">Date</label>
              <input
                type="date"
                className="border block outline-none focus:border-sky-300 rounded-sm py-1 px-1.5 mt-2 cursor-pointer scheme-dark"
                // defaultValue={new Date().toISOString().split("T")[0]}
                id="date"
                name="date"
                required
              />
            </div>
            <div className="mt-5">
              <p>Time</p>
              <div className="flex gap-5">
                <div>
                  <label htmlFor="hour">Hour</label>
                  <select
                    name="hour"
                    id="hour"
                    className="bg-background  ml-3 w-15 cursor-pointer border py-0.5 rounded-sm focus:border-sky-300"
                    required
                  >
                    {Array.from({ length: 24 }).map((_, i) => {
                      const value = String(i).padStart(2, "0");
                      return (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div>
                  <label htmlFor="hour">Minute</label>
                  <select
                    name="minute"
                    id="minute"
                    className="bg-background  ml-3 w-15 cursor-pointer border py-0.5 rounded-sm focus:border-sky-300"
                    required
                  >
                    {Array.from({ length: 60 }).map((_, i) => {
                      const value = String(i).padStart(2, "0");
                      return (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={generatePassword}
          className="cursor-pointer border rounded-sm mt-4 px-4 py-2 hover:border-sky-300"
        >
          Generate Password
        </button>
        <button
          type="submit"
          className="cursor-pointer border rounded-sm mt-4 px-4 py-2 hover:border-sky-300 ml-5"
        >
          Lock Password
        </button>
      </form>

      <div className="flex justify-between gap-5">
        <div className="flex-1">
          <label htmlFor="access-key">Access key</label>
          <textarea
            name="access-key"
            id="access-key"
            className="border w-full h-20 block mt-2"
            value={encryptedData}
            onChange={(e) => setEncryptedData(e.currentTarget.value)}
          ></textarea>
        </div>
        <div>
          <label htmlFor="decrypted-text">Decrypted text</label>
          <input
            type="text"
            name="decrypted-text"
            className="border block px-4 py-2"
            value={password}
            readOnly
          />
        </div>
      </div>
      {unLockRound && <p>You will get your password at round {unLockRound}</p>}
      <button
        type="button"
        className="border cursor-pointer px-5 py-2 mt-5"
        onClick={handleDecrypt}
      >
        Decrpt
      </button>
    </div>
  );
}
