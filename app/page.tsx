"use client";
import dynamic from "next/dynamic";
import Tab from "@/components/Tab";

const PassswordGenerator = dynamic(
  () => import("@/components/PasswordGenerator"),
  { ssr: false },
);

const Page = () => {
  return (
    <main className="bg-background text-foreground min-h-screen px-36 max-lg:px-10 max-md:px-5 py-15">
      <div className="max-w-150">
        <h1 className="text-[39px] max-md:text-[31px]">Generate a password</h1>
        <PassswordGenerator />
        <Tab />
      </div>
    </main>
  );
};

export default Page;
