import React from "react";
import { useCart } from "src/context/cart.context";



const zonePositions: Record<string, React.CSSProperties> = {
  "top-left": { top: "0%", left: "8%", textAlign: "left" },
  "top-center": { top: "0%", left: "50%", transform: "translateX(-50%)" },
  "top-right": { top: "0%", right: "8%", textAlign: "right" },
  "bottom-left": { bottom: "0%", left: "8%", textAlign: "left" },
  "bottom-center": { bottom: "0%", left: "50%", transform: "translateX(-50%)" },
  "bottom-right": { bottom: "0%", right: "8%", textAlign: "right" },
  "left-side": {
    top: "50%",
    left: "0%",
    transform: "rotate(-90deg) translateY(-50%)",
    transformOrigin: "left center",
  },
  "right-side": {
    top: "50%",
    right: "0%",
    transform: "rotate(90deg) translateY(50%)",
    transformOrigin: "right center",
  },
};

const EmbroideryZones = () => {
  const { cartItem } = useCart();

  const embroideryUpgrade = cartItem.upgrades.find(
    (u) => u.id === "embroidery",
  );
  const zones = embroideryUpgrade?.props?.zones || [];

  if (zones.length === 0) return null;

  return (
    <>
      {zones.map((z: any) => (
        <div
          key={z.id}
          style={{
            position: "absolute",
            color: z.color,
            fontFamily: z.font,
            fontSize: 14,
            fontWeight: 600,
            opacity: 0.9,
            textShadow: "1px 1px 3px rgba(0,0,0,0.2)",
            ...zonePositions[z.id],
          }}
        >
          {z.text}
        </div>
      ))}
    </>
  );
};

export default EmbroideryZones;
