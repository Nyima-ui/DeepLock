"use client";

import { useState } from "react";

const Tab = () => {
  const [activeTab, setActiveTab] = useState<"encrypt" | "decrypt">("encrypt");
  return (
    <div
      className="bg-primary-700 rounded-lg flex items-center mt-7.5 p-1.5 relative gap-3.5"
      role="tablist"
    >
      <div
        className={`absolute top-1.5 h-[calc(100%-12px)] w-[calc(50%-12px)] bg-primary-950 rounded-md transition-all duration-250 ${activeTab === "encrypt" ? "left-1.5" : "left-[calc(50%+5px)]"} shadow-card`}
        aria-hidden="true"
      />

      <button
        onClick={() => setActiveTab("encrypt")}
        className="cursor-pointer flex-1 py-1.5 relative z-10"
        role="tab"
        aria-selected={activeTab === "encrypt"}
        aria-controls="encrypt-panel"
      >
        Encrypt
      </button>
      <button
        onClick={() => setActiveTab("decrypt")}
        role="tab"
        aria-selected={activeTab === "decrypt"}
        aria-controls="decrypt-panel"
        className="cursor-pointer flex-1 py-1.5 relative z-10"
      >
        Decrypt
      </button>
    </div>
  );
};

export default Tab;
