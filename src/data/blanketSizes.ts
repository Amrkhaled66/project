// src/data/blanketSizes.ts

export type BlanketSizeId =
  | "Lap"
  | "Throw"
  | "Game"
  | "Stadium"
  | "Twin"
  | "DormieTwin"
  | "Full"
  | "Queen"
  | "King";

export type BlanketSize = {
  id: BlanketSizeId;
  name: string;
  width: number;   // inches
  height: number;  // inches
  price: number;
  rows: number;
  cols: number;
};

/**
 * Base blanket size definitions (default orientation = vertical/tall)
 */
export const BLANKET_SIZES: BlanketSize[] = [
  { id: "Lap",     name: "Lap",     width: 36,  height: 48,  price: 69.99,  rows: 3, cols: 2},
  { id: "Throw",   name: "Throw",   width: 50,  height: 60,  price: 79.99,  rows: 3, cols: 3 },
  { id: "Game",    name: "Game",    width: 60,  height: 80,  price: 99.99,  rows: 4, cols: 3},
  { id: "Stadium", name: "Stadium", width: 72,  height: 90,  price: 119.99, rows: 4, cols: 4 },
  { id: "Twin",    name: "Twin",    width: 66,  height: 90,  price: 129.99, rows: 5, cols: 4},
  { id: "DormieTwin", name: "Dormie Twin", width: 80, height: 90, price: 149.99, rows: 6, cols: 4},
  { id: "Full",    name: "Full",    width: 80,  height: 90,  price: 149.99, rows: 5, cols: 5 },
  { id: "Queen",   name: "Queen",   width: 90,  height: 90,  price: 169.99, rows: 6, cols: 5},
  { id: "King",    name: "King",    width: 108, height: 90,  price: 189.99, rows: 6, cols: 6 },
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
export const flipSizeOrientation = (size: BlanketSize): BlanketSize => {
  return {
    ...size,
    width: size.height,
    height: size.width,
    rows: size.cols,
    cols: size.rows,
  };
};
