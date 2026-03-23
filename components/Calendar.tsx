"use client";

import { useState } from "react";
import ChevronLeft from "./svgs/ChevronLeft";
import ChevronRight from "./svgs/ChevronRight";
import Timer from "./svgs/Timer";
import type { CustomLockDurationProps } from "@/types/types";

interface CalendarProps {
  customDuration: CustomLockDurationProps;
  setCustomDuration: React.Dispatch<
    React.SetStateAction<CustomLockDurationProps>
  >;
}

const Calendar = ({ customDuration, setCustomDuration }: CalendarProps) => {
  const todaysDate = new Date();
  todaysDate.setHours(0, 0, 0, 0);

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

  const weeks: (typeof cells)[] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <section
      className="w-auto max-w-92 bg-card shadow-card rounded-lg p-3.75 mt-10"
      aria-label="Date and time picker"
    >
      {/* header  */}
      <header className="flex items-center justify-between">
        <button
          aria-label="Go to previous month"
          className="cursor-pointer bg-card rounded-lg hover:bg-primary-500 transition-colors duration-100 ease-in"
          onClick={() => setViewDate(new Date(viewYear, viewMonth - 1, 1))}
        >
          <span aria-hidden="true">
            <ChevronLeft />
          </span>
        </button>
        <span aria-live="polite" aria-atomic="true">
          {viewDate.toLocaleString("en-US", { month: "long", year: "numeric" })}
        </span>
        <button
          aria-label="Go to next month"
          className="cursor-pointer bg-card rounded-lg hover:bg-primary-500 transition-colors duration-100 ease-in"
          onClick={() => setViewDate(new Date(viewYear, viewMonth + 1, 1))}
        >
          <span aria-hidden="true">
            <ChevronRight />
          </span>
        </button>
      </header>

      {/* select todays date  */}
      <div className="flex justify-between mt-5 gap-2.5">
        <span
          className="px-3 py-1.5 rounded-lg select-none focus:outline-none bg-card shadow-[2px_0px_6px_0px_rgba(55,39,114,0.9)] text-base flex-1"
          aria-label="Selected date range"
        >
          {customDuration.endDate
            ? `${customDuration.startDate.toLocaleString("en-US", { month: "long", day: "numeric" })} - ${customDuration.endDate.toLocaleString("en-US", { month: "long", day: "numeric" })}`
            : `${customDuration.startDate.toLocaleDateString("en-US", { month: "long", day: "numeric" })}`}
        </span>
        <button
          aria-label="Reset to today"
          className="bg-primary px-2.25 py-1.5 rounded-lg cursor-pointer hover:bg-primary/90 transition duration-200 ease-in text-base"
          onClick={() => {
            const now = new Date();
            now.setHours(0, 0, 0, 0);
            setViewDate(new Date());
            setCustomDuration({
              startDate: now,
              endDate: null,
              endTime: "00:00:00",
            });
          }}
        >
          Today
        </button>
      </div>

      {/* calendar grid  */}
      <div className="mt-5 text-base">
        <div
          className="grid grid-cols-[repeat(7,48px)]"
          role="grid"
          aria-label="Calendar"
        >
          {["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"].map((day) => (
            <div
              key={day}
              className="font-semibold select-none text-center"
              aria-label={day}
              role="columnheader"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="mt-3.75 flex flex-col gap-y-1">
          {weeks.map((week, wi) => (
            <div
              key={wi}
              role="row"
              className="grid grid-cols-[repeat(7,48px)] auto-rows-[48px]"
            >
              {week.map((cell, ci) => {
                const isToday =
                  cell.currentMonth &&
                  cell.date.toDateString() === todaysDate.toDateString();

                const pastDate = cell.date < today;

                const isInRange =
                  customDuration.endDate &&
                  cell.date > customDuration.startDate &&
                  cell.date < customDuration.endDate;

                const isRangeEnd =
                  customDuration.endDate &&
                  cell.date.toDateString() ===
                    customDuration.endDate.toDateString();

                const isRangeStart =
                  customDuration.endDate &&
                  cell.date.toDateString() ===
                    customDuration.startDate.toDateString();

                if (isRangeStart) {
                  console.log(cell.date.toDateString());
                }

                const daysOfWeek = cell.date.getDay();
                const isWeekStart = daysOfWeek === 1;
                const isWeekEnd = daysOfWeek === 0;

                const isLeftCap = isRangeStart || (isInRange && isWeekStart);
                const isRightCap = isRangeEnd || (isInRange && isWeekEnd);

                const ariaLabel = `${cell.date.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}${isToday ? ", today" : ""}${pastDate ? ", unavailable" : ""}${isRangeStart ? ", range start" : ""}${isRangeEnd ? ", range end" : ""}`;

                return (
                  <div key={ci} role="gridcell">
                    <button
                      disabled={pastDate}
                      aria-label={ariaLabel}
                      aria-pressed={
                        isRangeStart || isRangeEnd ? true : undefined
                      }
                      aria-disabled={pastDate}
                      className={`size-full flex items-center justify-center select-none
                      ${cell.currentMonth ? "" : "text-foreground/60"} 
                      ${isToday ? `bg-primary ${!customDuration.endDate ? "rounded-lg" : "rounded-l-lg"}` : ""}
                      ${isInRange ? "bg-primary-500" : ""}
                      ${isRangeEnd ? "bg-primary-500" : ""}
                      ${pastDate ? "cursor-not-allowed opacity-40" : "cursor-pointer"}
                      ${!isToday && !isInRange && !isRangeEnd && !pastDate ? "hover:bg-primary-500" : ""}
                      ${isLeftCap ? "rounded-l-lg" : ""}
                      ${isRightCap ? "rounded-r-lg" : ""}
                      ${!isToday && !isInRange && !isRangeEnd && !isRangeStart ? "rounded-lg" : ""}
                      `}
                      onClick={() => {
                        setCustomDuration((prev) => ({
                          ...prev,
                          endDate: cell.date,
                        }));
                      }}
                    >
                      {cell.day}
                    </button>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <p className="text-xs mt-3 text-foreground/70 tracking-wide">
        You can select today or any future date.
      </p>

      <hr className="border border-primary-700 mt-2" />

      {/* time  */}
      <fieldset className="mt-3.75 border-0 p-0 m-0">
        <legend className="text-base">End time</legend>

        <div className="mt-2.5 flex items-center gap-2.5 bg-primary-900 p-2.5 rounded-lg focus-within:bg-primary-500 transition-colors duration-150 shadow-card focus-within:shadow-btn">
          <span aria-hidden="true">
            <Timer />
          </span>
          <input
            type="time"
            step={1}
            value={customDuration.endTime}
            onChange={(e) =>
              setCustomDuration((prev) => ({
                ...prev,
                endTime: e.target.value,
              }))
            }
            lang="en-US"
            className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none
            flex-1 focus:outline-none"
            aria-label="End time"
          />
        </div>
      </fieldset>
    </section>
  );
};

export default Calendar;
