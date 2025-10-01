import React, { useLayoutEffect, useRef, useState } from "react";

type InvertedCornerProps = {
  label: string; // word in the corner
  gap?: number; // spacing between label and content (px)
  className?: string; // extra classes for the box
  children?: React.ReactNode; // content inside the box
  /**
   * Page/background color behind the box, used to "cut out" the corner.
   * Typically matches body background (e.g., #0b0f1a or white).
   */
  pageBg?: string;
};

export default function InvertedCorner({
  label,
  children,
  gap = 12,
  className = "",
  pageBg = "white",
}: InvertedCornerProps) {
  const labelRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useLayoutEffect(() => {
    if (!labelRef.current) return;
    const el = labelRef.current;

    const update = () => setSize({ w: el.offsetWidth, h: el.offsetHeight });
    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const paddingTop = size.h + gap;

  return (
    <div
      className={`relative rounded-xl bg-[#F3F3F3]  ${className}`}
      style={{
        // Reserve space dynamically based on the label size
        paddingTop,
      }}
    >
      {/* Corner notch "cut-out" */}
      <div
        ref={labelRef}
        className="absolute top-0 left-0 rounded-br-xl px-3 py-1 text-xl font-semibold"
        style={{
          // This element visually erases the corner by matching the page background.
          background: pageBg,
        }}
      >
        {label}
      </div>

      {/* Optional subtle border that respects the notch */}
      {/* <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-black/10" /> */}

      {/* Content */}
      <div>{children}</div>
    </div>
  );
}
