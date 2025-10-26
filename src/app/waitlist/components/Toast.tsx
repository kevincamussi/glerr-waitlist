"use client";
import { useEffect, useState } from "react";

export default function Toast() {
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    const h = (e: Event) =>
      setMsg((e as CustomEvent<string>).detail || "Done!");
    document.addEventListener("toast:show", h as EventListener);
    return () => document.removeEventListener("toast:show", h as EventListener);
  }, []);

  useEffect(() => {
    if (!msg) return;
    const t = setTimeout(() => setMsg(null), 2500);
    return () => clearTimeout(t);
  }, [msg]);

  if (!msg) return null;

  return (
    <div className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded shadow">
      {msg}
    </div>
  );
}
