import { useState, useRef, useEffect } from "react";

// Ubah sesuai lokasi & nama file audio di folder public/
const AUDIO_SRC = "/audio/bgm.mp3"; 

export function useAmbientAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    // Inisialisasi audio
    audioRef.current = new Audio(AUDIO_SRC);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3; // Atur volume (0.0 sampai 1.0)

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Fungsi untuk menyalakan audio
  const start = async () => {
    if (!audioRef.current) return;
    try {
      await audioRef.current.play();
      setOn(true);
    } catch (err) {
      console.error("Gagal memutar audio otomatis:", err);
    }
  };

  // Fungsi untuk mematikan audio
  const stop = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setOn(false);
  };

  // Fungsi toggle untuk tombol speaker di header
  const toggle = () => {
    if (on) {
      stop();
    } else {
      void start();
    }
  };

  return { on, start, stop, toggle };
}