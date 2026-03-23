import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/Utils";

interface LongButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

const LongButton = ({ text, className, ...props }: LongButtonProps) => {
  return (
    <button
      className={cn(
        "px-25 py-3 bg-primary rounded-lg text-[20px] cursor-pointer mt-11.25 max-sm:text-lg bg-linear-to-b from-primary-200 to-primary hover:opacity-95 transition-opacity duration-150",
        className,
      )}
      {...props}
    >
      {text}
    </button>
  );
};

export default LongButton;
