import { ButtonHTMLAttributes } from "react";

interface LongButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

const LongButton = ({ text, ...props }: LongButtonProps) => {
  return (
    <button
      className="px-25 py-3 bg-primary rounded-lg text-[20px] cursor-pointer mt-11.25 max-sm:text-lg bg-linear-to-b from-primary-200 to-primary hover:opacity-95 transition-opacity duration-150"
      {...props}
    >
      {text}
    </button>
  );
};

export default LongButton;
