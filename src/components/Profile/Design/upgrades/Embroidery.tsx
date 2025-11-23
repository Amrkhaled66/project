import { useCart } from "src/context/cart.context";
import { embroideryZones } from "src/data/zones";
import type { CSSProperties } from "react";
import { useEffect } from "react";
const EmbroideryZones = () => {
  const { cartItem ,hasDoubleCorner,updateEmbroidery} = useCart();


  const embroideryUpgrade = cartItem.upgrades.find(
    (u) => u.id === "embroidery",
  );

  const zones = embroideryUpgrade?.props?.zones || [];

  if (zones.length === 0) return null;

  const existingZones = embroideryUpgrade?.props?.zones || [];

  useEffect(() => {
    if (hasDoubleCorner && existingZones.length > 0) {
      const hasCenterZone = existingZones.some((z: any) => {
        const zone = embroideryZones.find((zone) => zone.id === z.id);
        return zone?.label.split(" ")[1] === "Center";
      });

      if (hasCenterZone) {
        const filteredZones = existingZones.filter((z: any) => {
          const zone = embroideryZones.find((zone) => zone.id === z.id);
          return zone?.label.split(" ")[1] !== "Center";
        });
        updateEmbroidery(filteredZones);
      }
    }
  }, [hasDoubleCorner]);


  return (
    <>
      {zones.map((z: any) => {
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
              ...(zoneConfig?.style || {}),
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
