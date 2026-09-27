import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { letters, remnants } from "./data";
import { LastLetter } from "./last-letter";
import { Reveal } from "./reveal";
import { Starfield } from "./starfield";
import { useAmbientAudio } from "./use-ambient";
import { two, useRemaining } from "./use-remaining";

export function LastDayPage() {
  const remaining = useRemaining();
  const audio = useAmbientAudio();
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    document.body.style.overflow = entered ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [entered]);

  const enter = () => {
    setEntered(true);
    void audio.start();
  };

  return (
    <div className="relative bg-bg text-fg">
      <div className="grain" aria-hidden="true" />

      {!entered ? <EnterGate onEnter={enter} /> : null}

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-30 flex items-center justify-between px-5 py-4 transition-opacity duration-500 sm:px-8",
          entered ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden={!entered}
        inert={!entered ? true : undefined}
      >
        <p className="font-display text-sm tracking-wide text-fg/80">Hari Terakhir</p>
        <div className="flex items-center gap-3">
          <p className="font-sans text-xs tabular-nums tracking-widest text-muted">
            {two(remaining.hours)}:{two(remaining.minutes)}:{two(remaining.seconds)}
          </p>
          <button
            type="button"
            onClick={audio.toggle}
            aria-label={audio.on ? "Matikan suara" : "Nyalakan suara"}
            className="grid size-11 place-items-center rounded-full text-muted transition-colors duration-270 hover:text-fg"
          >
            {audio.on ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
          </button>
        </div>
      </header>

      <div
        className="pointer-events-none fixed inset-x-0 top-0 z-20 h-px bg-border"
        aria-hidden="true"
      >
        <span
          className="block h-px bg-fg/40 transition-[width] duration-1000 ease-linear"
          style={{ width: `${Math.min(100, Math.round(remaining.ratio * 1000) / 10)}%` }}
        />
      </div>

      <main>
        <Hero />
        <TimeSection remaining={remaining} />
        <StillHere />
        <Kitchen />
        <Street />
        <Letters />
        <Hill />
        <Write />
        <Earth />
        <Ending />
      </main>
    </div>
  );
}

function EnterGate({ onEnter }: { onEnter: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-bg/70 px-6 pb-16 pt-24 backdrop-blur-[2px] sm:items-center sm:pb-0">
      <div className="w-full max-w-lg text-center">
        <p className="text-xs tracking-[0.28em] text-muted uppercase">Hari ini</p>
        <h1 className="mt-6 font-display text-3xl leading-tight text-fg">
          Jika hari ini adalah hari terakhir Bumi.
        </h1>
        <p className="mx-auto mt-6 max-w-sm text-base leading-relaxed text-muted">
          Setelah ini, tidak akan ada lagi. Masuk pelan. Jangan buru-buru.
        </p>
        <div className="mt-10">
          <Button type="button" onClick={onEnter}>
            Masuk
          </Button>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative h-dvh min-h-[36rem] overflow-hidden">
      <video
        className="ken absolute inset-0 size-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="/last-day/sunset.jpg"
        aria-hidden="true"
      >
        <source src="/last-day/sunset.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/35 to-bg/40" />
      <div className="relative flex h-full flex-col justify-end px-6 pb-16 sm:px-12 sm:pb-20">
        <p className="text-xs tracking-[0.32em] text-fg/70 uppercase">Hari ini</p>
        <h2 className="mt-4 max-w-4xl font-display text-hero leading-[0.9] text-fg">
          Bumi.
        </h2>
        <p className="mt-5 max-w-md font-display text-xl italic leading-snug text-fg/80 sm:text-2xl">
          Setelah malam ini, tidak akan ada esok.
        </p>
        <p className="mt-10 text-xs tracking-[0.22em] text-muted uppercase">Gulir pelan</p>
      </div>
    </section>
  );
}

function TimeSection({
  remaining,
}: {
  remaining: ReturnType<typeof useRemaining>;
}) {
  return (
    <section className="px-6 py-28 sm:px-12 sm:py-36">
      <Reveal>
        <p className="text-xs tracking-[0.28em] text-muted uppercase">Sisa waktu</p>
      </Reveal>
      <Reveal delay={80}>
        <div className="mt-10 flex items-end gap-4 font-display tabular-nums leading-none text-fg sm:gap-8">
          <TimeBlock value={two(remaining.hours)} label="jam" />
          <span className="mb-3 text-3xl text-subtle sm:mb-4 sm:text-5xl">:</span>
          <TimeBlock value={two(remaining.minutes)} label="menit" />
          <span className="mb-3 text-3xl text-subtle sm:mb-4 sm:text-5xl">:</span>
          <TimeBlock value={two(remaining.seconds)} label="detik" />
        </div>
      </Reveal>
      <Reveal delay={160}>
        <p className="mt-12 max-w-md text-base leading-relaxed text-muted">
          {remaining.ended
            ? "Sudah malam. Yang tersisa hanya yang sempat kita lihat."
            : "Bukan ledakan. Bukan film. Hanya hari yang kehabisan, pelan-pelan, seperti napas."}
        </p>
      </Reveal>
    </section>
  );
}

function TimeBlock({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-3xl sm:text-hero">{value}</p>
      <p className="mt-3 font-sans text-xs tracking-[0.2em] text-subtle uppercase">
        {label}
      </p>
    </div>
  );
}

function StillHere() {
  return (
    <section className="px-6 py-16 sm:px-12 sm:py-24">
      <Reveal>
        <p className="text-xs tracking-[0.28em] text-muted uppercase">Sekarang</p>
        <h2 className="mt-4 max-w-2xl font-display text-3xl leading-tight text-fg">
          Yang masih ada
        </h2>
      </Reveal>
      <ul className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {remnants.map((item, i) => (
          <Reveal key={item.kicker} delay={i * 50}>
            <li>
              <p className="text-xs tracking-[0.2em] text-subtle uppercase">{item.kicker}</p>
              <p className="mt-3 font-display text-xl leading-snug text-fg">{item.line}</p>
            </li>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

function Kitchen() {
  return (
    <section className="grid items-center gap-10 px-6 py-16 sm:px-12 lg:grid-cols-2 lg:gap-16 lg:py-28">
      <Reveal>
        <img
          src="/last-day/kitchen.jpg"
          alt="Meja dapur kosong, nasi dan teh di sisa cahaya sore"
          className="w-full rounded-xl object-cover outline outline-1 -outline-offset-1 outline-fg/10"
        />
      </Reveal>
      <Reveal delay={100}>
        <p className="font-display text-3xl leading-tight text-fg sm:text-2xl lg:text-3xl">
          Nasi masih hangat.
          <br />
          Teh sudah dingin.
          <br />
          Dapur tidak tahu bahwa ini terakhir.
        </p>
        <p className="mt-8 max-w-md text-base leading-relaxed text-muted">
          Ada yang indah dari benda-benda yang tetap melakukan tugasnya. Panci.
          Jendela. Debu di cahaya. Mereka tidak berpidato. Mereka hanya ada.
        </p>
      </Reveal>
    </section>
  );
}

function Street() {
  return (
    <section className="relative mt-8 min-h-[70vh] overflow-hidden">
      <img
        src="/last-day/street.jpg"
        alt="Jalan kota yang sepi di senja terakhir"
        className="ken absolute inset-0 size-full object-cover outline outline-1 -outline-offset-1 outline-fg/10"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/50 to-bg/20" />
      <div className="relative flex min-h-[70vh] items-end px-6 py-16 sm:px-12 sm:py-24">
        <Reveal>
          <p className="max-w-lg font-display text-3xl leading-tight text-fg">
            Lampu toko masih menyala.
            <br />
            Tidak ada yang pulang.
            <br />
            Tidak ada yang pergi.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Letters() {
  return (
    <section className="px-6 py-28 sm:px-12 sm:py-36">
      <Reveal>
        <p className="text-xs tracking-[0.28em] text-muted uppercase">Yang tertinggal</p>
        <h2 className="mt-4 max-w-2xl font-display text-3xl leading-tight text-fg">
          Surat yang tidak akan dibaca esok
        </h2>
      </Reveal>
      <div className="mt-16 grid gap-16 lg:grid-cols-2">
        {letters.map((letter, i) => (
          <Reveal key={letter.from} delay={(i % 2) * 80}>
            <article className="border-t border-border pt-8">
              <p className="text-sm text-muted">
                {letter.from}
                <span className="text-subtle"> · {letter.place}</span>
              </p>
              <p className="mt-5 font-display text-xl leading-relaxed text-fg sm:text-2xl">
                {letter.body}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Hill() {
  return (
    <section className="relative min-h-[80vh] overflow-hidden">
      <img
        src="/last-day/hill.jpg"
        alt="Seseorang berdiri di bukit, memandang matahari terbenam terakhir"
        className="ken absolute inset-0 size-full object-cover object-center outline outline-1 -outline-offset-1 outline-fg/10"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg/30" />
      <div className="relative flex min-h-[80vh] items-end px-6 py-16 sm:px-12 sm:py-24">
        <Reveal>
          <p className="max-w-xl font-display text-3xl leading-tight text-fg">
            Kita berdiri di sini karena tidak ada tempat lain.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Write() {
  return (
    <section className="px-6 py-28 sm:px-12 sm:py-36">
      <Reveal>
        <p className="text-xs tracking-[0.28em] text-muted uppercase">Untukmu</p>
        <h2 className="mt-4 font-display text-3xl leading-tight text-fg">
          Satu kalimat terakhir
        </h2>
        <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
          Kalau Bumi mendengar, apa yang akan kau katakan?
        </p>
      </Reveal>
      <div className="mt-12">
        <LastLetter />
      </div>
    </section>
  );
}

function Earth() {
  return (
    <section className="relative min-h-[85vh] overflow-hidden">
      <img
        src="/last-day/earth.jpg"
        alt="Bumi dilihat dari orbit, garis terakhir cahaya matahari"
        className="ken absolute inset-0 size-full object-cover outline outline-1 -outline-offset-1 outline-fg/10"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/25 to-transparent" />
      <div className="relative flex min-h-[85vh] items-end px-6 py-16 sm:px-12 sm:py-24">
        <Reveal>
          <p className="max-w-lg font-display text-3xl leading-tight text-fg">
            Dari sini Bumi kelihatan tenang.
            <br />
            Seperti tidak terjadi apa-apa.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Ending() {
  return (
    <section className="relative min-h-dvh overflow-hidden bg-bg">
      <img
        src="/last-day/rain.jpg"
        alt=""
        className="absolute inset-0 size-full object-cover opacity-[0.12]"
      />
      <Starfield className="absolute inset-0 z-10 cursor-crosshair" />
      <div className="pointer-events-none relative z-20 flex min-h-dvh flex-col justify-end px-6 py-20 sm:px-12">
        <Reveal>
          <p className="max-w-xl font-display text-2xl leading-snug text-fg sm:text-3xl">
            Matahari turun. Lalu gelap.
          </p>
          <p className="mt-8 max-w-lg text-base leading-relaxed text-muted">
            Cahaya yang pernah dipantulkan Bumi masih berjalan ke bintang-bintang.
            Ribuan tahun lagi, seseorang di suatu tempat akan melihat kita masih
            menyala.
          </p>
          <p className="mt-8 text-sm text-subtle">Klik langit. Ada yang tersisa.</p>
          <p className="mt-16 font-display text-2xl italic text-fg">Sampai jumpa.</p>
          <p className="mt-8 text-sm text-subtle">ichi.studio</p>
        </Reveal>
      </div>
    </section>
  );
}
