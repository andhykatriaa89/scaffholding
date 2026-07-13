import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const fmtRp = (n) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n);
export const stokTersedia = (b) => Math.max(0, b.stokTotal - b.stokDisewa - b.stokRusak);
export const hitungHari = (mulai, selesai) => {
  const diff = new Date(selesai).getTime() - new Date(mulai).getTime();
  return Math.max(1, Math.ceil(diff / (1000 * 3600 * 24)));
};
