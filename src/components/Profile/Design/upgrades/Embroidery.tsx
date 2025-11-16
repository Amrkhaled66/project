import { useCart } from "src/context/cart.context";
import { embroideryZones } from "src/data/zones";
import type { CSSProperties } from "react";

const EmbroideryZones = () => {
  const { cartItem } = useCart();

  const embroideryUpgrade = cartItem.upgrades.find(
    (u) => u.id === "embroidery"
  );

  const zones = embroideryUpgrade?.props?.zones || [];

  if (zones.length === 0) return null;

  return (
    <>
      {zones.map((z: any) => {
        // Find matching zone style from unified array
        const zoneConfig = embroideryZones.find((zone) => zone.id === z.id);

        return (
          <div
            key={z.id}
            style={({
              position: "absolute",
              color: z.color,
              fontFamily: z.font,
              fontSize: 14,
              fontWeight: 600,
              opacity: 0.9,
              textShadow: "1px 1px 3px rgba(0,0,0,0.2)",
              ...(zoneConfig?.style || {}), // apply unified style
            } as CSSProperties)}
          >
            {z.text}
          </div>
        );
      })}
    </>
  );
};

export default EmbroideryZones;
