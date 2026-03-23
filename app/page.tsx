"use client";
import dynamic from "next/dynamic";
import Tab from "@/components/Tab";
import UnlockOn from "@/components/UnlockOn";
import LongButton from "@/components/LongButton";

const PassswordGenerator = dynamic(
  () => import("@/components/PasswordGenerator"),
  { ssr: false },
);

const Page = () => {
  return (
    <main className="bg-background text-foreground min-h-screen px-36 max-lg:px-10 max-md:px-5 py-7 flex justify-between max-xl:flex-col gap-5 pb-20">
      <div className="max-w-150">
        <h1 className="text-[39px] max-md:text-[31px]">Generate a password</h1>
        <PassswordGenerator />
        <Tab />
        <LongButton text="Encrypt password"/>
      </div>
      <div className="flex-1 max-w-[400px] mt-0 max-xl:mt-9"> 
        <h2 className="text-[31px] max-lg:text-[28px] max-sm:text-[25px]">Unlock until</h2>
         <UnlockOn />
      </div>
    </main>
  );
};

export default Page;
