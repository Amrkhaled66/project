// src/data/blanketSizes.ts

// Define the Blanket Size IDs and Related Properties
export const BLANKET_SIZE_IDS = {
  LAP: "Lap",
  THROW: "Throw",
  GAME: "Game",
  STADIUM: "Stadium",
  TWIN: "Twin",
  DORMIE_TWIN: "DormieTwin",
  FULL: "Full",
  QUEEN: "Queen",
  KING: "King",
} as const;

export type BlanketSizeId =
  (typeof BLANKET_SIZE_IDS)[keyof typeof BLANKET_SIZE_IDS];

export type BlanketSize = {
  id: BlanketSizeId;
  name: string;
  width: number; // inches
  height: number; // inches
  price: number;
  rows: number;
  cols: number;
};

// Using the centralized sizes for the blanket sizes
export const BLANKET_SIZES: BlanketSize[] = [
  {
    id: BLANKET_SIZE_IDS.LAP,
    name: "Lap",
    width: 43,
    height: 59,
    price: 99.86,
    rows: 2,
    cols: 3,
  },
  {
    id: BLANKET_SIZE_IDS.THROW,
    name: "Throw",
    width: 59,
    height: 59,
    price: 129.86,
    rows: 3,
    cols: 3,
  },
  {
    id: BLANKET_SIZE_IDS.GAME,
    name: "Game",
    width: 59,
    height: 74,
    price: 149.86,
    rows: 3,
    cols: 4,
  },
  {
    id: BLANKET_SIZE_IDS.STADIUM,
    name: "Stadium",
    width: 74,
    height: 74,
    price: 199.86,
    rows: 4,
    cols: 4,
  },
  {
    id: BLANKET_SIZE_IDS.TWIN,
    name: "Twin",
    width: 74,
    height: 89,
    price: 249.86,
    rows: 4,
    cols: 5,
  },
  {
    id: BLANKET_SIZE_IDS.FULL,
    name: "Full",
    width: 89,
    height: 89,
    price: 299.86,
    rows: 5,
    cols: 5,
  },
  {
    id: BLANKET_SIZE_IDS.QUEEN,
    name: "Queen",
    width: 89,
    height: 104,
    price: 349.86,
    rows: 5,
    cols: 6,
  },
  {
    id: BLANKET_SIZE_IDS.KING,
    name: "King",
    width: 104,
    height: 104,
    price: 399.86,
    rows: 6,
    cols: 6,
  },
];
/**
 * Helper to get size definition by ID
 */
export const getSizeById = (id: BlanketSizeId) =>
  BLANKET_SIZES.find((s) => s.id === id)!;

/**
 * ✅ Smart function to flip orientation
 * - Swaps rows ↔ cols and width ↔ height ifue
 */
export const flipSizeOrientation = (
  size: BlanketSizeId,
  isFlipped: boolean,
): BlanketSize => {
  const sizeDef = getSizeById(size);
  if (isFlipped) {
    return sizeDef;
  }
  return {
    ...sizeDef,
    width: sizeDef.height,
    height: sizeDef.width,
    rows: sizeDef.cols,
    cols: sizeDef.rows,
  };
};
