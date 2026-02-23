"use client";

import { useRouter } from "next/navigation";

// Backdrop transparent qui ferme la page login au clic extérieur
export function LoginBackdrop() {
  const router = useRouter();
  return (
    <div
      className="absolute inset-0 z-0 cursor-pointer"
      onClick={() => router.back()}
      aria-hidden="true"
    />
  );
}
