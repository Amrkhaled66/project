import { BLANKET_SIZES } from "src/data/blanketSizes";
import type { DesignData } from "src/types/design.types";

export const initialDesignState: DesignData = {
  startingSize: BLANKET_SIZES[0].id,
  panelSize: 10,
  canvas: {
    size: BLANKET_SIZES[0].id,
    rows: BLANKET_SIZES[0].rows,
    cols: BLANKET_SIZES[0].cols,
  },
  colors: {
    blanket: "",
    border: "",
    backing: "",
    binding: "",
    blocking: {
      colors: [],
      random: false,
    },
    qualityPreserve: "",
  },
  upgrades: {
    selected: [],
    props: {
      embroidery: {
        zones: null,
      },
      cornerstones: {
        type: null,
        images: {},
      },
    },
  },
  text: {
    items: [],
  },
  photos: {
    items: [],
  },
  price: "0.00",
};
