import { embroideryZones } from "src/data/zones";
import type { CSSProperties } from "react";
import { useEffect } from "react";
import { useDesign } from "src/context/desgin.context";

const EmbroideryZones = () => {
  const { designData, update,hasDoubleCorner } = useDesign();

  const embroideryProps = designData.upgrades?.props?.embroidery;
  const zones = embroideryProps?.zones || [];


  if (zones.length === 0) return null;

  useEffect(() => {
    if (hasDoubleCorner && zones.length > 0) {
      // check if any zone is CENTER
      const hasCenterZone = zones.some((z: any) => {
        const zone = embroideryZones.find((zone) => zone.id === z.id);
        return zone?.label.split(" ")[1] === "Center";
      });

      if (hasCenterZone) {
        const filteredZones = zones.filter((z: any) => {
          const zone = embroideryZones.find((zone) => zone.id === z.id);
          return zone?.label.split(" ")[1] !== "Center";
        });

        // update context
        update((d) => {
          d.upgrades.props.embroidery.zones = filteredZones;
        });
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
            style={
              {
                position: "absolute",
                color: z.color,
                fontFamily: z.font,
                fontSize: 14,
                fontWeight: 600,
                opacity: 0.9,
                textShadow: "1px 1px 3px rgba(0,0,0,0.2)",
                ...(zoneConfig?.style || {}),
              } as CSSProperties
            }
          >
            {z.text}
          </div>
        );
      })}
    </>
  );
};

export default EmbroideryZones;
