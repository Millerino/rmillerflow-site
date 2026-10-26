import type { SVGProps } from "react";

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

export function ArrowUpRight(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" {...base} {...props}>
      <path d="M6 14 14 6M7.5 6H14v6.5" />
    </svg>
  );
}

export function ArrowRight(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" {...base} {...props}>
      <path d="M4 10h11.5M11 5.5 15.5 10 11 14.5" />
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

/** Circled tick, the mark used in the brand's swap guides. */
export function MarkOk(props: IconProps) {
  return (
    <svg viewBox="0 0 26 26" width="26" height="26" {...base} {...props}>
      <circle cx="13" cy="13" r="11.5" />
      <path d="M8.2 13.4l3.2 3.2 6.4-6.8" />
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
