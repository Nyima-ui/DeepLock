"use client";

import { useEffect, useState } from "react";
import ChevronLeft from "./svgs/ChevronLeft";
import ChevronRight from "./svgs/ChevronRight";
import Timer from "./svgs/Timer";

interface LockDuration {
  startDate: Date;
  endDate: Date | null;
}

interface Time {
  hour: string;
  minutes: string;
  seconds: string;
}

const Calendar = () => {
  const [todaysDate, setTodaysDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const [lockDuration, setlockDuration] = useState<LockDuration>(() => {
    const normalized = new Date();
    normalized.setHours(0, 0, 0, 0);
    return {
      startDate: normalized,
      endDate: null,
    };
  });

  const [viewDate, setViewDate] = useState(new Date());
  const viewYear = viewDate.getFullYear();
  const viewMonth = viewDate.getMonth();

  const firstDayOfMonth = new Date(viewYear, viewMonth, 1);
  const startingDayIndex = (firstDayOfMonth.getDay() + 6) % 7; // start from Mon
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const prevMonthDays = new Date(viewYear, viewMonth, 0).getDate();

  const cells: { day: number; currentMonth: boolean; date: Date }[] = [];

  //previous month days
  for (let i = startingDayIndex - 1; i >= 0; i--) {
    cells.push({
      day: prevMonthDays - i,
      currentMonth: false,
      date: new Date(viewYear, viewMonth - 1, prevMonthDays - i),
    });
  }
  //current month days
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({
      day: d,
      currentMonth: true,
      date: new Date(viewYear, viewMonth, d),
    });
  }
  //next month days
  const remaining = 7 - (cells.length % 7);
  if (remaining < 7) {
    for (let d = 1; d <= remaining; d++) {
      cells.push({
        day: d,
        currentMonth: false,
        date: new Date(viewYear, viewMonth + 1, d),
      });
    }
  }

  //improve the name of the state claude
  const [time, setTime] = useState<Time>({
    hour: "",
    minutes: "",
    seconds: "",
  });

  function handleChangeInTime(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget;
    console.log(name, value);
  }

  useEffect(() => {
    console.log(lockDuration);
  }, [lockDuration]);

  return (
    <div className="w-auto max-w-[368px] bg-card shadow-card rounded-lg p-[15px] mt-[40px] mb-30">
      {/* header  */}
      <div className="flex items-center justify-between">
        <button
          className="cursor-pointer bg-card rounded-lg hover:bg-primary-500 transition-colors duration-100 ease-in"
          onClick={() => setViewDate(new Date(viewYear, viewMonth - 1, 1))}
        >
          <span>
            <ChevronLeft />
          </span>
        </button>
        <span>
          {viewDate.toLocaleString("en-US", { month: "long", year: "numeric" })}
        </span>
        <button
          className="cursor-pointer bg-card rounded-lg hover:bg-primary-500 transition-colors duration-100 ease-in"
          onClick={() => setViewDate(new Date(viewYear, viewMonth + 1, 1))}
        >
          <span>
            <ChevronRight />
          </span>
        </button>
      </div>

      {/* select todays date  */}
      <div className="flex justify-between mt-[16px] gap-[10px]">
        <input
          type="text"
          readOnly
          value={
            lockDuration.endDate
              ? `${lockDuration.startDate.toLocaleString("en-US", { month: "long", day: "numeric" })} - ${lockDuration.endDate.toLocaleString("en-US", { month: "long", day: "numeric" })}`
              : `${lockDuration.startDate.toLocaleDateString("en-US", { month: "long", day: "numeric" })}`
          }
          className="px-[12px] py-[6px] rounded-lg select-none focus:outline-none bg-card shadow-[2px_0px_6px_0px_rgba(55,39,114,0.9)] text-base flex-1"
        />
        <button
          className="bg-primary px-[9px] py-[6px] rounded-lg cursor-pointer hover:bg-primary/90 transition duration-200 ease-in text-base"
          onClick={() => {
            const now = new Date();
            setSelectedDate(new Date());
            setViewDate(now);
            setlockDuration((prev) => ({ ...prev, endDate: null }));
          }}
        >
          Today
        </button>
      </div>

      {/* dates  */}
      <div className="mt-[15px] text-base">
        <div className="grid grid-cols-[repeat(7,50px)]">
          {["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"].map((day) => (
            <span key={day} className="font-semibold select-none">
              {day}
            </span>
          ))}
        </div>

        <div
          className="grid 
        grid-cols-[repeat(7,48px)]
        auto-rows-[48px]
        gap-y-1
         mt-[15px]"
        >
          {cells.map((cell, i) => {
            const isToday =
              cell.day === todaysDate.getDate() &&
              viewMonth === todaysDate.getMonth() &&
              viewYear === todaysDate.getFullYear() &&
              cell.currentMonth;

            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const pastDate = cell.date < today;

            const isInRange =
              lockDuration.endDate &&
              cell.date > lockDuration.startDate &&
              cell.date < lockDuration.endDate;

            const isRangeEnd =
              lockDuration.endDate &&
              cell.date.toDateString() === lockDuration.endDate.toDateString();

            const isRangeStart =
              lockDuration.endDate &&
              cell.date.toDateString() ===
                lockDuration.startDate.toDateString();

            const dayOfWeek = cell.date.getDay();
            const isWeekStart = dayOfWeek === 1;
            const isWeekEnd = dayOfWeek === 0;

            const isLeftCap = isRangeStart || (isInRange && isWeekStart);
            const isRightCap = isRangeEnd || (isInRange && isWeekEnd);
            const isMidRange = isInRange && !isLeftCap && !isRightCap;

            return (
              <button
                key={i}
                disabled={pastDate}
                className={`size-full flex items-center justify-center  select-none
                ${cell.currentMonth ? "" : "text-foreground/60"} 
                ${isToday ? "bg-primary rounded-lg" : ""}
                ${isInRange ? "bg-primary-500" : ""}
                ${isRangeEnd ? "bg-primary-500" : ""}
                ${pastDate ? "cursor-not-allowed opacity-40" : "cursor-pointer"}
                ${!isToday && !isInRange && !isRangeEnd && !pastDate ? "hover:bg-primary-500" : ""}
                ${isLeftCap ? "rounded-l-lg" : ""}
                ${isRightCap ? "rounded-r-lg" : ""}
                ${!isToday && !isInRange && !isRangeEnd ? "rounded-lg" : ""}
                `}
                onClick={() => {
                  setSelectedDate(cell.date);
                  setlockDuration((prev) => ({ ...prev, endDate: cell.date }));
                }}
              >
                {cell.day}
              </button>
            );
          })}
        </div>
      </div>
      <p className="text-xs mt-5 text-foreground/70 tracking-wide">
        You can select today or any future date.
      </p>

      {/* time  */}
      <div>
        <p>End time</p>
        <div className="flex relative">
          <span aria-hidden="true" className="absolute top-1 left-0">
            <Timer />
          </span>
          <div className="pl-7 flex">
            <input
              type="text"
              className="w-[50px] border focus:outline-none"
              value={time.hour}
              name="hour"
              onChange={handleChangeInTime}
            />
            <span>:</span>
            <input
              type="text"
              className="w-[50px] border focus:outline-none"
              name="minutes"
              onChange={handleChangeInTime}
            />
            <span>:</span>
            <input
              type="text"
              className="w-[50px] border focus:outline-none"
              name="seconds"
              onChange={handleChangeInTime}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
