import type { CSSProperties } from "react";

import { embroideryZones } from "src/data/zones";
import { useDesignEditorState } from "src/context/desgin.context";

const EmbroideryZones = () => {
  const { designData } = useDesignEditorState();
  const zones = designData.upgrades?.props?.embroidery?.zones || [];

  if (zones.length === 0) {
    return null;
  }

  return (
    <>
      {zones.map((zone: any) => {
        const zoneConfig = embroideryZones.find((item) => item.id === zone.id);

        return (
          <div
            key={zone.id}
            style={
              {
                position: "absolute",
                color: zone.color,
                fontFamily: zone.font,
                fontSize: 14,
                fontWeight: 600,
                opacity: 0.9,
                textShadow: "1px 1px 3px rgba(0,0,0,0.2)",
                ...(zoneConfig?.style || {}),
              } as CSSProperties
            }
          >
            {zone.text}
          </div>
        );
      })}
    </>
  );
};

export default EmbroideryZones;
