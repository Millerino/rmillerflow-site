import type { ReactNode, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

export function ArrowRight(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" {...base} {...props}>
      <path d="M4 10h11M11 5.5 15.5 10 11 14.5" />
    </svg>
  );
}

export function ArrowDown(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" {...base} {...props}>
      <path d="M10 4v11M5.5 11 10 15.5 14.5 11" />
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

export function Check(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" {...base} strokeWidth={2.2} {...props}>
      <path d="m4.5 10.5 3.5 3.5 7.5-8" />
    </svg>
  );
}

/** Circled cross and tick: the swap marks used across the brand's guides. */
export function MarkX(props: IconProps) {
  return (
    <svg viewBox="0 0 26 26" width="26" height="26" {...base} {...props}>
      <circle cx="13" cy="13" r="11.5" />
      <path d="M9 9l8 8M17 9l-8 8" />
    </svg>
  );
}

export function MarkOk(props: IconProps) {
  return (
    <svg viewBox="0 0 26 26" width="26" height="26" {...base} {...props}>
      <circle cx="13" cy="13" r="11.5" />
      <path d="M8.2 13.4l3.2 3.2 6.4-6.8" />
    </svg>
  );
}

export function SwapArrow(props: IconProps) {
  return (
    <svg viewBox="0 0 44 12" width="44" height="12" {...base} strokeWidth={1.6} {...props}>
      <path d="M1 6h40M36 1.5 41.5 6 36 10.5" />
    </svg>
  );
}

export function Menu(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" {...base} {...props}>
      <path d="M3.5 7h13M3.5 13h13" />
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

export function TopicIcon({ name, ...props }: IconProps & { name: "plate" | "swap" | "dumbbell" | "repeat" }) {
  const paths: Record<typeof name, ReactNode> = {
    plate: (
      <>
        <circle cx="16" cy="16" r="9" />
        <circle cx="16" cy="16" r="5" />
        <path d="M3.5 6v6.5M5.5 6v6.5M3.5 12.5h2M4.5 12.5V26M28.5 6c-1.8 1.4-2.5 4-2.5 7.5h2.5V26" />
      </>
    ),
    swap: <path d="M5 11h20l-4.5-4.5M27 21H7l4.5 4.5" />,
    dumbbell: <path d="M4 13v6M8 9.5v13M24 9.5v13M28 13v6M8 16h16" />,
    repeat: <path d="M7 14a9 9 0 0 1 15.6-5.5M23 4.5v4.5h-4.5M25 18a9 9 0 0 1-15.6 5.5M9 27.5V23h4.5" />,
  };
  return (
    <svg viewBox="0 0 32 32" width="32" height="32" {...base} {...props}>
      {paths[name]}
    </svg>
  );
}
