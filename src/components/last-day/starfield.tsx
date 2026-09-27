import { useMemo, useRef, useState, type PointerEvent } from "react";
import { sparks } from "./data";

type Floater = { id: number; x: number; y: number; text: string };

const STAR_COUNT = 90;

function makeStars() {
  return Array.from({ length: STAR_COUNT }, (_, i) => ({
    id: i,
    left: `${(i * 17 + 11) % 100}%`,
    top: `${(i * 29 + 7) % 100}%`,
    size: i % 9 === 0 ? 3 : i % 4 === 0 ? 2 : 1.2,
    delay: `${(i % 12) * 0.35}s`,
    opacity: i % 5 === 0 ? 1 : 0.55 + (i % 5) * 0.08,
  }));
}

export function Starfield({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [floaters, setFloaters] = useState<Floater[]>([]);
  const sparkIndex = useRef(0);
  const stars = useMemo(makeStars, []);

  const onPointer = (event: PointerEvent<HTMLDivElement>) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const text = sparks[sparkIndex.current % sparks.length] ?? "";
    sparkIndex.current += 1;
    const id = Date.now() + Math.random();
    setFloaters((prev) => [...prev.slice(-8), { id, x, y, text }]);
    window.setTimeout(() => {
      setFloaters((prev) => prev.filter((f) => f.id !== id));
    }, 3200);
  };

  return (
    <div
      ref={wrapRef}
      className={className}
      onPointerDown={onPointer}
      role="presentation"
    >
      {stars.map((star) => (
        <span
          key={star.id}
          className="star-dot pointer-events-none absolute rounded-full bg-fg"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
            animationDelay: star.delay,
          }}
        />
      ))}
      {floaters.map((f) => (
        <span
          key={f.id}
          className="float-spark pointer-events-none absolute -translate-x-1/2 font-display text-lg italic text-fg sm:text-xl"
          style={{ left: f.x, top: f.y }}
        >
          {f.text}
        </span>
      ))}
    </div>
  );
}
