import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

export function ArrowRight(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" {...base} {...props}>
      <path d="M4 10h11.5M11 5.5 15.5 10 11 14.5" />
    </svg>
  );
}

export function ArrowLeft(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" {...base} {...props}>
      <path d="M16 10H4.5M9 5.5 4.5 10 9 14.5" />
    </svg>
  );
}

export function ArrowUpRight(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" {...base} {...props}>
      <path d="M6 14 14 6M7.5 6H14v6.5" />
    </svg>
  );
}

export function Chevron(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" {...base} {...props}>
      <path d="m5.5 8 4.5 4.5L14.5 8" />
    </svg>
  );
}

export function Close(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" {...base} {...props}>
      <path d="m5 5 10 10M15 5 5 15" />
    </svg>
  );
}

export function Check(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" width="16" height="16" {...base} strokeWidth={2} {...props}>
      <path d="m5 10.5 3.2 3.2L15 6.8" />
    </svg>
  );
}

/** Compass-like mark for the guided path. */
export function Compass(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" {...base} {...props}>
      <circle cx="10" cy="10" r="7.5" />
      <path d="m12.8 7.2-1.6 4-4 1.6 1.6-4z" />
    </svg>
  );
}

/* Icons for the first question. Simple line drawings, 24px. */
const choice = { ...base, strokeWidth: 1.5 };

export function IconFood(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" {...choice} {...props}>
      <path d="M7 3v8M4.5 3v5a2.5 2.5 0 0 0 5 0V3M7 11v10" />
      <path d="M17 21V3c-2.2 1.2-3.5 3.6-3.5 7v3H17" />
    </svg>
  );
}

export function IconTraining(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" {...choice} {...props}>
      <path d="M8 12h8M3.5 9.5v5M20.5 9.5v5" />
      <rect x="5.5" y="7" width="2.5" height="10" rx="1" />
      <rect x="16" y="7" width="2.5" height="10" rx="1" />
    </svg>
  );
}

export function IconHabits(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" {...choice} {...props}>
      <path d="M19.5 12a7.5 7.5 0 0 1-13 5.1M4.5 12a7.5 7.5 0 0 1 13-5.1" />
      <path d="M17.8 3.6v3.6h-3.6M6.2 20.4v-3.6h3.6" />
    </svg>
  );
}

export function IconEverything(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" {...choice} {...props}>
      <circle cx="7.5" cy="7.5" r="3" />
      <circle cx="16.5" cy="7.5" r="3" />
      <circle cx="7.5" cy="16.5" r="3" />
      <circle cx="16.5" cy="16.5" r="3" />
    </svg>
  );
}

export const choiceIcons = {
  food: IconFood,
  training: IconTraining,
  habits: IconHabits,
  everything: IconEverything,
} as const;
