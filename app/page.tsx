"use client";
import { useState } from "react";

export default function Home() {
  const [password, setPassword] = useState("");
  const PASSWORD_LENGTH = 10;

  function generatePassword() {
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%&*()_+-=[]{|;<>?";

    const allChars = lowercase + uppercase + numbers + symbols;

    let newPassword = "";

    newPassword += lowercase[Math.floor(Math.random() * lowercase.length)];
    newPassword += uppercase[Math.floor(Math.random() * uppercase.length)];
    newPassword += numbers[Math.floor(Math.random() * numbers.length)];
    newPassword += symbols[Math.floor(Math.random() * symbols.length)];

    for (let i = 4; i < PASSWORD_LENGTH; i++) {
      newPassword += allChars[Math.floor(Math.random() * allChars.length)];
    }

    newPassword = newPassword
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
    setPassword(newPassword);
  }

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const date = formData.get("date");
    const hour = formData.get("hour");
    const minute = formData.get("minute")
    console.log(date, hour, minute);
    generatePassword();
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
          type="submit"
          className="cursor-pointer border rounded-sm mt-4 px-4 py-2 hover:border-sky-300"
        >
          Generate
        </button>
      </form>
    </div>
  );
}
