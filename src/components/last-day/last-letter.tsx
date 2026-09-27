import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { LETTER_KEY } from "./data";
import { Reveal } from "./reveal";

export function LastLetter() {
  const [draft, setDraft] = useState("");
  const [saved, setSaved] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const existing = window.localStorage.getItem(LETTER_KEY);
    if (existing) setSaved(existing);
    setReady(true);
  }, []);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const next = draft.trim();
    if (!next) return;
    window.localStorage.setItem(LETTER_KEY, next);
    setSaved(next);
    setDraft("");
  };

  const clear = () => {
    window.localStorage.removeItem(LETTER_KEY);
    setSaved(null);
  };

  if (!ready) {
    return <div className="h-40" aria-hidden="true" />;
  }

  if (saved) {
    return (
      <Reveal>
        <figure className="mx-auto max-w-xl">
          <blockquote className="font-display text-2xl leading-snug italic text-fg sm:text-3xl">
            “{saved}”
          </blockquote>
          <figcaption className="mt-6 text-sm text-muted">
            Tersimpan di sini, di hari yang tidak punya esok.
          </figcaption>
          <button
            type="button"
            onClick={clear}
            className="mt-8 min-h-11 text-sm text-subtle underline-offset-4 hover:text-muted hover:underline"
          >
            Tulis ulang
          </button>
        </figure>
      </Reveal>
    );
  }

  return (
    <Reveal>
      <form onSubmit={onSubmit} className="mx-auto w-full max-w-xl">
        <label htmlFor="last-letter" className="sr-only">
          Satu kalimat terakhir untuk Bumi
        </label>
        <textarea
          id="last-letter"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={4}
          maxLength={280}
          placeholder="Bumi, …"
          className="w-full resize-none rounded-xl border border-border bg-surface px-5 py-4 text-base leading-relaxed text-fg placeholder:text-subtle outline-none transition-shadow duration-150 focus-visible:ring-1 focus-visible:ring-fg/30"
        />
        <div className="mt-4 flex items-center justify-between gap-4">
          <p className="text-xs tabular-nums text-subtle">{draft.length}/280</p>
          <Button type="submit" disabled={!draft.trim()}>
            Tinggalkan
          </Button>
        </div>
      </form>
    </Reveal>
  );
}
