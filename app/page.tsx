import CopyButton from "@/components/CopyButton";
import Loop from "@/components/svgs/Loop";

const PassswordGenerator = () => {
  return (
    <div className="bg-card rounded-lg p-[15px] shadow-card">

      {/* generator  */}
      <form className="flex gap-[24px]">
        <div className="relative flex-1">
          <input
            type="text"
            className="w-full bg-primary-900 h-full rounded-lg shadow-[2px_2px_4px_0px_rgba(55,39,114,0.5)] focus:outline-none focus:border-primary focus:ring-[3px] focus:ring-primary-500/50 px-[20px] text-[20px]"
          />
          <button
            type="button"
            className="absolute top-1/2 -translate-y-1/2 right-[20px] cursor-pointer"
          >
            <span>
              <Loop />
            </span>
          </button>
        </div>
        <CopyButton text={"Copy"} fontSize={"text-[20px]"} />
      </form>
     
      {}

    </div>
  );
};

const Page = () => {
  return (
    <div className="bg-background text-foreground min-h-screen px-[144px] max-md:px-[20px] py-[60px]">
      <div className="max-w-[600px]">
        <h1 className="text-[39px] max-md:text-[31px]">Generate a password</h1>
        <PassswordGenerator />
      </div>
    </div>
  );
};

export default Page;
