import { useEffect, useState } from "react";

export type Remaining = {
  hours: number;
  minutes: number;
  seconds: number;
  ratio: number;
  ended: boolean;
  dateLabel: string;
};

const EMPTY: Remaining = {
  hours: 0,
  minutes: 0,
  seconds: 0,
  ratio: 0,
  ended: false,
  dateLabel: "",
};

function compute(): Remaining {
  const now = new Date();
  const end = new Date(now);
  end.setHours(24, 0, 0, 0);
  const ms = end.getTime() - now.getTime();
  const ended = ms <= 0;
  const safe = Math.max(0, ms);
  const total = Math.floor(safe / 1000);
  const day = 24 * 60 * 60 * 1000;
  return {
    hours: Math.floor(total / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
    ratio: ended ? 1 : 1 - safe / day,
    ended,
    dateLabel: new Intl.DateTimeFormat("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(now),
  };
}

export function useRemaining(): Remaining {
  const [value, setValue] = useState<Remaining>(EMPTY);

  useEffect(() => {
    const tick = () => setValue(compute());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return value;
}

export function two(n: number) {
  return String(n).padStart(2, "0");
}
