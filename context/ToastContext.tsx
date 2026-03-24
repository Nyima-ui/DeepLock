"use client";
import Close from "@/components/svgs/Close";
import Success from "@/components/svgs/Success";
import { createContext, useContext, useState } from "react";
import { cn } from "@/lib/Utils";

interface ToastConfig {
  title: string;
  message: string;
  type?: "success" | "warning" | "failure";
}

interface ToastContextProps {
  showToast: (config: ToastConfig) => void;
  hideToast: () => void;
}

const ToastContext = createContext<ToastContextProps | null>(null);

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);

  function showToast(toastConfig: ToastConfig) {
    setIsVisible(true);
  }
  function hideToast() {
    setIsVisible(false);
  }

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      {<ToastNotification isVisible={isVisible} setIsVisible={setIsVisible} />}
    </ToastContext.Provider>
  );
};

export default ToastProvider;

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}

interface ToastNotificationProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

function ToastNotification({
  isVisible,
  setIsVisible,
}: ToastNotificationProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={cn(
        "fixed top-[113px] right-[60px] max-sm:right-[20px] bg-primary-500 rounded-lg w-[386px] max-sm:w-[calc(400px-14px)] p-3.5 shadow-card transition-transform duration-300 linear",
        isVisible ? "translate-x-0" : "translate-x-[calc(100%+60px)]",
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[15px]">
          <span aria-hidden="true">
            <Success />
          </span>
          <span className="text-[18px] font-semibold">Password Locked</span>
        </div>
        <button
          aria-label="Dismiss notification"
          className="cursor-pointer hover:bg-primary-600 rounded-lg p-1"
          onClick={() => setIsVisible(false)}
        >
          <Close />
        </button>
      </div>
      <div className="ml-10 mt-1.5">
        <p>Your access key is ready. Locked until: March 28, 2026 at 9:00 AM</p>
      </div>
    </div>
  );
}
